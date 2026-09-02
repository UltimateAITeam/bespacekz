/**
 * Removes the placeholder vacancies that were left in the production database and
 * replaces them with a realistic Russian-language dataset.
 *
 * Usage:
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/scripts/replace-placeholder-vacancies.ts --dry-run
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/scripts/replace-placeholder-vacancies.ts --apply
 *
 * The script always writes a JSON backup of every vacancy to prisma/backups/ before
 * touching anything, and refuses to delete a vacancy that has applicants, favorites
 * or a chosen candidate attached to it.
 */
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { employers, vacancies } from "../seed-data/realistic-vacancies";

const prisma = new PrismaClient();

/**
 * Vacancies identified as placeholder content during the audit: Lorem Ipsum bodies,
 * keyboard-mash bodies ("dsfsdf", "324234") and a "very good project" stub. Listed
 * explicitly by id rather than matched by pattern so that no genuine posting can be
 * caught by accident.
 */
const PLACEHOLDER_IDS = [
  // aisahanova_aliya@mail.ru — numeric mash + Lorem Ipsum
  "clrp55m8e0000voqlaf347gsx",
  "clrw8cpjh0000131a7wuz2ivo",
  "clrw8fedc0001131a4yshis9p",
  // beeboplay@gmail.com — 24 copies of "dsfsdf fdsfsdf"
  "f358cc28-d805-42a7-ab3e-4df8c9f4926a",
  "f101cd4a-c4e8-41d0-894a-58ad45c44d37",
  "8efe8323-bdd7-4143-bcf5-09e26ead58e0",
  "ad1cc760-6319-4eb7-b6d5-b1c8b263cedd",
  "42ac7cf6-85f7-4275-97a5-95a52503df9a",
  "064139a4-a0d3-442d-ac9e-94644c35870e",
  "7a63232a-fd4a-4172-ac72-16c9cb7c5199",
  "8e592e68-cad8-4e02-88ee-71c83493c1ac",
  "acc7eed3-1f63-4864-900d-8afd7bb4d901",
  "e485ec8f-7e7f-432e-a0c9-4af942e43f25",
  "d5911813-7393-4dff-a139-fa68cc126dcf",
  "clrxvsinl0000139ywrbkvld1",
  "clrxvsinl0000139ywrbkvld8",
  "73afad65-0cf7-40b0-a125-6bf2d64c8f11",
  "ab61ca17-31d5-4875-9b82-aaea3e7046be",
  "d995cd3e-01e4-4c52-af7a-066effe0b16d",
  "b285d041-03db-49aa-a940-d026e3e6972b",
  "ca2da91f-3917-41c1-89b1-ee156b471deb",
  "ee47f994-ad74-43fd-b8bb-46253aba8ff1",
  "b8d9a8a5-7029-4e04-a19f-e54ce3cdb398",
  "425cae60-5586-48aa-9167-2af9b3162c1b",
  "a6bbe55f-a2dd-48c6-bbd2-4b2eeac1a88c",
  "98bb6a06-1207-4a81-919c-7afc415832d0",
  "33c7074a-845b-4e40-bad2-2a78d237659a",
  // client@bespace.kz — "very good project"
  "clugx7dk80000u97kg5ow8a9w",
];

/**
 * Genuine postings that must survive. Kept as an explicit denylist so a mistake in
 * PLACEHOLDER_IDS cannot silently destroy real data.
 */
const PROTECTED_IDS = new Set([
  "cluh8za840004uld1iml050wk", // client@bespace.kz — Senior Data Scientist, IN_PROGRESS
  "cluie2uoi0000pphik678dl7v", // client@bespace.kz — Playrix, 4 applicants
  "clvwdh5ct0008az87pyrk3sdi", // bmaukenov@gmail.com — IN_PROGRESS, chosen candidate
  "cmryvbmsc00009mshoubtg18a", // ИП Бакытханова — IN_PROGRESS, chosen candidate
  "cmtjeobx2000072slyx341u0y", // ИП Бакытханова — мобильный разработчик
]);

async function backup() {
  const all = await prisma.vacancy.findMany({
    include: {
      jobTitle: { include: { category: true } },
      clientProfile: true,
      applicants: { select: { id: true, userEmail: true } },
      favoritedBy: { select: { id: true, userEmail: true } },
    },
  });

  const dir = path.join(__dirname, "..", "backups");
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(
    dir,
    `vacancies-${new Date().toISOString().replace(/[:.]/g, "-")}.json`,
  );
  fs.writeFileSync(file, JSON.stringify(all, null, 2), "utf8");
  console.log(`Backed up ${all.length} vacancies to ${file}`);
  return all.length;
}

async function verifyDeletions() {
  const rows = await prisma.vacancy.findMany({
    where: { id: { in: PLACEHOLDER_IDS } },
    select: {
      id: true,
      freelancerProfileId: true,
      _count: { select: { applicants: true, favoritedBy: true } },
    },
  });

  const problems: string[] = [];

  for (const id of PLACEHOLDER_IDS) {
    if (PROTECTED_IDS.has(id)) problems.push(`${id} is on the protected list`);
  }

  for (const row of rows) {
    if (row._count.applicants > 0)
      problems.push(`${row.id} has ${row._count.applicants} applicant(s)`);
    if (row._count.favoritedBy > 0)
      problems.push(`${row.id} has ${row._count.favoritedBy} favorite(s)`);
    if (row.freelancerProfileId)
      problems.push(`${row.id} has a chosen candidate`);
  }

  const found = new Set(rows.map((r) => r.id));
  const missing = PLACEHOLDER_IDS.filter((id) => !found.has(id));
  if (missing.length)
    console.log(
      `Note: ${missing.length} placeholder id(s) already absent, skipping: ${missing.join(", ")}`,
    );

  if (problems.length) {
    throw new Error(
      `Refusing to delete — real activity attached:\n  ${problems.join("\n  ")}`,
    );
  }

  return rows.length;
}

async function resolveCategory(name: string) {
  const existing = await prisma.jobCategory.findFirst({
    where: { category_name: name },
  });
  if (existing) return existing.id;
  const created = await prisma.jobCategory.create({
    data: { category_name: name },
  });
  console.log(`  created category "${name}" (id ${created.id})`);
  return created.id;
}

async function main() {
  const apply = process.argv.includes("--apply");
  const dryRun = !apply;

  console.log(dryRun ? "=== DRY RUN ===" : "=== APPLYING CHANGES ===");

  const total = await backup();
  const deletable = await verifyDeletions();

  console.log(
    `\nPlan: delete ${deletable} placeholder vacancies, keep ${total - deletable}, insert ${vacancies.length} new ones across ${employers.length} employers.`,
  );

  if (dryRun) {
    console.log("\nWould delete:");
    const rows = await prisma.vacancy.findMany({
      where: { id: { in: PLACEHOLDER_IDS } },
      select: {
        id: true,
        aboutVacancy: true,
        clientProfile: { select: { userEmail: true } },
      },
    });
    for (const r of rows)
      console.log(
        `  ${r.id}  ${r.clientProfile.userEmail}  ${JSON.stringify(
          r.aboutVacancy.replace(/<[^>]*>/g, " ").trim().slice(0, 50),
        )}`,
      );
    console.log("\nWould keep:");
    for (const id of PROTECTED_IDS) console.log(`  ${id}`);
    console.log("\nRe-run with --apply to execute.");
    return;
  }

  const deleted = await prisma.vacancy.deleteMany({
    where: { id: { in: PLACEHOLDER_IDS } },
  });
  console.log(`\nDeleted ${deleted.count} placeholder vacancies.`);

  console.log("\nResolving job categories...");
  const categoryIds = new Map<string, number>();
  for (const name of new Set(vacancies.map((v) => v.category))) {
    categoryIds.set(name, await resolveCategory(name));
  }

  console.log("\nCreating employer accounts...");
  const clientIds = new Map<string, string>();
  for (const e of employers) {
    // Random password: these are catalogue employers, not accounts anyone signs into.
    const password = await bcrypt.hash(crypto.randomBytes(24).toString("hex"), 10);

    const user = await prisma.user.upsert({
      where: { email: e.email },
      update: {},
      create: {
        email: e.email,
        password,
        name: e.contactName,
        last_name: e.contactLastName,
        phone: e.phone,
        role: Role.CLIENT,
        location: e.location,
        about: e.companyDescription,
        emailVerified: new Date(),
      },
    });

    const profile = await prisma.clientProfile.upsert({
      where: { userEmail: e.email },
      update: {
        companyInfo: e.companyInfo,
        isCompany: true,
        sphereOfWork: e.sphereOfWork,
        companyDescription: e.companyDescription,
        address: e.address,
        mailIndex: e.mailIndex,
        contactUrl: e.contactUrl,
      },
      create: {
        userEmail: e.email,
        companyInfo: e.companyInfo,
        isCompany: true,
        sphereOfWork: e.sphereOfWork,
        companyDescription: e.companyDescription,
        address: e.address,
        mailIndex: e.mailIndex,
        contactUrl: e.contactUrl,
      },
    });

    clientIds.set(e.slug, profile.id);
    console.log(`  ${e.companyInfo} — ${user.email}`);
  }

  console.log("\nCreating vacancies...");
  const now = Date.now();
  let created = 0;

  for (const v of vacancies) {
    const clientId = clientIds.get(v.employer);
    if (!clientId) throw new Error(`Unknown employer slug: ${v.employer}`);

    const categoryId = categoryIds.get(v.category);
    if (!categoryId) throw new Error(`Unknown category: ${v.category}`);

    const jobTitle = await prisma.jobTitle.upsert({
      where: { name: v.title },
      update: {},
      create: { name: v.title, category_id: categoryId },
    });

    const postedAt = new Date(now - v.postedDaysAgo * 24 * 60 * 60 * 1000);

    await prisma.vacancy.create({
      data: {
        clientId,
        jobTitleId: jobTitle.id,
        aboutVacancy: v.aboutVacancy,
        pricingType: v.pricingType,
        currency: v.currency,
        priceFrom: v.priceFrom,
        priceTo: v.priceTo,
        isClear: v.isClear,
        experience: v.experience,
        // Matches how the live VacancyForm submits: skills go to requiredSkills and
        // specialization is left empty, like every real row already in the database.
        specialization: "",
        requiredSkills: v.requiredSkills,
        country: v.country,
        city: v.city,
        status: "ACTIVE",
        createdAt: postedAt,
        updatedAt: postedAt,
      },
    });

    created++;
    console.log(`  ${v.title} — ${v.city}`);
  }

  const finalCount = await prisma.vacancy.count();
  console.log(
    `\nDone. Created ${created} vacancies. Total vacancies now: ${finalCount}.`,
  );
}

main()
  .catch((e) => {
    console.error("\nFAILED:", e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

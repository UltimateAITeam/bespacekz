import { PrismaClient, Role, ProficiencyLevel } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const jobTitles = await prisma.jobTitle.findMany();
  if (jobTitles.length !== 22) {
    console.error(`Expected 23 JobTitles, found ${jobTitles.length}. Please adjust the script accordingly.`);
    return;
  }

  for (let i = 0; i < 22; i++) {
    const userEmail = faker.internet.email();
    const jobTitle = jobTitles[i];
    const user = await prisma.user.create({
      data: {
        email: userEmail,
        last_name: faker.person.lastName(),
        name: faker.person.firstName(),
        role: Role.FREELANCER,
        image: faker.image.avatar(),
        location: faker.location.city(),
        phone: faker.phone.number(),
        about: faker.lorem.paragraph(),
        birthdate: faker.date.past(),
        password: faker.internet.password(),
        freelancerProfile: {
          create: {
            completed: faker.datatype.boolean(),
            jobTitleId: jobTitle.id,
            Skills: { set: [faker.word.words(), faker.word.words()] },
            Languages: {
              create: [
                {
                  name: faker.helpers.arrayElement(["Kazakh", "Russian", "English"]),
                  proficiencyLevel: faker.helpers.arrayElement(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
                },
              ],
            },
            Education: {
              create: [
                {
                  degree: faker.word.words(),
                  institution: faker.company.name(),
                  specialization: faker.word.words(),
                  from: faker.date.past(),
                  to: faker.date.recent(),
                },
              ],
            },
            Experience: {
              create: [
                {
                  name: faker.person.jobTitle(),
                  jobTitle: faker.person.jobTitle(),
                  skills: { set: [faker.word.words(), faker.word.words()] },
                  tasks: faker.word.words(5),
                  company: faker.company.name(),
                  country: faker.location.country(),
                  city: faker.location.city(),
                  from: faker.date.past(),
                  stillWorking: faker.datatype.boolean(),
                  to: faker.datatype.boolean() ? faker.date.recent() : null,
                },
              ],
            },
            Portfolio: {
              create: [
                {
                  links: { set: [faker.internet.url(), faker.internet.url()] },
                },
              ],
            },
            Pricing: {
              create: [
                {
                  pricingType: { set: [faker.helpers.arrayElement(["FREELANCE", "EMPLOYEE"])]},
                  hourlyRate: faker.number.float({ min: 20, max: 100 }),
                  projectRate: faker.number.float({ min: 500, max: 5000 }),
                },
              ],
            },
          },
        },
      },
    });

    console.log(`Created profile for freelancer: ${user.name} (${userEmail})`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

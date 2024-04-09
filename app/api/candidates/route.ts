import { prisma } from "@/libs/prisma";
import { findClientSubscriptionById } from "@/services/client-subscription";
import { json2csv } from "json-2-csv";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const accept = req.headers.get("Accept");

  switch (accept) {
    case "text/csv": {
      const session = await getServerSession();

      if (!session) {
        return NextResponse.json(
          {
            error: "Unauthorized",
          },
          {
            status: 401,
          },
        );
      }

      const client = await prisma.clientProfile.findUnique({
        where: {
          userEmail: session.user.email,
        },
        select: {
          id: true,
        },
      });

      let isClientSubscribed = false;

      if (client) {
        const clientSubscription = await findClientSubscriptionById(client.id);

        if (clientSubscription) {
          isClientSubscribed = true;
        }
      }

      if (!isClientSubscribed) {
        return NextResponse.json(
          {
            error: "Forbidden",
          },
          {
            status: 403,
          },
        );
      }

      const candidates = await prisma.user.findMany({
        select: {
          email: true,
          name: true,
          last_name: true,
          location: true,
          phone: true,
          about: true,
          birthdate: true,
          freelancerProfile: {
            select: {
              jobTitle: {
                select: {
                  name: true,
                },
              },
              Education: {
                select: {
                  degree: true,
                  institution: true,
                  specialization: true,
                  from: true,
                  to: true,
                },
              },
              Experience: {
                select: {
                  name: true,
                  jobTitle: true,
                  skills: true,
                  tasks: true,
                  company: true,
                  country: true,
                  city: true,
                  from: true,
                  stillWorking: true,
                  to: true,
                  link: true,
                },
              },
              Portfolio: {
                select: {
                  links: true,
                },
              },
              Skills: true,
              Pricing: {
                select: {
                  hourlyRate: true,
                  projectRate: true,
                  employeeRate: true,
                },
              },
              Languages: {
                select: {
                  name: true,
                  proficiencyLevel: true,
                },
              },
            },
          },
        },
        where: {
          role: "FREELANCER",
        },
      });

      return new NextResponse(json2csv(candidates), {
        headers: {
          "Content-Type": "text/csv",
        },
      });
    }

    default: {
      return NextResponse.json(
        {
          error: "Unsupported Media Type",
        },
        {
          status: 415,
        },
      );
    }
  }
}

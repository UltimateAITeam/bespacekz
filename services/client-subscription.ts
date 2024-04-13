import { prisma } from "@/libs/prisma";

export async function createSubscription(args: {
  client: {
    id: string;
  };
  subscriptionEndsInMs: number;
}) {
  const subscriptionEndsAt = new Date(Date.now() + args.subscriptionEndsInMs);

  await prisma.clientProfile.update({
    where: {
      id: args.client.id,
    },
    data: {
      subscriptionEndsAt,
    },
  });
}

export async function findClientSubscriptionById(id: string) {
  const client = await prisma.clientProfile.findUnique({
    where: {
      id,
    },
    select: {
      subscriptionEndsAt: true,
    },
  });

  if (!client) {
    return null;
  }

  if (!client.subscriptionEndsAt) {
    return null;
  }

  if (client.subscriptionEndsAt < new Date()) {
    await prisma.clientProfile.update({
      where: {
        id,
      },
      data: {
        subscriptionEndsAt: null,
      },
    });

    return null;
  }

  return {
    endsAt: client.subscriptionEndsAt,
  };
}

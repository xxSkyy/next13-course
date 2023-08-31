import { prisma } from "@/services/db";
import { auth } from "@clerk/nextjs";

export const getUserByClerkID = async () => {
  const { userId } = auth();

  if (!userId) throw new Error("Auth error, no clerk id");

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId,
    },
  });

  return user;
};

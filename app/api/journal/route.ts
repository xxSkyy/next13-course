import { analyze } from "@/services/ai";
import { getUserByClerkID } from "@/services/auth";
import { prisma } from "@/services/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async () => {
  const user = await getUserByClerkID();
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: "Ligma ligma ligma eeee",
    },
  });

  const analysis = await analyze(entry.content);

  if (analysis) {
    await prisma.analysis.create({
      data: {
        userId: user.id,
        entryId: entry.id,
        ...analysis,
      },
    });
  }

  revalidatePath("/journal");

  return NextResponse.json({ data: entry });
};

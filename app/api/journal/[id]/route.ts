import { analyze } from "@/services/ai";
import { updateEntry } from "@/services/api";
import { getUserByClerkID } from "@/services/auth";
import { prisma } from "@/services/db";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request, { params }) => {
  const user = await getUserByClerkID();

  const { content } = await request.json();

  const analysis = await analyze(content);

  if (analysis) {
    await prisma.analysis.upsert({
      where: {
        entryId: params.id,
      },
      create: {
        userId: user.id,
        entryId: params.id,
        ...analysis,
      },
      update: analysis,
    });
  }

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId: user.id,
      id: params.id,
    },
    data: {
      content,
    },
    include: {
      analysis: true,
    },
  });

  return NextResponse.json({ data: updatedEntry });
};

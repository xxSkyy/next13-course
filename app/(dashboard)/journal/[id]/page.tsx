import Editor from "@/components/Editor";
import { getUserByClerkID } from "@/services/auth";
import { prisma } from "@/services/db";

const getEntry = async (id: string) => {
  const user = await getUserByClerkID();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      id,
      userId: user.id,
    },
    include: {
      analysis: true,
    },
  });

  console.log({ entry });

  return entry;
};

const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id);

  return (
    <div className="h-full w-full ">
      <Editor entry={entry} />
    </div>
  );
};

export default EntryPage;

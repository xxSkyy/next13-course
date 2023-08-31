import BaseCard from "@/components/BaseCard";

const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString();

  return (
    <BaseCard>
      <div className="divide-y h-full">
        <div className="px-4 py-5 sm:px-6">{date}</div>
        <div className="px-4 py-5 sm:p-6">
          Summary: {entry.analysis?.summary}
        </div>
        <div className="px-4 py-5 sm:px-6">Mood: {entry.analysis?.mood}</div>
      </div>
    </BaseCard>
  );
};

export default EntryCard;

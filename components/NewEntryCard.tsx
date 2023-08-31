"use client";

import BaseCard from "@/components/BaseCard";
import { createNewEntry } from "@/services/api";
import { useRouter } from "next/navigation";

const NewEntryCard = () => {
  const router = useRouter();

  const handleOnClick = async () => {
    const data = await createNewEntry();
    router.push(`/journal/${data.id}`);
  };

  return (
    <BaseCard onClick={handleOnClick} clickable>
      <div className="px-4 py-5 sm:p-6">
        <span className="text-3xl">New Entry</span>
      </div>
    </BaseCard>
  );
};

export default NewEntryCard;

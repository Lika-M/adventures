import { getAdventureById } from "@/lib/mongodb";
import { notFound } from 'next/navigation';

import AdventureDetail from "@/components/adventures/adventure-detail";
import { type Adventure } from '@/types';

export async function generateMetadata({ params }: { params: { adventureId: string } }) {
  const { adventureId } = params;

  const adventure = await getAdventureById(adventureId);

  if (!adventure) {
    return {
      title: "Adventure Not Found",
      description: "The requested adventure could not be found.",
    };
  }

  return {
    title: adventure.title,
    description: adventure.description,
  };
}

export default async function Adventure({ params }: { params: { adventureId: string } }) {
  const { adventureId } = params;
  const adventure:Adventure | null = await getAdventureById(adventureId);

  if (!adventure) {
    notFound();
  }

  return (
    <AdventureDetail {...adventure} />
  );
}
import { getAdventureById } from "@/lib/mongodb";
import { notFound } from 'next/navigation';

import AdventureDetail from "@/components/adventures/adventure-detail";
import { type Adventure } from '@/types'

export default async function Adventure({ params }: { params: { adventureId: string } }) {
  const { adventureId } = params;

  let adventure: Adventure | null = null;

  adventure = await getAdventureById(adventureId);
  if(!adventure){
    notFound();
  }


  return (
    <AdventureDetail {...adventure} />
  );
}
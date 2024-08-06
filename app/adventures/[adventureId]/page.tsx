import AdventureDetail from "@/components/adventures/adventure-detail";
import { getAdventureById } from "@/lib/mongodb";
import { type Adventure } from '@/types'

export default async function Adventure({ params }: { params: { adventureId: string } }) {
  const { adventureId } = params;

  let adventure: Adventure | null = null;

  try {
    adventure = await getAdventureById(adventureId);
  } catch (error) {
    // TODO not-found page
    console.log(error);
    
  }

  return (
    <AdventureDetail {...adventure} />
  );
}
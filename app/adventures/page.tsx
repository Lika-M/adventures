import { getAllAdventures } from "@/lib/mongodb";
import AdventureList from "@/components/adventures/adventure-list";

import { type Adventure } from "@/types";

export default async function Adventures() {

  let adventures: Adventure[] = [];

  try {
    adventures = await getAllAdventures();
  } catch (error) {
    throw new Error('An error occurred. Please try again later.')
  }

  return <AdventureList adventures={adventures} />
}
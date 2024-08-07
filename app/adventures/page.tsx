import { getAllAdventures } from "@/lib/mongodb";

import AdventureList from "@/components/adventures/adventure-list";

export default async function Adventures() {

  const adventures = await getAllAdventures();

  if (adventures.length < 1) {
    throw new Error()
  }
  return <AdventureList adventures={adventures} />
}
import members from "../data/mock/members.json";
import { Member } from "./types";

export async function getMembers(): Promise<Member[]> {
  await new Promise(r => setTimeout(r, 200));
  return members as Member[];
}

export async function getMember(id: string): Promise<Member | null> {
  await new Promise(r => setTimeout(r, 200));
  return (members as Member[]).find(m => m.id === id) ?? null;
}

export const mockApi = {
  members: {
    getMembers,
    getMember,
  }
};

export default mockApi;

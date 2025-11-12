import members from "../data/mock/members.json";
import campaigns from "../data/mock/campaigns.json";
import exitSurveys from "../data/mock/exit-surveys.json";
import { Member, Campaign, ExitSurvey } from "./types";

// Members
export async function getMembers() {
  await new Promise(r => setTimeout(r, 200));
  return { data: members as Member[] };
}

export async function getMember(id: string) {
  await new Promise(r => setTimeout(r, 200));
  const member = (members as Member[]).find(m => m.id === id) ?? null;
  return { data: member };
}

// Campaigns
export async function getCampaigns() {
  await new Promise(r => setTimeout(r, 300));
  return { data: campaigns as Campaign[] };
}

export async function getCampaign(id: string) {
  await new Promise(r => setTimeout(r, 200));
  const campaign = (campaigns as Campaign[]).find(c => c.id === id) ?? null;
  return { data: campaign };
}

// Exit Surveys
export async function getExitSurveys() {
  await new Promise(r => setTimeout(r, 250));
  return { data: exitSurveys as ExitSurvey[] };
}

export async function getExitSurvey(id: string) {
  await new Promise(r => setTimeout(r, 200));
  const survey = (exitSurveys as ExitSurvey[]).find(s => s.id === id) ?? null;
  return { data: survey };
}

export const mockApi = {
  members: {
    getMembers,
    getMember,
  },
  campaigns: {
    getCampaigns,
    getCampaign,
  },
  exitSurveys: {
    getExitSurveys,
    getExitSurvey,
  }
};

export default mockApi;

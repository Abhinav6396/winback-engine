// Mock API implementation
import { mockApi } from './mock-api';
import { getDashboard } from './mock-dashboard';

// Mock API client that uses the mock data
export const membersApi = {
  getMembers: mockApi.members.getMembers,
  getMember: mockApi.members.getMember,
  updateMember: async (id: string, data: any) => {
    // In a real implementation, this would update the data
    console.log('Mock updateMember:', { id, data });
    return { data };
  },
  deleteMember: async (id: string) => {
    // In a real implementation, this would delete the data
    console.log('Mock deleteMember:', id);
    return { data: { success: true } };
  },
};

export const campaignsApi = {
  getCampaigns: async () => {
    console.log('Mock getCampaigns');
    return { data: [] };
  },
  createCampaign: async (data: any) => {
    console.log('Mock createCampaign:', data);
    return { data };
  },
  updateCampaign: async (id: string, data: any) => {
    console.log('Mock updateCampaign:', { id, data });
    return { data };
  },
  deleteCampaign: async (id: string) => {
    console.log('Mock deleteCampaign:', id);
    return { data: { success: true } };
  },
};

export const exitSurveysApi = {
  getSurveys: async () => {
    console.log('Mock getSurveys');
    return { data: [] };
  },
  submitSurvey: async (data: any) => {
    console.log('Mock submitSurvey:', data);
    return { data };
  },
  getSurvey: async (id: string) => {
    console.log('Mock getSurvey:', id);
    return { data: null };
  },
};

// Export the dashboard function directly
export { getDashboard };


// No default export needed for mock implementation

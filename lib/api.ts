import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const membersApi = {
  getMembers: () => api.get('/members'),
  getMember: (id: string) => api.get(`/members/${id}`),
  updateMember: (id: string, data: any) => api.put(`/members/${id}`, data),
  deleteMember: (id: string) => api.delete(`/members/${id}`),
};

export const campaignsApi = {
  getCampaigns: () => api.get('/campaigns'),
  createCampaign: (data: any) => api.post('/campaigns', data),
  updateCampaign: (id: string, data: any) => api.put(`/campaigns/${id}`, data),
  deleteCampaign: (id: string) => api.delete(`/campaigns/${id}`),
};

export const exitSurveysApi = {
  getSurveys: () => api.get('/exit-surveys'),
  submitSurvey: (data: any) => api.post('/exit-surveys', data),
  getSurvey: (id: string) => api.get(`/exit-surveys/${id}`),
};

export async function getDashboard() {
  await new Promise(r => setTimeout(r, 200));

  return {
    metrics: {
      churnRate: 0.08,
      atRiskCount: 27,
      avgHealthScore: 67,
      revenueSaved: 1240,
    },
    churnTrend: [
      { month: "Jun", churnPct: 0.12 },
      { month: "Jul", churnPct: 0.11 },
      { month: "Aug", churnPct: 0.10 },
      { month: "Sep", churnPct: 0.09 },
      { month: "Oct", churnPct: 0.082 },
    ],
    distribution: {
      healthy: 120,
      at_risk: 45,
      critical: 19,
    }
  };
}


export default api;

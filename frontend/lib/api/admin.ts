// Frontend utility for making admin API calls

const API_BASE_URL = '/api/admin';

// Get the admin token from your auth system
// In a real app, this should be handled by your auth system
const getAuthToken = async (): Promise<string> => {
  // In a real app, get the token from your auth system (e.g., NextAuth, Auth0, etc.)
  // This is just a placeholder - replace with your actual auth implementation
  return '';
};

export const adminApi = {
  // Get all users
  async getUsers() {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to fetch users');
    }
    
    return response.json();
  },
  
  // Get a single user by ID
  async getUser(userId: string) {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to fetch user');
    }
    
    return response.json();
  },
  
  // Update a user
  async updateUser(userId: string, updates: any) {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to update user');
    }
    
    return response.json();
  },
  
  // Delete a user
  async deleteUser(userId: string) {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to delete user');
    }
    
    return response.ok;
  },
  
  // Add more admin API methods as needed
};

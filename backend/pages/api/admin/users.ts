import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '../../../lib/supabase/admin';

// This is a protected API route that requires admin privileges
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Add your authentication/authorization logic here
  // For example, check for a valid session with admin role
  
  try {
    // Example: Get all users
    const { data: users, error } = await supabaseAdmin.auth.admin.listUsers();
    
    if (error) {
      console.error('Admin API Error:', error);
      return res.status(500).json({ error: error.message });
    }
    
    return res.status(200).json(users);
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

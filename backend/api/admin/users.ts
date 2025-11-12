import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '../../lib/supabase/admin';

// This is a protected API route that requires admin privileges
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for admin authentication here (e.g., using NextAuth or your auth system)
  // For now, we'll just check for a secret key in the environment
  const adminSecret = req.headers.authorization?.split(' ')[1];
  if (adminSecret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

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

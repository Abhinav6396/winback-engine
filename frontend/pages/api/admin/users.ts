import { NextApiRequest, NextApiResponse } from 'next';

// This is a protected API route that proxies requests to the backend API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Forward the request to the backend API
  const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:3001';
  const url = `${backendUrl}/api/admin/users`;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    
    // Forward the status code and data from the backend
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Error proxying to backend:', error);
    return res.status(500).json({ 
      error: 'Failed to connect to the backend service',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

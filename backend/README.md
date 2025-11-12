# Backend API

This directory contains the backend API for the application.

## Project Structure

```
backend/
├── lib/
│   └── supabase/
│       └── admin.ts        # Supabase admin client with service role
└── api/
    └── admin/             # Admin API endpoints
        └── users.ts       # User management endpoints
```

## Environment Variables

Create a `.env` file in the root of the backend directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_SECRET=your-secure-admin-secret
```

## Running the Backend

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Admin Endpoints

- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get a specific user
- `PATCH /api/admin/users/:id` - Update a user
- `DELETE /api/admin/users/:id` - Delete a user

## Security Notes

- The service role key should never be exposed to the client
- All admin endpoints require authentication
- Use proper CORS settings in production
- Implement rate limiting for admin endpoints

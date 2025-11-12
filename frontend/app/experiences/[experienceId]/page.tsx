import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function ExperiencePage({
  params,
}: {
  params: { experienceId: string };
}) {
  const { experienceId } = params;
  
  // Basic implementation without whop-sdk
  // You can implement your own authentication and data fetching logic here
  const isAuthenticated = true; // Replace with your auth check
  
  if (!isAuthenticated) {
    // Redirect to login or show unauthorized
    notFound();
  }
  
  // Mock data - replace with your actual data fetching logic
  const experience = { id: experienceId, title: 'Experience Title' };
  const user = { id: 'user-id', name: 'User Name', username: 'username' }; 
  const access = { hasAccess: true };

  const displayName = user.name || `@${user.username}`;

  return (
    <div className="flex flex-col p-8 gap-4">
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-4xl font-bold">
          Hi <strong>{displayName}</strong>!
        </h1>
        <Link href="https://docs.whop.com/apps" target="_blank">
          <Button variant="outline">Documentation</Button>
        </Link>
      </div>
      <Button asChild>
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Experience Details</h2>
          <div className="bg-gray-50 p-4 rounded">
            <pre className="text-sm overflow-auto">
              <code>{JSON.stringify(experience, null, 2)}</code>
            </pre>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">User Details</h2>
          <div className="bg-gray-50 p-4 rounded">
            <pre className="text-sm overflow-auto">
              <code>{JSON.stringify(user, null, 2)}</code>
            </pre>
          </div>
        </div>
      </div>
      {!access.hasAccess && (
        <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400">
          <p className="text-yellow-700">
            You don&apos;t have access to this experience. Please upgrade your plan.
          </p>
        </div>
      )}
    </div>
  );
}

function JsonViewer({ data }: { data: any }) {
	return (
		<pre className="text-2 border border-gray-a4 rounded-lg p-4 bg-gray-a2 max-h-72 overflow-y-auto">
			<code className="text-gray-10">{JSON.stringify(data, null, 2)}</code>
		</pre>
	);
}

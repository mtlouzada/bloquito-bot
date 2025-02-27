import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="text-center">
        <div className='text-white mb-16'>
            <h1 className="text-9xl font-bold mt-6">404</h1>
            <p className="text-2xl mt-4">Oops! Page not found.</p>
            <p className="mt-2">
            The page you're looking for doesn't exist or has been moved.
            </p>
        </div>
        <Link href="/">
          <Button variant={"outline"} size={"lg"} className=''>Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
}
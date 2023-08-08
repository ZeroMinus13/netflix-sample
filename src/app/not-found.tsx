import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col gap-5 justify-center bg-primary text-secondary min-h-screen text-center '>
      <h2 className='text-8xl font-bold text-red-400 text-gradient-to-r from-blue-100 to-purple-400'>Oops! 404</h2>
      <p className='text-3xl text-red-300 '>Sorry, This page could not be found.</p>
      <p>
        Go back to{' '}
        <Link href='/' className='font-bold text-sky-500 hover:underline'>
          Main Page
        </Link>
      </p>
    </div>
  );
}

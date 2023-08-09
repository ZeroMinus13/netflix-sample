import { ArrowBigLeft, ArrowBigRightIcon } from 'lucide-react';

export function LeftArrow({ prev, routing }: { prev: string | null; routing: (id: string) => void }) {
  return (
    <button
      onClick={() => prev && routing(prev)}
      disabled={!prev}
      className='cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed'
    >
      <ArrowBigLeft size={40} className='transition duration-500 hover:scale-110  hover:text-blue-500 ' />
    </button>
  );
}

export function RightArrow({ next, routing }: { next: string | null; routing: (id: string) => void }) {
  return (
    <button
      onClick={() => next && routing(next)}
      disabled={!next}
      className='cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed'
    >
      <ArrowBigRightIcon size={40} className='transition duration-500 hover:scale-110  hover:text-blue-500' />
    </button>
  );
}

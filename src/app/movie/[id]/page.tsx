'use client';
import { useState, useEffect } from 'react';
import { movies } from '@prisma/client';
import { fetchMovie, nextMovie, prevMovie } from '../../api/actions';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowBigLeft, ArrowBigRightIcon } from 'lucide-react';
import Loading from '@/app/loading';

function Movie({ params }: { params: { id: string } }) {
  const [movie, setMovie] = useState<movies | null>(null);
  const [next, setNext] = useState<movies['id'] | null>(null);
  const [prev, setPrev] = useState<movies['id'] | null>(null);
  const [ID, setId] = useState(params.id);

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchMovie(ID);
        const nextM = await nextMovie(ID);
        const prevM = await prevMovie(ID);

        if (data) {
          setMovie(data);
          setId(ID);

          router.replace(ID);
        }

        if (nextM?.id) setNext(nextM.id);

        if (prevM?.id) setPrev(prevM.id);
      } catch (error) {
        return;
      }
    }
    fetchData();
  }, [ID, router]);

  const rightArr = (
    <button
      onClick={() => next && routing(next)}
      disabled={!next}
      className='cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed'
    >
      <ArrowBigRightIcon size={40} className='transition duration-500 hover:scale-110  hover:text-blue-500' />
    </button>
  );
  const leftArr = (
    <button
      onClick={() => prev && routing(prev)}
      disabled={!prev}
      className='cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed'
    >
      <ArrowBigLeft size={40} className='transition duration-500 hover:scale-110  hover:text-blue-500 ' />
    </button>
  );
  const routing = (id: string) => router.replace(`/movie/${id}`);

  if (!movie) return <Loading />;
  return (
    <div
      className='w-full min-h-screen text-white bg-slate-800 overflow-x-hidden'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight' && next) routing(next);
        if (e.key === 'ArrowLeft' && prev) routing(prev);
      }}
    >
      <div className='text-center bg-gray-800'>
        <button
          onClick={() => router.back()}
          className='absolute left-0 bg-blue-200 text-slate-800 p-1 px-5 mt-5 ml-10 rounded-lg font-bold hover:bg-blue-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:bg-blue-500'
        >
          BACK
        </button>
        <h2 className='text-4xl pt-16 pb-5'>{movie.title}</h2>

        <p className='bg-slate-700 rounded-lg p-3 lg:p-10'>{movie.fullplot ? movie.fullplot : movie.plot}</p>
        <div className=''>
          <div className='flex flex-col gap-2 p-10'>
            <b>Directors</b>
            {movie.directors.map((director, i) => (
              <button
                key={i}
                className='underline hover:font-bold inline'
                onClick={() => {
                  const encodedDirector = encodeURIComponent(director);
                  router.push(`/?currentPage=1&limit=10&genre=All&director=${encodedDirector}`);
                }}
              >
                {director}
              </button>
            ))}
            <b>Genres</b>
            {movie.genres.map((genre, i) => (
              <button
                key={i}
                className='underline hover:font-bold inline'
                onClick={() => router.push(`/?currentPage=1&limit=10&genre=${genre}`)}
              >
                {genre}
              </button>
            ))}
            <b>Cast</b> {movie.cast.join(', ')}
            <b>Release Date </b> {movie.released?.toDateString()}
            <b>Length </b> {movie.runtime} minutes.
            <div className='flex flex-col gap-2'>
              <div className='flex flex-row justify-between items-center'>
                {leftArr}
                <h6 className='text-2xl'> Based on IMDB </h6>
                {rightArr}
              </div>
              <p> Ratings : {movie.imdb.rating?.toString()}</p>
              <p> Votes : {movie.imdb.votes?.toString()}</p>
            </div>
          </div>
          <div className='flex justify-center bg-black w-full'>
            {movie.poster ? (
              <Image
                alt={movie?.title}
                src={movie?.poster}
                width={600}
                height={600}
                className='w-fit object-cover'
                placeholder='blur'
                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8cuRFPQAHtQLxfqSEPgAAAABJRU5ErkJggg=='
              />
            ) : (
              <p className='text-2xl text-red-500 p-5 h-full'>No image found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;

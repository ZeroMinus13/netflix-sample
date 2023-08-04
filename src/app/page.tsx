'use client';
import { useState, useEffect } from 'react';
import Buttons from './components/Buttons';
import Image from 'next/image';
import { fetchMovies } from './api/actions';
import { movies } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import querystring from 'querystring';
import { genreValue } from './lib/helper';

function Home() {
  const urlParams = useSearchParams();
  const [movies, setMovies] = useState<movies[]>([]);
  const [currentPage, setCurrentPage] = useState(Number(urlParams.get('currentPage') ?? 1));
  const [totalPages, setTotalPages] = useState(0);
  const [genres] = useState<string[]>(genreValue);
  const [genre, setGenre] = useState(urlParams.get('genre') ?? '');
  const [limit, setLimit] = useState(Number(urlParams.get('limit') ?? 10));
  const [text, setText] = useState('');
  const [title, setCurrentTitle] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { moviesList, totalPages } = await fetchMovies(currentPage, limit, genre, title);
        setMovies(moviesList);
        setTotalPages(totalPages);
      } catch (err) {
        if (err instanceof Error) setError(true);
      }
    };
    fetchData();
    const query = querystring.stringify({ currentPage, limit, genre });

    router.push(`/?${query}`);
  }, [currentPage, limit, router, genre, title]);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div
      className='flex flex-col gap-5 p-2 sm:p-5 lg:p-10 bg-slate-800 text-white h-full'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight' && currentPage < totalPages) handlePageChange(currentPage + 1);
        if (e.key === 'ArrowLeft' && currentPage > 1) handlePageChange(currentPage - 1);
      }}
    >
      <h1 className='text-4xl text-center p-5'>Movies Sample Data</h1>
      <div className='flex flex-col sm:flex-row gap-4 sm:gap-10 items-center text-sm justify-center'>
        <span>Total Pages : {totalPages}</span>
        <span>Current Page : {currentPage}</span>

        <span>
          <label>
            Results per page :
            <select
              className='ml-2 bg-blue-300 px-2 py-2 text-slate-800 rounded-lg hover:bg-blue-400 cursor-pointer font-bold'
              value={limit}
              onChange={(e) => setLimit(+e.target.value)}
            >
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='30'>30</option>
            </select>
          </label>
        </span>
      </div>
      <div className='flex flex-col sm:flex-row gap-5 justify-center items-center'>
        <form
          onSubmit={(e) => {
            e.preventDefault(), setCurrentTitle(text);
          }}
        >
          <input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Search...'
            className='bg-black text-white rounded-lg text-center p-2 w-fit'
          />
        </form>

        <select
          className='bg-black text-white rounded-lg text-center p-2 w-fit'
          onChange={(e) => setGenre(e.target.value)}
          value={genre}
        >
          <option value='All' defaultValue='All'>
            All
          </option>
          {genres.sort().map((gen) => (
            <option key={gen} value={gen}>
              {gen}
            </option>
          ))}
        </select>
      </div>

      <Buttons {...{ currentPage, totalPages, handlePageChange, setCurrentPage }} />

      <div className='grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-2 sm:gap-5'>
        {!error ? (
          movies.map((movie) => (
            <div
              key={movie.id}
              className='flex flex-col items-center gap-5 bg-slate-700 rounded-lg shadow-2xl ring-2 p-5  text-white cursor-pointer hover:bg-slate-800 min-w-fit'
              onClick={() => router.push(`/movie/${movie.id}`)}
            >
              <p className='font-semibold text-2xl'>{movie.title}</p>
              <p className='text-sm'>{movie?.plot}</p>
              <p className='text-sm'>
                <b>Genres</b> {movie?.genres.join(', ')}
              </p>
              {movie?.poster ? (
                <Image
                  src={movie?.poster}
                  alt={movie?.title}
                  className='w-40 object-contain rounded-lg '
                  width={300}
                  height={300}
                  placeholder='blur'
                  blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8cuRFPQAHtQLxfqSEPgAAAABJRU5ErkJggg=='
                />
              ) : (
                <p className='italic text-red-300'>No image found</p>
              )}
            </div>
          ))
        ) : (
          <p className='text-red-500 text-4xl bg-slate-700 p-5 rounded-lg text-center w-screen'>
            Error Loading Database, Please try again Later.
          </p>
        )}
      </div>
      <Buttons {...{ currentPage, totalPages, handlePageChange, setCurrentPage }} />
    </div>
  );
}

export default Home;

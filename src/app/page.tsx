'use client';
import { useState, useEffect } from 'react';
import Buttons from './components/Pagination';
import Image from 'next/image';
import { fetchMovies } from './api/actions';
import type { movies } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import querystring from 'querystring';
import { genreValue } from './lib/helper';
import Loading from './components/Loading';
import UserInput from './components/UserInput';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

function Home() {
  const urlParams = useSearchParams();
  const [movies, setMovies] = useState<movies[]>([]);
  const [currentPage, setCurrentPage] = useState(Number(urlParams.get('currentPage') ?? 1));
  const [totalPages, setTotalPages] = useState(0);
  const [genres] = useState<string[]>(genreValue);
  const [genre, setGenre] = useState(urlParams.get('genre') ?? '');
  const [limit, setLimit] = useState(Number(urlParams.get('limit') ?? 10));
  const [searchText, setSearchText] = useState('');
  const [title, setCurrentTitle] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [directorText, setDirectorText] = useState(urlParams.get('director') ?? '');
  const [director, setDirector] = useState(urlParams.get('director') ?? '');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { moviesList, totalPages } = await fetchMovies(currentPage, limit, genre, title, director);
        setMovies(moviesList);
        setTotalPages(totalPages);
      } catch (err) {
        if (err instanceof Error) setError(true);
      } finally {
        setLoading(false);
      }
    };

    const query = querystring.stringify({ currentPage, limit, genre });
    router.replace(`/?${query}`);
    fetchData();
  }, [currentPage, limit, router, genre, title, director]);

  const handlePageChange = (page: number) => setCurrentPage(page);

  function handleKeyPress(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowRight' && currentPage < totalPages) handlePageChange(currentPage + 1);
    if (e.key === 'ArrowLeft' && currentPage > 1) handlePageChange(currentPage - 1);
  }

  return (
    <div
      className='flex flex-col gap-5 p-2 sm:p-5 lg:p-10 bg-slate-800 text-white'
      tabIndex={0}
      onKeyDown={handleKeyPress}
    >
      <h1 className='text-4xl text-center p-5'>Movies Sample Data</h1>
      <SearchResults {...{ totalPages, currentPage, limit, setLimit }} />
      <UserInput
        {...{
          genre,
          genres,
          setGenre,
          setCurrentTitle,
          searchText,
          setSearchText,
          setDirector,
          directorText,
          setDirectorText,
          setCurrentPage,
        }}
      />
      <Buttons {...{ currentPage, totalPages, handlePageChange, setCurrentPage }} />

      <p className='text-center'>You can also you keyboard arrow keys to change pages.</p>
      {loading ? (
        <Loading />
      ) : !error ? (
        <Movies {...{ movies, router }} />
      ) : (
        <p className='text-red-500 text-4xl bg-slate-700 p-5 rounded-lg text-center'>
          Error Loading Database, Please try again Later.
        </p>
      )}

      <Buttons {...{ currentPage, totalPages, handlePageChange, setCurrentPage }} />
    </div>
  );
}

function Movies({ movies, router }: { movies: movies[]; router: AppRouterInstance }) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5'>
      {movies?.map((movie) => (
        <div
          key={movie.id}
          className='flex flex-col items-center gap-5 bg-slate-700 rounded-lg shadow-2xl ring-2 p-5 text-white cursor-pointer hover:bg-slate-800 min-w-fit'
          onClick={() => router.push(`/movie/${movie.id}`)}
        >
          <p className='font-semibold text-2xl'>{movie.title}</p>
          <p className='text-sm'>{movie?.plot}</p>
          <p className='text-sm'>
            <b>Genres:</b> {movie?.genres.join(', ')}
          </p>
          {movie?.poster ? (
            <Image
              src={movie?.poster}
              alt={movie?.title}
              className='w-40 object-contain rounded-lg'
              width={300}
              height={300}
              placeholder='blur'
              blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8cuRFPQAHtQLxfqSEPgAAAABJRU5ErkJggg=='
            />
          ) : (
            <p className='italic text-red-300'>No image found</p>
          )}
        </div>
      ))}
    </div>
  );
}
function SearchResults({ totalPages, currentPage, limit, setLimit }: SearchResults) {
  return (
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
  );
}

type SearchResults = {
  totalPages: number;
  currentPage: number;
  limit: number;
  setLimit: (n: number) => void;
};
export default Home;

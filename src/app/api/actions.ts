'use server';
import prisma from '../lib/prisma';

async function fetchMovies(page: number, limit: number) {
  const currentPage = page ?? 1;
  const limitValue = limit ?? 10;
  const movies = await prisma.movies.findMany({
    skip: (currentPage - 1) * limitValue,
    take: limitValue,
  });
  const totalCount = await prisma.movies.count();
  const totalPages = Math.ceil(totalCount / limitValue);
  return { moviesList: movies, totalPages };
}

async function fetchMovie(id: string) {
  const movie = await prisma.movies.findFirst({ where: { id: id } });
  return movie;
}

async function nextMovie(id: string) {
  const nextMovie = await prisma.movies.findMany({
    take: 1,
    where: { id: { gt: id } },
    orderBy: { id: 'asc' },
  });
  return nextMovie[0];
}

async function prevMovie(id: string) {
  const nextMovie = await prisma.movies.findMany({
    take: 1,
    where: { id: { lt: id } },
    orderBy: { id: 'asc' },
  });
  return nextMovie[0];
}

export { fetchMovies, fetchMovie, nextMovie, prevMovie };

'use server';
import prisma from '../lib/prisma';

async function fetchMovies(page: number, limit: number, genreParams?: string, textParams?: string) {
  const currentPage = page ?? 1;
  const limitValue = Math.min(limit, 30) ?? 10;

  let whereCondition = {};
  if (genreParams == 'All') {
    genreParams = '';
  }

  if (genreParams || textParams) {
    whereCondition = {
      genres: genreParams ? { hasSome: [genreParams] } : undefined,
      OR: textParams ? [{ title: { contains: textParams, mode: 'insensitive' } }] : undefined,
    };
  }

  const movies = await prisma.movies.findMany({
    skip: (currentPage - 1) * limitValue,
    take: limitValue,
    where: whereCondition,
  });

  const totalCount = await prisma.movies.count();
  const totalPages = Math.ceil(totalCount / limitValue);
  console.log(genreParams, textParams);
  return { moviesList: movies, totalPages };
}

async function fetchMovie(id: string) {
  const movie = await prisma.movies.findFirst({ where: { id: id } });
  return movie;
}

export async function fetchCommentsForMovie(id: string) {
  const comments = await prisma.comments.findMany({
    where: { movie_id: id },
  });
  return comments;
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

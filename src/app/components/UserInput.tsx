export default function UserInput({
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
}: UserInput) {
  return (
    <div className='flex flex-col sm:flex-row gap-5 justify-center items-center'>
      <form
        onSubmit={(e) => {
          e.preventDefault(), setCurrentTitle(searchText), setCurrentPage(1);
        }}
      >
        <label htmlFor='Title'>
          <input
            type='text'
            value={searchText}
            name='Title'
            onChange={(e) => setSearchText(e.target.value)}
            placeholder='Search by title...'
            className='bg-black text-white rounded-lg text-center p-2 w-fit'
          />
        </label>
      </form>

      <form
        onSubmit={(e) => {
          e.preventDefault(), setDirector(directorText), setCurrentPage(1);
        }}
      >
        {' '}
        <label htmlFor='Director'>
          <input
            type='text'
            name='Director'
            value={directorText}
            onChange={(e) => setDirectorText(e.target.value)}
            placeholder='Search by director...'
            className='bg-black text-white rounded-lg text-center p-2 w-fit'
          />{' '}
        </label>
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
  );
}

type UserInput = {
  genres: string[];
  genre: string;
  setGenre: (arg0: string) => void;
  setCurrentTitle: (arg0: string) => void;
  searchText: string;
  setSearchText: (arg0: string) => void;
  setDirector: (arg0: string) => void;
  directorText: string;
  setDirectorText: (arg0: string) => void;
  setCurrentPage: (arg0: number) => void;
};

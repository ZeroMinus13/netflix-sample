'use client';
import clsx from 'clsx';
function Buttons({
  currentPage,
  handlePageChange,
  totalPages,
  setCurrentPage,
}: {
  currentPage: number;
  handlePageChange: (page: number) => void;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}) {
  return (
    <div className='flex flex-col gap-2 py-2 justify-evenly sm:flex-row'>
      <button
        onClick={() => {
          if (currentPage > 1) {
            handlePageChange(currentPage - 1);
          }
        }}
        disabled={currentPage <= 1}
        className='bg-blue-200 text-slate-800 p-2 px-5 rounded-lg font-bold hover:bg-blue-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:bg-blue-500'
      >
        Previous
      </button>

      <div className='text-center'>
        {Array.from(Array(totalPages).keys())
          .slice(Math.max(currentPage - 4, 0), Math.min(currentPage + 3, totalPages))
          .map((i) => (
            <span key={i} className='p-2'>
              <button
                onClick={() => {
                  setCurrentPage(i + 1);
                }}
                className={clsx(
                  'bg-blue-200 text-slate-800 p-2 px-5 rounded-lg font-bold hover:bg-blue-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:bg-blue-500 text-center',
                  i + 1 === currentPage && 'bg-blue-500'
                )}
              >
                {i + 1}
              </button>
            </span>
          ))}
      </div>

      <button
        onClick={() => {
          if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
          }
        }}
        disabled={currentPage >= totalPages}
        className='bg-blue-200 text-slate-800 p-2 px-5 rounded-lg font-bold hover:bg-blue-400 disabled:opacity-70 disabled:cursor-not-allowed active:bg-blue-500'
      >
        Next
      </button>
    </div>
  );
}
export default Buttons;

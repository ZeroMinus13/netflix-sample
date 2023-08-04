'use client';
function Buttons({
  currentPage,
  handlePageChange,
  totalPages,
}: {
  currentPage: number;
  handlePageChange: (page: number) => void;
  totalPages: number;
}) {
  return (
    <div className='flex gap-2 py-2 justify-evenly'>
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

      <select
        className='bg-black text-white rounded-lg w-fit text-right'
        value={currentPage}
        onChange={(e) => handlePageChange(+e.target.value)}
      >
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <option key={page} value={page} className=''>
            {page}
          </option>
        ))}
      </select>

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

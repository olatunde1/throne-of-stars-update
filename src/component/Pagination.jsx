import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export default function Pagination({ page, pageCount, onPageChange }) {
  if (pageCount <= 1) return null;

  return (
    <nav aria-label="Product pages" className="mt-8 flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => onPageChange(1)}
        disabled={page === 1}
        aria-label="First page"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition md:hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronsLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous page"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition md:hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={18} />
      </button>
      <span className="min-w-[6.5rem] text-center text-sm font-medium text-gray-600">
        Page {page} of {pageCount}
      </span>
      <button
        type="button"
        onClick={() => onPageChange(Math.min(pageCount, page + 1))}
        disabled={page === pageCount}
        aria-label="Next page"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition md:hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight size={18} />
      </button>
      <button
        type="button"
        onClick={() => onPageChange(pageCount)}
        disabled={page === pageCount}
        aria-label="Last page"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition md:hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronsRight size={18} />
      </button>
    </nav>
  );
}

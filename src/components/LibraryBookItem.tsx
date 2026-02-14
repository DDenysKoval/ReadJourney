import type { BookWithProgress } from "../types/books";
import { formatAndTrimTitle } from "../utils/toTitleCase";

export interface LibraryBookItemProps {
  book: BookWithProgress;
  onClick: (id: string) => void;
  handleRemove: (id: string) => void;
}

export default function LibraryBookItem({
  book,
  onClick,
  handleRemove,
}: LibraryBookItemProps) {
  return (
    <li>
      <img
        className="h-52 rounded-lg block mb-2 w-full cursor-pointer"
        src={book?.imageUrl}
        height={208}
        onClick={() => onClick(book?._id)}
      />
      <div className="flex justify-between">
        <div>
          <h2 className="text-[14px] leading-[1.29] text-white font-bold  mb-0.5 tracking-[-0.02em] ">
            {book?.title && formatAndTrimTitle(book.title, 10)}
          </h2>
          <p className="text-very-light-gray text-[10px] leading-[1.2]">
            {book?.author}
          </p>
        </div>
        <button
          className="flex items-center justify-center w-7 h-7 border bg-[#e850501a] border-[#e8505033] rounded-[50%] shrink-0"
          type="button"
          onClick={() => handleRemove(book._id)}
        >
          <svg className="fill-none stroke-[#E85050]" height={14} width={14}>
            <use href="/icons.svg#trash"></use>
          </svg>
        </button>
      </div>
    </li>
  );
}

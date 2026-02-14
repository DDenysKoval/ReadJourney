import type { Book } from "../types/books";
import { formatAndTrimTitle } from "../utils/toTitleCase";

export interface BookItemProps {
  book: Book;
  onClick: (id: string) => void;
  page: string;
}

export default function BookItem({ book, onClick, page }: BookItemProps) {
  return (
    <li
      className={`${page === "library" ? "w-1/3" : "w-1/2"} cursor-pointer`}
      onClick={() => onClick(book?._id)}
    >
      <img
        className={`${page === "library" ? "h-26.75" : "h-52"} rounded-lg block mb-2 w-full`}
        src={book?.imageUrl}
        height={208}
      />
      <h2
        className={`${page === "library" ? "text-[10px] leading-[1.2]" : "text-[14px] leading-[1.29]"} text-white font-bold  mb-0.5 tracking-[-0.02em]`}
      >
        {book?.title &&
          formatAndTrimTitle(book.title, page === "library" ? 12 : 15)}
      </h2>
      <p className="text-very-light-gray text-[10px] leading-[1.2]">
        {book?.author}
      </p>
    </li>
  );
}

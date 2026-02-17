import { useState } from "react";
import type { BookWithProgress } from "../types/books";

interface MyReadingProps {
  book: BookWithProgress;
}

export default function MyReading({ book }: MyReadingProps) {
  const [bookInProgress, setBookInProgress] = useState(false);

  return (
    <section className="pb-10">
      <div className="container">
        <div className="w-full bg-middle-gray rounded-[30px] p-5 md:p-8 lg:p-5 lg:pt-10">
          <h1 className="text-white text-[20px] font-bold mb-10">My reading</h1>
          <div className=" flex flex-col items-center w-36.5 mx-auto mb-5">
            <img
              src={book.imageUrl}
              alt="book cover"
              className="w-34.25 rounded-lg mb-2.5"
            />
            <h3 className="text-white text-[14px] leading-[1.29] mb-1.25 text-center">
              {book.title}
            </h3>
            <p className="text-very-light-gray text-[10px] leading-[1.2]">
              {book.author}
            </p>
          </div>
          <button
            className="w-10 h-10 rounded-[50px] border-white border-2 mx-auto flex justify-center items-center cursor-pointer"
            type="button"
          >
            {!bookInProgress ? (
              <div className="w-7.5 h-7.5 rounded-[50px] bg-red"></div>
            ) : (
              <div className="w-3.75 h-3.75 rounded-[3px] bg-red"></div>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

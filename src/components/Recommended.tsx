import { useState } from "react";
import {
  addToLibraryBook,
  fetchAllBooks,
  fetchBookById,
} from "../services/userServices";
import BookItem from "./BookItem";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Modal from "./Modal";
import ButtonComp from "./ButtonComp";
import toast from "react-hot-toast";
import type { FilterFormValues } from "./Filters";

interface RecommendProps {
  filters: FilterFormValues;
}

export default function Recommended({ filters }: RecommendProps) {
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const limit = 2;
  const { data } = useQuery({
    queryKey: ["books", page, limit, filters],
    queryFn: () => fetchAllBooks({ page, limit, filters }),
    placeholderData: keepPreviousData,
  });

  const { data: selectedBook } = useQuery({
    queryKey: ["book", selectedBookId],
    queryFn: () => fetchBookById(selectedBookId!),
    enabled: !!selectedBookId,
  });

  const hasPrevPage = page > 1;
  const hasNextPage = page < (data?.totalPages ?? 1);

  const handlePrev = () => {
    if (hasPrevPage) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (hasNextPage) setPage((prev) => prev + 1);
  };
  const handleOpenModal = async (id: string) => {
    setSelectedBookId(id);
    setModalIsOpen(true);
  };
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };
  const handleAddToLibrary = async (id: string) => {
    try {
      await addToLibraryBook(id);
      toast.success("Added to library sucessfully");
      setModalIsOpen(false);
    } catch {
      toast.error("Add to library was failed");
    }
  };
  const addToLibraryButton = {
    width: "w-[141px]",
    height: "h-[42px]",
    backgroundColor: "bg-transparent",
    borderColor: "border-very-light-gray",
    color: "text-white",
    backgroundColorHover: "hover:bg-white",
    borderColorHover: "hover:border-white",
    colorHover: "hover:text-middle-gray",
  };
  return (
    <section className="mb-40">
      <div className="container">
        <div className="w-full bg-middle-gray rounded-[30px] p-5 md:p-8 lg:p-5 lg:pt-10 relative py-10 px-5">
          <h1 className="text-white font-bold text-[20px] leading-none mb-8.5">
            Recommended
          </h1>
          <div className="flex gap-2 absolute right-5 top-10">
            <button
              type="button"
              className="cursor-pointer w-8 h-8 bg:transparent border rounded-[50%] border-very-light-gray flex items-center justify-center"
              onClick={handlePrev}
            >
              <svg
                className={
                  hasPrevPage ? "stroke-white" : "stroke-very-light-gray"
                }
                width={16}
                height={16}
              >
                <use href="/icons.svg#chevron-left"></use>
              </svg>
            </button>
            <button
              type="button"
              className="cursor-pointer w-8 h-8 bg:transparent border rounded-[50%] border-very-light-gray flex items-center justify-center"
              onClick={handleNext}
            >
              <svg
                className={
                  hasNextPage ? "stroke-white" : "stroke-very-light-gray"
                }
                width={16}
                height={16}
              >
                <use href="/icons.svg#chevron-right"></use>
              </svg>
            </button>
          </div>
          <ul className="flex gap-5">
            {data?.results?.map((book) => {
              return (
                <BookItem
                  key={book._id}
                  book={book}
                  onClick={handleOpenModal}
                  page="home"
                />
              );
            })}
          </ul>
        </div>
      </div>
      {modalIsOpen && (
        <Modal onClose={handleCloseModal} width="w-[335px]">
          <div className="flex flex-col items-center justify-center">
            <img
              className="h-53.25 mb-4"
              src={selectedBook?.imageUrl}
              alt=""
              height={213}
            />
            <div className="flex flex-col items-center p-8">
              <h2 className="text-white font-bold text-[18px] leading-none mb-0.5 text-center">
                {selectedBook?.title}
              </h2>
              <p className="text-very-light-gray text-[12px] leading-[1.2] mb-1">
                {selectedBook?.author}
              </p>
              <p className="text-white text-[10px] leading-[1.2]">
                {selectedBook?.totalPages} pages
              </p>
            </div>
            <ButtonComp
              text="Add to library"
              buttonData={addToLibraryButton}
              onClick={() => handleAddToLibrary(selectedBook._id)}
            />
          </div>
        </Modal>
      )}
    </section>
  );
}

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  addToLibraryBook,
  fetchAllBooks,
  fetchBookById,
} from "../services/userServices";
import BookItem from "./BookItem";
import toast from "react-hot-toast";
import Modal from "./Modal";
import ButtonComp from "./ButtonComp";

export default function LibraryRecommended() {
  // const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const page = 1;
  const limit = 3;
  const { data } = useQuery({
    queryKey: ["books", page, limit],
    queryFn: () => fetchAllBooks({ page, limit }),
    placeholderData: keepPreviousData,
  });

  const { data: selectedBook } = useQuery({
    queryKey: ["book", selectedBookId],
    queryFn: () => fetchBookById(selectedBookId!),
    enabled: !!selectedBookId,
  });
  const handleOpenModal = async (id: string) => {
    setSelectedBookId(id);
    setModalIsOpen(true);
  };
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };
  const handleAddTolibrary = async (id: string) => {
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
    <div className="p-5 rounded-xl bg-light-gray">
      <h2 className="text-white">Recommended books</h2>
      <ul className="flex gap-5 mb-5">
        {data?.results.map((book) => {
          return (
            <BookItem
              key={book._id}
              book={book}
              onClick={handleOpenModal}
              page="library"
            />
          );
        })}
      </ul>
      <div className="flex justify-between">
        <a className="text-very-light-gray hover:text-white underline" href="/">
          Home
        </a>
        <a href="/">
          <svg height={24} width={24}>
            <use href="/icons.svg#login"></use>
          </svg>
        </a>
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
              onClick={() => handleAddTolibrary(selectedBook._id)}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import {
  fetchBookById,
  fetchOwnBooks,
  removeBookFromLibrary,
} from "../services/userServices";
import LibraryBookItem from "./LibraryBookItem";
import { useState } from "react";
import Modal from "./Modal";
import ButtonComp from "./ButtonComp";
import toast from "react-hot-toast";

export default function MyLibrary() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const { data } = useQuery({
    queryKey: ["books"],
    queryFn: () => fetchOwnBooks(),
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
  const handleRemoveFromLibrary = async (id: string) => {
    try {
      await removeBookFromLibrary(id);
      toast.success("Sucessfully removed from library");
    } catch {
      toast.error("Failed to remove from library");
    }
  };
  const handleStartReading = async (id: string) => {
    console.log(id);
  };

  const startReadingButton = {
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
    <section>
      <div className="container">
        <div className="w-full bg-middle-gray rounded-[30px] p-5 md:p-8 lg:p-5 lg:pt-10">
          <h1 className="text-white text-[20px] font-bold mb-8.5">
            My library
          </h1>
          <ul className="grid grid-cols-2 gap-5">
            {data?.map((book) => {
              return (
                <LibraryBookItem
                  key={book._id}
                  book={book}
                  onClick={handleOpenModal}
                  handleRemove={handleRemoveFromLibrary}
                />
              );
            })}
          </ul>
        </div>
      </div>
      {modalIsOpen && selectedBook && (
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
              text="Start Reading"
              buttonData={startReadingButton}
              onClick={() =>
                selectedBookId && handleStartReading(selectedBookId)
              }
            />
          </div>
        </Modal>
      )}
    </section>
  );
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToLibraryOwnBook,
  fetchBookById,
  fetchOwnBooks,
  removeBookFromLibrary,
} from "../services/userServices";
import LibraryBookItem from "./LibraryBookItem";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import ButtonComp from "./ButtonComp";
import toast from "react-hot-toast";
import type { FilterFormValues } from "./Filters";
import SelectComp from "./Select";

interface MyLibraryProps {
  bookToCreate: FilterFormValues | null;
}

export default function MyLibrary({ bookToCreate }: MyLibraryProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [goodJobModalIsOpen, setGoodJobModalIsOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [status, setStatus] = useState("all");

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["books", status],
    queryFn: () =>
      status === "all" ? fetchOwnBooks() : fetchOwnBooks({ status }),
  });
  const { data: selectedBook } = useQuery({
    queryKey: ["book", selectedBookId],
    queryFn: () => fetchBookById(selectedBookId!),
    enabled: !!selectedBookId,
  });

  const removeMutation = useMutation({
    mutationFn: removeBookFromLibrary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Sucessfully removed from library");
    },
    onError: () => {
      toast.error("Failed to remove from library");
    },
  });

  const addToLibraryMutation = useMutation({
    mutationFn: addToLibraryOwnBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      setGoodJobModalIsOpen(true);
      toast.success("Sucessfully added to library");
    },
    onError: () => {
      toast.error("Failed to remove from library");
    },
  });

  const handleOpenModal = async (id: string) => {
    setSelectedBookId(id);
    setModalIsOpen(true);
  };
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };
  const handleCloseGoodJobModal = () => {
    setGoodJobModalIsOpen(false);
  };

  const handleRemoveFromLibrary = async (id: string) => {
    removeMutation.mutate(id);
  };

  const handleStartReading = async (id: string) => {
    console.log(id);
  };
  useEffect(() => {
    if (!bookToCreate) return;

    addToLibraryMutation.mutate(bookToCreate);
  }, [bookToCreate]);

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
    <section className="pb-10">
      <div className="container">
        <div className="relative w-full bg-middle-gray rounded-[30px] p-5 md:p-8 lg:p-5 lg:pt-10">
          <h1 className="text-white text-[20px] font-bold mb-8.5">
            My library
          </h1>
          <div className="absolute top-5 right-5 h-10 w-30">
            <SelectComp onChange={setStatus} />
          </div>
          {data?.length === 0 ? (
            <div className="flex  flex-col items-center mx-auto pt-12.25 pb-25 w-49.25">
              <div className="w-25 h-25 bg-light-gray rounded-[50%] mb-2.5 bg-[url(/books@1x.webp)] bg-no-repeat bg-center"></div>
              <p className="text-white text-center text-[14px] leading-[1.29] tracking-[-0.02em]">
                To start training, add{" "}
                <span className="text-very-light-gray">some of your books</span>{" "}
                or from the recommended ones
              </p>
            </div>
          ) : (
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
          )}
        </div>
      </div>
      {modalIsOpen && selectedBook && (
        <Modal onClose={handleCloseModal} width="w-[335px]">
          <div className="flex flex-col items-center justify-center">
            <img
              className="h-53.25 mb-4"
              src={selectedBook?.imageUrl}
              alt="book image"
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
      {goodJobModalIsOpen && (
        <Modal onClose={handleCloseGoodJobModal} width="w-[335px]">
          <div className="flex flex-col items-center justify-center">
            <div className="w-12.5 h-12.5 bg-[url(./fingerup@1x.webp)] bg-no-repeat mb-5"></div>
            <div className="flex flex-col items-center ">
              <h3 className="text-white font-bold text-[18px] mb-2.5">
                Good Job
              </h3>
              <p className="text-very-light-gray text-[14px] leading-[1.29] tracking-[-0.02em] text-center block w-[242px]">
                Your book is now in{" "}
                <span className="text-white">the library!</span> The joy knows
                no bounds and now you can start your training
              </p>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}

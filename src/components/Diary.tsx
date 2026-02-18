import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BookWithProgress } from "../types/books";
import DiaryItem from "./DiaryItem";
import { deleteReading, fetchBookById } from "../services/userServices";
import toast from "react-hot-toast";

interface DiaryProps {
  book: BookWithProgress;
}

export default function Diary({ book }: DiaryProps) {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["book", book],
    queryFn: () => fetchBookById(book._id),
  });

  const deleteProgItemMutate = useMutation({
    mutationFn: deleteReading,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["book"] });
    },
    onError: () => {
      toast.error("Failed to delete reading progress");
    },
  });

  const handleDelete = (readingId: string) => {
    deleteProgItemMutate.mutate({
      bookId: book._id,
      readingId,
    });
  };

  return (
    <ul className="h-52.75 overflow-scroll p-4 bg-light-gray rounded-xl">
      {data?.progress
        .sort(
          (a, b) =>
            new Date(b.startReading).getTime() -
            new Date(a.startReading).getTime()
        )
        .map((item) => (
          <DiaryItem
            key={item.startReading}
            progItem={item}
            pages={book.totalPages}
            onClick={handleDelete}
          />
        ))}
    </ul>
  );
}

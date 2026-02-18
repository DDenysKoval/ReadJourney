import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuthStore } from "../libs/store/authStore";
import {
  fetchBookById,
  finishReading,
  startReading,
} from "../services/userServices";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import StartReading, {
  type StartReadingFormValues,
} from "../components/StartReading";
import Progress from "../components/Progress";
import MyReading from "../components/MyReading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import DiaryStatistics from "../components/DiaryStatistics";

export default function MyReadingPage() {
  const [isReading, setIsReading] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();
  const book = location.state?.book;

  const queryClient = useQueryClient();

  const startReadingMutation = useMutation({
    mutationFn: startReading,
    onSuccess: () => {
      setIsReading(true);
    },
    onError: () => {
      toast.error("Failed to start reading");
    },
  });

  const finishReadingMutation = useMutation({
    mutationFn: finishReading,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["book"] });
      setIsReading(false);
    },
    onError: () => {
      toast.error("Failed to stop reading");
    },
  });

  const handleReading = (values: StartReadingFormValues) => {
    if (!book?._id) {
      toast.error("Book not found");
      return;
    }

    const payload = {
      id: book._id,
      page: Number(values.page),
    };

    if (isReading) {
      finishReadingMutation.mutate(payload);
    } else {
      startReadingMutation.mutate(payload);
    }
  };

  useEffect(() => {
    console.log(user, isAuthenticated);

    // refreshUser();
    // if (!user) {
    //   navigate("/register");
    // }
  }, [user]);
  return (
    <main>
      <Header user={user} />
      <Dashboard>
        <StartReading onSubmitFilters={handleReading} isReading={isReading} />
        {book.status === "in-progress" ? (
          <DiaryStatistics book={book} />
        ) : (
          <Progress />
        )}
      </Dashboard>
      <MyReading book={book} isReading={isReading} />
    </main>
  );
}

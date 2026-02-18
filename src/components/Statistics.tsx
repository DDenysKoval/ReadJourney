import type { BookWithProgress } from "../types/books";

interface StatisticsProps {
  book: BookWithProgress;
}

export default function Statistics({ book }: StatisticsProps) {
  const totalProgress = (totalPages: number, finishPage: number) => {
    if (!totalPages) return "0%";

    return `${((finishPage / totalPages) * 100).toFixed(1)}%`;
  };
  return <div className="h-52.75">statistics</div>;
}

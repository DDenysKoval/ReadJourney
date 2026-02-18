import { useState } from "react";
import Diary from "./Diary";
import Statistics from "./Statistics";
import type { BookWithProgress } from "../types/books";

interface DiaryStatisticsProps {
  book: BookWithProgress;
}

export default function DiaryStatistics({ book }: DiaryStatisticsProps) {
  const [isHourGlass, setIsHourGlass] = useState(true);

  const handleClickHourGlasses = () => {
    setIsHourGlass(true);
  };
  const handleClickPieChart = () => {
    setIsHourGlass(false);
  };
  return (
    <div>
      <div className="flex justify-between mb-5">
        <h2 className="text-white text-[18px] font-bold">
          {isHourGlass ? "Diary" : "Statistics"}
        </h2>
        <div className="flex gap-2">
          <button type="button" onClick={handleClickHourGlasses}>
            <svg
              className={`hover:stroke-white
                ${isHourGlass ? "stroke-white" : "stroke-very-light-gray"}
              `}
              height={16}
              width={16}
            >
              <use href="/icons.svg#hourglass"></use>
            </svg>
          </button>
          <button type="button" onClick={handleClickPieChart}>
            <svg
              className={`hover:stroke-white
                ${!isHourGlass ? "stroke-white" : "stroke-very-light-gray"}
              `}
              height={16}
              width={16}
            >
              <use href="/icons.svg#pie-chart"></use>
            </svg>
          </button>
        </div>
      </div>
      {isHourGlass ? <Diary book={book} /> : <Statistics book={book} />}
    </div>
  );
}

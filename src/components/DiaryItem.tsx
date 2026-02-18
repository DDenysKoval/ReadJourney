import type { ProgressItem } from "../types/books";

interface DiaryItemProps {
  progItem: ProgressItem;
  pages: number;
  onClick: (readingId: string) => void;
}

export default function DiaryItem({
  progItem,
  pages,
  onClick,
}: DiaryItemProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("uk-UA");
  };

  const getReadingDuration = (start: string, end: string) => {
    const diffMs = new Date(end).getTime() - new Date(start).getTime();

    const totalMinutes = Math.floor(diffMs / (1000 * 60));

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    console.log(hours, minutes);

    return `${hours ? hours + " hour " : ""}${minutes} minutes`;
  };

  const readingProgress = (
    totalPages: number,
    startPage: number,
    finishPage: number
  ) => {
    const readPages = finishPage - startPage + 1;

    if (!totalPages || readPages <= 0) return "0%";

    const percent = (readPages / totalPages) * 100;

    return `${percent.toFixed(1)}%`;
  };
  return (
    <li className="group h-24.5 flex justify-between">
      <div className="flex">
        <div className="relative w-4 h-4 border-4 border-very-light-gray bg-dark-gray rounded-sm mr-2 after:absolute after:h-20.5 after:w-0.5 after:content-[''] after:bg-middle-gray after:left-[3px] after:top-[12px] group-first:border-white"></div>
        <div className="flex flex-col mb-4">
          <p className="text-very-light-gray text-[12px] font-bold leading-[1.33] mb-4.25 group-first:text-white">
            {formatDate(progItem.finishReading)}
          </p>
          <p className="text-white text-[14px] leading-[1.29] mb-1">
            {readingProgress(pages, progItem.startPage, progItem.finishPage)}
          </p>
          <p className="text-very-light-gray text-[10px] leading-[1.2]">
            {getReadingDuration(progItem.startReading, progItem.finishReading)}
          </p>
        </div>
      </div>
      <div className="flex">
        <div className="mr-1.5">
          <p className="text-very-light-gray text-[12px] leading-[1.2] mb-4">
            {Math.floor(progItem.finishPage - progItem.startPage)} pages
          </p>
          <svg className="mb-1.75" width={43} height={18}>
            <use href="/icons.svg#block"></use>
          </svg>
          <p className="text-very-light-gray text-[10px] tracking-[-0.02em] block w-10.75">
            {progItem.speed} pages per hour
          </p>
        </div>
        <button
          className="h-5 w-5 pt-7.5"
          type="button"
          onClick={() => onClick(progItem._id)}
        >
          <svg
            className="stroke-very-light-gray fill-none hover:stroke-white"
            width={14}
            height={14}
          >
            <use href="/icons.svg#trash"></use>
          </svg>
        </button>
      </div>
    </li>
  );
}

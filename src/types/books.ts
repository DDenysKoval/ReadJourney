export interface Book {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  recommend: boolean;
}

export interface ProgressItem {
  _id: string;
  startPage: number;
  startReading: string;
  finishPage: number;
  finishReading: string;
  speed: number;
  status: string;
}

export interface BookWithProgress {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  status: "in-progress" | "done" | "unread";
  owner: string;
  progress: ProgressItem[];
  timeLeftToRead: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

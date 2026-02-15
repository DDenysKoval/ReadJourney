import ButtonComp from "./ButtonComp";
import { useForm, type SubmitHandler } from "react-hook-form";

export interface FilterFormValues {
  title: string;
  author: string;
  totalPages: string;
}

const toApplyButton = {
  width: "w-[98px]",
  height: "h-[38px]",
  backgroundColor: "bg-transparent",
  borderColor: "border-very-light-gray",
  color: "text-white",
  backgroundColorHover: "hover:bg-white",
  borderColorHover: "hover:border-white",
  colorHover: "hover:text-middle-gray",
};

export interface FiltersProps {
  isNumberOfPages: boolean;
  onSubmitFilters: (values: FilterFormValues) => void;
}

export default function Filters({
  isNumberOfPages,
  onSubmitFilters,
}: FiltersProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FilterFormValues>({
    defaultValues: {
      title: "",
      author: "",
      totalPages: "",
    },
  });

  const onSubmit: SubmitHandler<FilterFormValues> = async (values) => {
    onSubmitFilters(values);
    reset();
  };

  return (
    <div className="mb-5">
      <p className="text-white text-[10px] pl-3.5 mb-2">Filters:</p>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex items-center p-3.5  bg-light-gray rounded-xl w-full h-11">
          <label className=" text-very-light-gray mr-2 shrink-0">
            Book title:
          </label>
          <input
            {...register("title")}
            type="text"
            className="  text-white outline-0 w-full placeholder:text-white"
            placeholder="Enter text"
          />
          {errors.title && (
            <span className="text-red text-[10px] absolute top-11 left-0">
              {errors.title.message}
            </span>
          )}
        </div>
        <div
          className={`flex items-center p-3.5  bg-light-gray rounded-xl w-full h-11 ${isNumberOfPages ? "mb-0" : "mb-5"}`}
        >
          <label className=" text-very-light-gray mr-2 shrink-0">
            The author:
          </label>
          <input
            {...register("author")}
            type="text"
            className="  text-white outline-0 w-full placeholder:text-white"
            placeholder="Enter text"
          />
          {errors.author && (
            <span className="text-red text-[10px] absolute top-11 left-0">
              {errors.author.message}
            </span>
          )}
        </div>
        {isNumberOfPages && (
          <div className=" flex items-center p-3.5  bg-light-gray rounded-xl w-full h-11 mb-5">
            <label className=" text-very-light-gray mr-2 shrink-0">
              Number of pages:
            </label>
            <input
              {...register("totalPages")}
              type="number"
              className="  text-white outline-0 w-full placeholder:text-white"
              placeholder="0"
            />
            {errors.totalPages && (
              <span className="text-red text-[10px] absolute top-11 left-0">
                {errors.totalPages.message}
              </span>
            )}
          </div>
        )}

        <ButtonComp
          text={
            isNumberOfPages
              ? isSubmitting
                ? "Adding"
                : "Add book"
              : isSubmitting
                ? "Applying"
                : "To apply"
          }
          type="submit"
          buttonData={toApplyButton}
        />
      </form>
    </div>
  );
}

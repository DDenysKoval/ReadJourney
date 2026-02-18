import { useForm, type SubmitHandler } from "react-hook-form";
import ButtonComp from "./ButtonComp";

export interface StartReadingFormValues {
  page: string;
}

export interface FiltersProps {
  onSubmitFilters: (values: StartReadingFormValues) => void;
  isReading: boolean;
}

export default function StartReading({
  onSubmitFilters,
  isReading,
}: FiltersProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StartReadingFormValues>({
    defaultValues: {
      page: "",
    },
  });

  const onSubmit: SubmitHandler<StartReadingFormValues> = async (values) => {
    onSubmitFilters(values);
    reset();
  };
  const toStartReadingButton = {
    width: "w-[91px]",
    height: "h-[38px]",
    backgroundColor: "bg-transparent",
    borderColor: "border-very-light-gray",
    color: "text-white",
    backgroundColorHover: "hover:bg-white",
    borderColorHover: "hover:border-white",
    colorHover: "hover:text-middle-gray",
  };
  return (
    <>
      <p className="text-white text-[10px] pl-3.5 mb-2">
        {isReading ? "Finish page" : "Start page"}:
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-10">
        <div className=" flex items-center p-3.5  bg-light-gray rounded-xl w-full h-11 mb-5">
          <label className=" text-very-light-gray mr-2 shrink-0">
            Page number:
          </label>
          <input
            {...register("page")}
            type="number"
            className="  text-white outline-0 w-full placeholder:text-white"
            placeholder="0"
          />
          {errors.page && (
            <span className="text-red text-[10px] absolute top-11 left-0">
              {errors.page.message}
            </span>
          )}
        </div>
        <ButtonComp
          text={
            isReading
              ? isSubmitting
                ? "Stoping"
                : "To stop"
              : isSubmitting
                ? "Starting"
                : "To start"
          }
          type="submit"
          buttonData={toStartReadingButton}
        />
      </form>
    </>
  );
}

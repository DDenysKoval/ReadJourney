import clsx from "clsx";

interface ButtonProps {
  buttonData: {
    width: string;
    height: string;

    backgroundColor: string;
    borderColor: string;
    color: string;
    backgroundColorHover: string;
    borderColorHover: string;
    colorHover: string;
  };
  onClick?: () => void;
  type?: "button" | "submit";
  text: string;
}

const ButtonComp = ({
  buttonData: {
    width,
    height,
    backgroundColor,
    borderColor,
    color,
    backgroundColorHover,
    borderColorHover,
    colorHover,
  },
  onClick,
  type,
  text,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "block rounded-[30px] font-bold text-[18px] leading-[1.56] border cursor-pointer transition duration-300 ease-in-out mt-auto",
        width,
        height,
        backgroundColor,
        borderColor,
        color,
        backgroundColorHover,
        borderColorHover,
        colorHover
      )}
      type={type ? type : "button"}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonComp;

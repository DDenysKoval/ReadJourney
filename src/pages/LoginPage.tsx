import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import ButtonComp from "../components/ButtonComp";
import { useNavigate } from "react-router";
import HeroImage from "../components/HeroImage";
import LogoLink from "../components/LogoLink";

export interface SubmitLoginFormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Enter a valid Email*"),
  password: Yup.string().required("Enter a valid Password*"),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SubmitLoginFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SubmitLoginFormValues> = async (values) => {
    console.log(values);

    toast.success("Successfully logged in!");
    reset();
    navigate("/");
  };

  const buttonLogin = {
    text: "Log in",
    width: "w-[131px]",
    height: "h-[42px]",
    backgroundColor: "bg-white",
    borderColor: "border-white",
    color: "text-middle-gray",
    backgroundColorHover: "hover:bg-transparent",
    borderColorHover: "hover:border-very-light-gray",
    colorHover: "hover:text-white",
  };

  return (
    <main>
      <section className="py-5">
        <div className="container">
          <div className="relative w-full h-110.75 p-5 pb-10 bg-middle-gray rounded-[30px] mb-2.5">
            <LogoLink />
            <form
              className=" flex flex-col gap-4 "
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1 className="text-white text-[32px] font-bold tracking-[-0.02em] leading-none mb-5">
                Expand your mind, reading{" "}
                <span className="text-very-light-gray">a book</span>
              </h1>
              <div className="relative flex items-center p-3.5  bg-light-gray rounded-xl w-full h-11">
                <label className=" text-very-light-gray mr-2">Mail:</label>
                <input
                  {...register("email")}
                  type="email"
                  className="  text-white outline-0 w-full"
                />
                {errors.email && (
                  <span className="text-red text-[10px] absolute top-11 left-0">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="relative flex items-center p-3.5  bg-light-gray rounded-xl w-full h-11">
                <label className=" text-very-light-gray mr-2">Password:</label>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="  text-white outline-0 w-full"
                />
                {errors.password && (
                  <span className="text-red text-[10px] absolute top-11 left-0">
                    {errors.password.message}
                  </span>
                )}
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <svg
                    className="fill-white transition duration-300 ease-in-out"
                    width={20}
                    height={20}
                  >
                    {showPassword ? (
                      <use href="/icons.svg#eye" />
                    ) : (
                      <use href="/icons.svg#eye-off" />
                    )}
                  </svg>
                </button>
              </div>
              <div className="absolute bottom-10 flex items-center">
                <div className="mr-3.5">
                  <ButtonComp
                    buttonData={buttonLogin}
                    type="submit"
                    text={isSubmitting ? "Loggnig in..." : "Log in"}
                  />
                </div>
                <a
                  className="text-very-light-gray hover:text-white text-[12px] underline"
                  href="/register"
                >
                  Don’t have an account?
                </a>
              </div>
            </form>
          </div>
          <HeroImage />
        </div>
      </section>
    </main>
  );
}

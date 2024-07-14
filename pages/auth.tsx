import Image from "next/image";
import Input from "../components/Input";
import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";

import background from "../public/images/hero.jpg";
import Logo from "../components/Logo";
import { Controller, useForm } from "react-hook-form";

type FormFields = {
  name?: string,
  email: string,
  password: string
}

const Auth = () => {
  const { control, handleSubmit } = useForm<FormFields>();

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  }

  const onSubmit = async (data: FormFields) => {
    try {
      if (variant === "register") {
        await axios.post("/api/register", data);
      }

      login(data.email, data.password);
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  }

  return (
    <>
      <div className="fixed -z-10 h-full w-full">
        <Image
          src={background}
          alt="background"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="flex flex-col bg-black bg-opacity-70 py-5 px-8 gap-8 self-center mt-10 md:w-96 rounded-md w-full">
        <div className="flex flex-col justify-center items-center text-center text-white text-3xl">
          <Logo className="w-20" />
          Training Arena
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {variant === "register" && (
            <Controller
              name="name"
              control={control}
              render={({ field }) =>
                <Input
                  placeholder="Nome"
                  onChange={field.onChange}
                />
              }
            />

          )}
          <Controller
            name="email"
            control={control}
            render={({ field }) =>
              <Input
                placeholder="Email"
                onChange={field.onChange}
              />
            }
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) =>
              <Input
                type="password"
                placeholder="Password"
                onChange={field.onChange}
              />
            }
          />
          <button
            type="submit"
            className="
                  bg-red-600
                  py-3
                  text-white
                  rounded-md
                  w-full
                  hover-bg-red-700
                  transition
                  translate-y-0.5
                "
          >
            {variant === "login" ? "Login" : "Sign up"}
          </button>
        </form>

        <div
          className="
                  flex
                  flex-row
                  items-center
                  gap-4
                  justify-center
                "
        >
          <div
            onClick={() => signIn("google", { callbackUrl: "/profiles" })}
            className="
                    w-10
                    h-10
                    bg-white
                    rounded-full
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                    hover:opacity-80
                    transition
                  "
          >
            <FcGoogle size={30} />
          </div>
        </div>
        <p className="text-neutral-500 text-center">
          {variant === "login"
            ? "First time using Training Arena?"
            : "Already have an account?"}
          <br />
          <span
            onClick={toggleVariant}
            className="text-white hover:underline cursor-pointer "
          >
            {variant === "login" ? "Create an account" : "Login"}
          </span>
        </p>
      </div>
    </>
  );
};

export default Auth;

import Input from "@/components/Input";
import axios from "axios";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import {useRouter} from "next/router"

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
      );
    }, []);

    const login = useCallback(async () => {
      try {
        await signIn("credentials", {
          email,
          password,
          redirect: false,
          callbackUrl: "/",
        });
        router.push("/")
      } catch (error) {
        console.log(error);
      }
    }, [email, password]);
    
  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login()
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password,login]);


  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-cover bg-center bg-fixed">
      <div className="bg-black w-full h-full lg:bg-opacity-50 ">
        <nav className="px-12 py-5 z-5 ">
          <img src="/images/logo.png" alt="Logo" className="h-12 " />
        </nav>
        <div className="flex justify-center ">
          <div className="bg-black/70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold ">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  onChange={(e: any) => setName(e.target.value)}
                  id="name"
                  label="Name"
                  value={name}
                  type=""
                />
              )}
              <Input
                onChange={(e: any) => setEmail(e.target.value)}
                id="email"
                label="Email"
                value={email}
                type="email"
              />
              <Input
                onChange={(e: any) => setPassword(e.target.value)}
                id="password"
                label="Password"
                value={password}
                type="password"
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

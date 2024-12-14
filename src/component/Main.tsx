import { useCookies } from "../hooks/useCookies";
import cookieImg from "../assets/cookie.webp";
import { Shop } from "./Shop";
import { useState } from "react";
import { RotateCcwIcon, ShoppingCartIcon } from "lucide-react";
import { AnimatePresence } from "motion/react";

export function Main() {
  const { cookies, increment, refreshCookies } = useCookies();
  const [isShopOpen, setIsShopOpen] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col gap-3 justify-center items-center bg-yellow-100">
      <button
        onClick={() => setIsShopOpen(true)}
        className="absolute top-10 right-10"
      >
        <ShoppingCartIcon size={30} />
      </button>
      <h1 className="text-5xl font-dyna font-extrabold">Cookie Clicker</h1>
      <img
        src={cookieImg}
        loading="lazy"
        onClick={() => increment(1)}
        className="select-none cursor-pointer drop-shadow-xl hover:scale-105 active:scale-110 transition-transform"
        width={200}
        height={200}
        alt="Image de cookie"
      />
      <span className="text-5xl font-extrabold">{cookies.amount}</span>
      <AnimatePresence>
        {isShopOpen && <Shop onClose={() => setIsShopOpen(false)} />}
      </AnimatePresence>
      <button
        className="py-2 px-4 bg-yellow-300 rounded-md shadow-md hover:scale-105 active:scale-110 transition-transform flex flex-row gap-2 justify-center items-center"
        onClick={() => refreshCookies()}
      >
        <RotateCcwIcon />
        Réinitialiser
      </button>
    </div>
  );
}

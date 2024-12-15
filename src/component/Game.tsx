import { RotateCcwIcon, ShoppingCartIcon } from "lucide-react";
import { useCookies } from "../hooks/useCookies";
import cookieImg from "../assets/cookie.webp";
import { motion } from "motion/react";

export function Game({ onClick }: { onClick: () => void }) {
  const { cookies, increment, refreshCookies } = useCookies();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-screen w-full flex-col gap-3 justify-center items-center bg-yellow-100"
    >
      <button onClick={onClick} className="absolute top-10 right-14 ">
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
      <button
        className="py-2 px-4 bg-yellow-300 rounded-md shadow-md hover:scale-105 active:scale-110 transition-transform flex flex-row gap-2 justify-center items-center"
        onClick={() => refreshCookies()}
      >
        <RotateCcwIcon />
        Réinitialiser
      </button>
    </motion.div>
  );
}

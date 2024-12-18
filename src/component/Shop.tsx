import { XIcon } from "lucide-react";
import objects from "../data/objects.json";
import { Object } from "../store/cookie";
import { motion } from "motion/react";
import { Item } from "./Item";
import { useCookies } from "../hooks/useCookies";
import { useState } from "react";
import cookieImg from "../assets/cookie.webp";

export function Shop({ onClose }: { onClose: () => void }) {
  const { addObject, cookies } = useCookies();
  const [alert, setAlert] = useState<string | null>(null);

  const onClick = (object: Object) => {
    try {
      addObject(object);
    } catch {
      setAlert("Pas assez de cookies");
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    }
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="w-full h-full content-center mt-20"
    >
      <div className="flex flex-col gap-24 justify-center items-center">
        {alert && (
          <div className="bg-red-500 text-white p-3 rounded-md shadow-md">
            {alert}
          </div>
        )}
        <h3 className="text-3xl font-extrabold font-dyna">Magasin d'objet</h3>
        <div className="flex gap-3 flex-wrap justify-center mb-24 items-center">
          {objects.map((object: Object) => {
            return (
              <Item
                key={object.name}
                {...object}
                onClick={() => onClick(object)}
              />
            );
          })}
        </div>
      </div>
      <button onClick={onClose} className="absolute right-10 top-10">
        <XIcon size={30} />
      </button>
      <div className="fixed bottom-10 shadow-inner shadow-slate-600 left-10 min-w-40 px-3 flex items-center justify-start rounded-full bg-slate-800 text-white">
        <img src={cookieImg} width={50} height={50} alt="Image de cookie" />
        {cookies.amount}
      </div>
    </motion.div>
  );
}

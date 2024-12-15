import { XIcon } from "lucide-react";
import objects from "../data/objects.json";
import { Object } from "../store/cookie";
import { motion } from "motion/react";
import { Item } from "./Item";
import { useCookies } from "../hooks/useCookies";
import { useState } from "react";

export function Shop({ onClose }: { onClose: () => void }) {
  const { addObject } = useCookies();
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
      className="absolute w-full h-full bg-yellow-200"
    >
      <div className="flex flex-col gap-24 h-screen justify-center items-center">
        {alert && (
          <div className="bg-red-500 text-white p-3 rounded-md shadow-md">
            {alert}
          </div>
        )}
        <h3 className="text-3xl font-extrabold font-dyna">Magasin d'objet</h3>
        <div className="flex gap-3 flex-wrap justify-center items-center">
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
    </motion.div>
  );
}

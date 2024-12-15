import { useCookies } from "../hooks/useCookies";
import { Shop } from "./Shop";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { EffectType } from "../store/cookie";
import { IntervalManager } from "../utils/IntervalManager";
import { Game } from "./Game";

export function Main() {
  const { cookies, increment } = useCookies();
  const [isShopOpen, setIsShopOpen] = useState(false);

  useEffect(() => {
    const intervalManager = IntervalManager.getIntervalManager();

    cookies.objects.forEach((object) => {
      if (object.type === EffectType.PER_SECOND) {
        intervalManager.addInterval(() => {
          increment(object.value);
        }, 1000);
      }
    });

    return () => {
      intervalManager.clearIntervals();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.objects]);

  return (
    <AnimatePresence>
      {isShopOpen ? (
        <Shop onClose={() => setIsShopOpen(false)} />
      ) : (
        <Game onClick={() => setIsShopOpen(true)} />
      )}
    </AnimatePresence>
  );
}

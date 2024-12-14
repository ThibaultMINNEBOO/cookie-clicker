import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  addObject,
  decrement,
  increment,
  setAmount,
  Object,
  EffectType,
} from "../store/cookie";
import { IntervalManager } from "../utils/IntervalManager";
import { useEffect } from "react";

export const useCookies = () => {
  const cookies = useSelector((state: RootState) => state.cookies);
  const dispatch = useDispatch();
  const intervalManager = IntervalManager.getIntervalManager();

  useEffect(() => {
    const intervalManager = IntervalManager.getIntervalManager();

    cookies.objects.forEach((object) => {
      if (object.type === EffectType.PER_SECOND) {
        intervalManager.addInterval(() => {
          dispatch(increment(object.value));
        }, 1000);
      }
    });

    return () => {
      intervalManager.clearIntervals();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.objects]);

  return {
    cookies,
    increment: (amount: number) => {
      dispatch(increment(amount));
    },
    addObject: (object: Object) => {
      if (object.price > cookies.amount) {
        throw new Error("Not enough cookies");
      }

      dispatch(decrement(object.price));
      dispatch(addObject(object));

      localStorage.setItem(
        "objects",
        JSON.stringify([...cookies.objects, object])
      );

      if (object.type === EffectType.INSTANT_GAIN) {
        dispatch(increment(object.value));
      }
    },
    refreshCookies: () => {
      dispatch(setAmount(0));
      localStorage.removeItem("cookies");
      localStorage.removeItem("objects");
      intervalManager.clearIntervals();
    },
  };
};

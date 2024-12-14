import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  addObject,
  decrement,
  increment,
  Object,
  EffectType,
  reset,
} from "../store/cookie";
import { IntervalManager } from "../utils/IntervalManager";

export const useCookies = () => {
  const cookies = useSelector((state: RootState) => state.cookies);
  const dispatch = useDispatch();
  const intervalManager = IntervalManager.getIntervalManager();

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
      dispatch(reset());
      intervalManager.clearIntervals();
    },
  };
};

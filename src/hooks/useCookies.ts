import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  addObject,
  decrement,
  EffectType,
  increment,
  setAmount,
  Object,
} from "../store/cookie";
import { IntervalManager } from "../utils/IntervalManager";

export const useCookies = () => {
  const cookies = useSelector((state: RootState) => state.cookies);
  const dispatch = useDispatch();

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

      if (object.type === EffectType.INSTANT_GAIN) {
        dispatch(increment(object.value));
      } else if (object.type === EffectType.PER_SECOND) {
        const intervalManager = IntervalManager.getIntervalManager();

        intervalManager.addInterval(() => {
          dispatch(increment(object.value));
        }, 1000);
      }
    },
    refreshCookies: () => {
      dispatch(setAmount(0));
      const intervalManager = IntervalManager.getIntervalManager();
      intervalManager.clearIntervals();
    },
  };
};

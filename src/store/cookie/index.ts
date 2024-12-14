import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum EffectType {
  INSTANT_GAIN = "instant_gain",
  PER_SECOND = "per_second",
}

export interface Object {
  name: string;
  type: string;
  value: number;
  price: number;
}

export interface CookieInterface {
  amount: number;
  objects: Object[];
}

const fetchCookies = () => {
  const cookies = localStorage.getItem("cookies");
  return cookies ? Number(cookies) : 0;
};

const fetchObjects = (): Object[] => {
  const objects = localStorage.getItem("objects");
  const parsedObjects: Object[] = objects ? JSON.parse(objects) : [];

  return parsedObjects;
};

export const cookieSlice = createSlice({
  name: "cookie",
  initialState: {
    amount: fetchCookies(),
    objects: fetchObjects(),
  },
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.amount += action.payload ?? 1;
      localStorage.setItem("cookies", JSON.stringify(state.amount));
    },
    addObject: (state, action: PayloadAction<Object>) => {
      state.objects.push(action.payload);
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.amount -= action.payload ?? 1;
      localStorage.setItem("cookies", JSON.stringify(state.amount));
    },
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
      localStorage.setItem("cookies", JSON.stringify(state.amount));
    },
  },
});

export const { increment, addObject, decrement, setAmount } =
  cookieSlice.actions;
export default cookieSlice.reducer;

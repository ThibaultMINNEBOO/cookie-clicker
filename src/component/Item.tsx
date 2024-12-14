import { EffectType, Object } from "../store/cookie";

export function Item({
  name,
  price,
  type,
  value,
  onClick,
}: Object & { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white p-3 rounded-md shadow-md hover:scale-105 active:scale-110 transition-all"
    >
      <h3 className="text-xl font-bold">{name}</h3>
      <p>{price} cookies</p>
      <hr />
      <p className="mt-2">
        Effet :{" "}
        {type === EffectType.INSTANT_GAIN
          ? `Obtenez en une fois ${value} cookies !`
          : `Obtenez toutes les secondes ${value} cookies`}
      </p>
    </button>
  );
}

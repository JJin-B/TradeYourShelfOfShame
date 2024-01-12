import React from "react";

interface Props {
  type: "buy" | "sell";
}
const BuySellBadge: React.FC<Props> = ({ type }) => {
  const badgeColor =
    type.toLowerCase() === "sell" ? "bg-red-500" : "bg-blue-500";

  return (
    <div
      className={`inline-flex items-center w-12 h-5 text-center justify-center text-sm rounded-full ${badgeColor} text-white`}
    >
      {type.toUpperCase()}
    </div>
  );
};

export default BuySellBadge;

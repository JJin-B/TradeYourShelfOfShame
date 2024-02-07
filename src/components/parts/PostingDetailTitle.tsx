import React from "react";
import BuySellBadge from "./BuySellBadge";

interface Props {
  type: "buy" | "sell";
  title: string;
}
const PostingDetailTitle: React.FC<Props> = ({ type, title }) => {
  return (
    <title className="mx-auto max-w-6xl flex flex-col items-start justify-start text-3xl my-2 px-2">
      {<BuySellBadge type={type} />}
      {title}
    </title>
  );
};

export default PostingDetailTitle;

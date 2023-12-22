import React, { useState } from "react";

import Button from "../components/parts/Button";
import PostBggSearch from "../components/parts/PostBggSearch";
import PostType from "../components/parts/PostType";
import PostTitle from "../components/parts/PostTitle";
import PostDescription from "../components/parts/PostDescription";
import PostPrice from "../components/parts/PostPrice";
import PostLocation from "../components/parts/PostLocation";



interface Props {}

interface BggData {
  bggIdx: string;
  name: string;
}

interface PostParams {
  type: string;
  title: string;
  desc: string;
  price: number;
  location: string;
  bggData?: BggData;
}



const PostPage: React.FC<Props> = () => {

  const [postParams, setPostParams] = useState<PostParams>({
    type: "sell",
    title: "",
    desc: "",
    price: 0,
    location: "",
  });

  const handlePostParmas = (
    param: keyof PostParams,
    value: string | number
  ) => {
    if (param === "bggData") {
      return;
    }
    if (param === "price") {
      setPostParams({ ...postParams, price: Number(value) });
    } else {
      setPostParams({ ...postParams, [param]: String(value) });
      console.log(postParams);
    }
  };


  return (
    <form action="">
      <div className="items-center m-3 rounded-lg border border-gray-500 dark:border-gray-300 max-w-4xl justify-between mx-auto p-4">
        <div className="text-2xl text-gray-900 dark:text-white font-bold flex justify-center items-center h-full">
          Post Your Board Game!
        </div>
        <PostType
          type={postParams.type}
          onChange={(e) => handlePostParmas("type", e.target.value)}
        />

        <PostBggSearch />

        <PostTitle
          title={postParams.title}
          onChange={(e) => handlePostParmas("title", e.target.value)}
        />

        <PostDescription
          desc={postParams.desc}
          onChange={(e) => handlePostParmas("desc", e.target.value)}
        />

        <PostPrice
          price={postParams.price}
          onChange={(e) => handlePostParmas("price", e.target.value)}
        />

        <PostLocation
          location={postParams.location}
          onChange={(e) => handlePostParmas("location", e.target.value)}
        />

        <Button text="Post" />
      </div>
    </form>
  );
};

export default PostPage;

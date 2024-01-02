import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


import Button from "../components/parts/Button";
import PostBggSearch from "../components/parts/PostBggSearch";
import PostType from "../components/parts/PostType";
import PostTitle from "../components/parts/PostTitle";
import PostDescription from "../components/parts/PostDescription";
import PostPrice from "../components/parts/PostPrice";
import PostLocation from "../components/parts/PostLocation";

interface Props {
}

interface BggData {
  id: string;
  name: string;
  year?: string;
}

interface PostParams {
  type: "buy" | "sell";
  title: string;
  desc: string;
  price: number;
  location: string;
  imageSrc?: string[];
  bggData: BggData[];
  author: string;
}

const PostPage: React.FC<Props> = () => {
  const navigate = useNavigate();

  const [postParams, setPostParams] = useState<PostParams>({
    type: "sell",
    title: "",
    desc: "",
    price: 0,
    location: "",
    bggData: [],
    author: "65834424b3614bdc5e084875",
  });

  const handlePostParmas = (
    param: keyof PostParams,
    value: string | number
  ) => {
    if (param === "price") {
      setPostParams({ ...postParams, price: Number(value) });
    } else {
      setPostParams({ ...postParams, [param]: String(value) });
    }
    // console.log(postParams);
  };

  const addBggResultSelected = (chosenResult: BggData) => {
    const isResultSelected = postParams.bggData.some(
      (result) => result.id === chosenResult.id
    );
    if (!isResultSelected) {
      setPostParams((prev) => ({
        ...prev,
        bggData: [...prev.bggData, chosenResult],
      }));
    }
  };

  const removeBggResultSelected = (chosenResult: BggData) => {
    setPostParams((prev) => ({
      ...prev,
      bggData: prev.bggData.filter((result) => result.id !== chosenResult.id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send a POST request here using fetch or axios
      const response = await fetch("http://localhost:3001/newPosting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postParams),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Server response:", data);

      // Redirect to the posting detail page with the _id
      navigate(`/posting/${data._id}`);
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  };

  return (
    <form id="newPost" onSubmit={handleSubmit}>
      <div className="items-center m-3 rounded-lg border border-gray-500 dark:border-gray-300 max-w-4xl justify-between mx-auto p-4">
        <div className="text-2xl text-gray-900 dark:text-white font-bold flex justify-center items-center h-full">
          Post Your Board Game!
        </div>
        <PostType
          type={postParams.type}
          onChange={(e) => handlePostParmas("type", e.target.value)}
        />

        <PostBggSearch
          bggResultSelected={postParams.bggData}
          addBggResultSelected={addBggResultSelected}
          removeBggResultSelected={removeBggResultSelected}
        />

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

        <Button text="Post" type="submit" />
      </div>
    </form>
  );
};

export default PostPage;

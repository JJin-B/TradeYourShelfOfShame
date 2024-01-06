import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../components/parts/Button";
import PostBggSearch from "../components/parts/PostBggSearch";
import PostType from "../components/parts/PostType";
import PostTitle from "../components/parts/PostTitle";
import PostDescription from "../components/parts/PostDescription";
import PostPrice from "../components/parts/PostPrice";
import PostLocation from "../components/parts/PostLocation";

import { apiAddress } from "../Wrapper/AuthContext";

interface Props {}

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

  const [bggToggle, setBggToggle] = useState<boolean>(false);

  const { postId } = useParams<{ postId: string }>();

  const fetchUrl = apiAddress + `posting/${postId}`;

  useEffect(() => {
    fetch(fetchUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch the posting");
        }
        return response.json();
      })
      .then((data) => {
        if (data.bggData.length > 0) {
          setPostParams({
            ...postParams,
            type: data.type,
            bggData: data.bggData,
            title: data.title,
            desc: data.desc,
            price: data.price,
            location: data.location,
          });
          setBggToggle(true);
        } else {
          setPostParams({
            ...postParams,
            type: data.type,
            title: data.title,
            desc: data.desc,
            price: data.price,
            location: data.location,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching the posting:", error);
      });
  }, [fetchUrl]);

  const handlePostParmas = (
    param: keyof PostParams,
    value: string | number
  ) => {
    if (param === "price") {
      setPostParams({ ...postParams, price: Number(value) });
    } else {
      setPostParams({ ...postParams, [param]: String(value) });
    }
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

  const handleBggToggle = () => {
    setBggToggle(!bggToggle);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const modifiedParams = { ...postParams };
    if (!bggToggle) {
      modifiedParams.bggData = [];
    }

    try {
      console.log("before Fetch");
      const response = await fetch(`http://3.12.146.211:3001/posting/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modifiedParams),
      });
      console.log("put request fetched");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Server response:", data);

      // Redirect to the posting detail page with the _id
      navigate(`/posting/${postId}`);
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  };

  return (
    <form id="editPost" onSubmit={handleSubmit}>
      <div className="items-center m-3 rounded-lg border border-gray-500 dark:border-gray-300 max-w-4xl justify-between mx-auto p-4">
        <div className="text-2xl text-gray-900 dark:text-white font-bold flex justify-center items-center h-full">
          Post Your Board Game!
        </div>
        <PostType
          type={postParams.type}
          onChange={(e) => handlePostParmas("type", e.target.value)}
        />

        <PostTitle
          title={postParams.title}
          onChange={(e) => handlePostParmas("title", e.target.value)}
        />

        <PostBggSearch
          bggResultSelected={postParams.bggData}
          addBggResultSelected={addBggResultSelected}
          removeBggResultSelected={removeBggResultSelected}
          bggToggle={bggToggle}
          handleBggToggle={handleBggToggle}
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

        <Button text="Edit" type="submit" />
        <Button
          text="Cancel"
          className="mx-3"
          type="button"
          onClick={() => navigate(`/posting/${postId}`)}
        />
      </div>
    </form>
  );
};

export default PostPage;

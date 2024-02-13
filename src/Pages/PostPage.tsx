import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/parts/Button";
import PostBggSearch from "../components/parts/PostBggSearch";
import PostType from "../components/parts/PostType";
import PostTitle from "../components/parts/PostTitle";
import PostDescription from "../components/parts/PostDescription";
import PostPrice from "../components/parts/PostPrice";
import PostLocation from "../components/parts/PostLocation";

import { apiAddress } from "../Wrapper/AuthContext";
import { useAuth } from "../Wrapper/AuthContext";
import PostPageTitle from "../components/parts/PostPageTitle";

import { BggData } from "../components/classes/interfaces";
import PostImages from "../components/parts/PostImages";
import axios from "axios";

const acceptedFileTypes = ["image/png", "image/webp", "image/jpeg"];

interface PostParams {
  type: "buy" | "sell";
  title: string;
  desc: string;
  price: number;
  location: string;
  images?: string[];
  bggData: BggData[];
  author: string;
}

const PostPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/signin");
    return null;
  }
  const userId = user._id;

  const [bggToggle, setBggToggle] = useState<boolean>(false);

  const [imagesToUpload, setImagesToUpload] = useState<File[]>([]);
  const [mainImgIdx, setMainImgIdx] = useState<number>(0);

  const [postParams, setPostParams] = useState<PostParams>({
    type: "sell",
    title: "",
    desc: "",
    price: 0,
    location: "",
    bggData: [],
    author: userId,
  });

  const handleBggToggle = () => {
    setBggToggle(!bggToggle);
  };

  const handlePostParmas = (
    param: keyof PostParams,
    value: string | number
  ) => {
    if (param === "price") {
      setPostParams({ ...postParams, price: Number(value) });
    } else if (param === "images") {
      return;
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      const validFiles = files
        .filter((file) => acceptedFileTypes.includes(file.type))
        .slice(0, 5 - imagesToUpload.length);
      setImagesToUpload((prev) => [...prev, ...validFiles]);
    }
  };

  const removeImageByIndex = (idx: number) => {
    setImagesToUpload((prev) => {
      const newArray = [...prev.slice(0, idx), ...prev.slice(idx + 1)];
      return newArray;
    });
  };

  const handleMainImgIdx = (idx: number) => {
    setMainImgIdx(idx);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const modifiedParams = { ...postParams };
    if (!bggToggle) {
      modifiedParams.bggData = [];
    }

    const formData = new FormData();
    formData.append("type", modifiedParams.type);
    formData.append("title", modifiedParams.title);
    modifiedParams.bggData.forEach((bggItem, index) => {
      formData.append(`bggData[${index}]`, JSON.stringify(bggItem));
    });
    formData.append("desc", modifiedParams.desc);
    formData.append("price", modifiedParams.price.toString());
    formData.append("location", modifiedParams.location);
    formData.append("author", modifiedParams.author);
    imagesToUpload.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    console.log(formData);

    try {
      // const response = await fetch(apiAddress + "/posting/new", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },

      //   body: JSON.stringify(modifiedParams),
      // });

      const response = await axios.post(apiAddress + "/posting/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await response.data;
      if (!data) {
        throw new Error("Network response was not ok");
      }
      // Redirect to the posting detail page with the _id
      navigate(`/posting/${data._id}`);
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  };

  return (
    <form
      className="items-center m-3 rounded-lg border border-gray-500 dark:border-gray-300 max-w-4xl justify-between mx-auto p-4"
      id="newPost"
      onSubmit={handleSubmit}
    >
      <PostPageTitle />

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

      <PostImages
        selectedFiles={imagesToUpload}
        mainImgIdx={mainImgIdx}
        handleFileChange={handleFileChange}
        removeImageByIndex={removeImageByIndex}
        handleMainImgIdx={handleMainImgIdx}
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
    </form>
  );
};

export default PostPage;

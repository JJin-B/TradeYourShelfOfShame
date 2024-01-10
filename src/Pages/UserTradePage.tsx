import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

import { useAuth, apiAddress } from "../Wrapper/AuthContext";

import Posting from "../components/classes/Posting";

interface User {
  _id: string;
  name: string;
  email: string;
  interests: {
    interestType: { type: String; required: true };
    id: { type: String; required: true };
    name: { type: String; required: true };
    year: String;
  }[];
}

interface BggData {
  id: string;
  name: string;
  year?: string;
}

interface PostingBggData extends BggData {
  type: "sell" | "buy";
  postingId: string;
}

interface Props {}

const UserTradePage: React.FC<Props> = () => {
  const { user } = useAuth();
  const { userId } = useParams<{ userId: string }>();

  const [postings, setPostings] = useState<Posting[]>([]);
  const [userInterest, setUserInterest] = useState<User>();
  const [error, setError] = useState<string | null>(null);
  const [postingBuyTradeList, setPostingBuyTradeList] = useState<
    PostingBggData[]
  >([]);
  const [postingSellTradeList, setPostingSellTradeList] = useState<
    PostingBggData[]
  >([]);

  const isFirstRunRef = useRef(true); // this will check the first run to prevent requesting a query twice

  useEffect(() => {
    if (isFirstRunRef.current) {
      isFirstRunRef.current = false;
      return;
    }

    let fetchUrl = apiAddress + `/user/${userId}`;

    axios
      .get<User>(fetchUrl)
      .then((response: AxiosResponse<User>) => {
        if (response.data) setUserInterest(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.error("User not found");
          setError("User not found.");
          // Handle the case when the user is not found
        } else {
          console.error("Error fetching the result postings:", error);
          // Handle other types of errors
          setError("Internal Server Error. Please try again later.");
        }
      });

    fetchUrl = apiAddress + `/search?author_id=${userId}&viewAll=true`;

    axios
      .get<Posting[]>(fetchUrl)
      .then((response: AxiosResponse<Posting[]>) => {
        setPostings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the result postings:", error);
      });
  }, []);

  useEffect(() => {
    if (postings.length === 0) {
      setPostingBuyTradeList([]);
      setPostingSellTradeList([]);
      return;
    }
    const uniqueTypeBggDataCombinations: PostingBggData[] = [];

    for (const posting of postings) {
      for (const bggData of posting.bggData) {
        const existingCombination = uniqueTypeBggDataCombinations.find(
          (combo) => combo.type === posting.type && combo.id === bggData.id
        );

        if (!existingCombination) {
          uniqueTypeBggDataCombinations.push({
            postingId: posting._id,
            type: posting.type,
            id: bggData.id,
            name: bggData.name,
            year: bggData.year,
          });
        }
      }
    }

    // Update the state with unique BggData
    setPostingBuyTradeList(
      uniqueTypeBggDataCombinations.filter((comb) => comb.type === "buy")
    );
    setPostingSellTradeList(
      uniqueTypeBggDataCombinations.filter((comb) => comb.type === "sell")
    );
  }, [postings]);

  if (error || !userInterest) {
    return <div>{error}</div>;
  }

  const isMyList: boolean = user != null && user._id === userId;

  return (
    <div className="my-2 text-2xl text-gray-900 w-full dark:text-white font-bold flex flex-col items-center">
      {isMyList ? "My" : `${userInterest?.name}'s`} Trade List
      <div className="flex flex-wrap justify-center my-2">
        <div className="flex flex-col items-center w-full">
          <span className="flex justify-center mx-1 text-lg font-bold rounded-md p-2 w-full bg-blue-300 text-gray-900">
            I Am Looking For ...
          </span>
          <div className="flex flex-wrap justify-center">
            <div className="text-md flex flex-col items-center border border-2 border-blue-500 rounded-lg w-96 h-80 m-2 p-1 bg-gray-100 dark:bg-gray-500 overflow-auto">
              {postingBuyTradeList.length > 0 ? (
                postingBuyTradeList.map((posting) => posting.name)
              ) : (
                <span>No Trade List from Postings</span>
              )}
            </div>
            <div className="text-md flex flex-col items-center border border-2 border-blue-500 rounded-lg w-96 h-80 m-2 p-1 bg-gray-100 dark:bg-gray-500 overflow-auto">
              {userInterest.interests && userInterest.interests.length > 0 ? (
                "ABC"
              ) : (
                <span>No Interest List</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center my-2">
        <div className="flex flex-col items-center w-full">
          <span className="flex justify-center mx-1 text-lg font-bold rounded-md p-2 w-full bg-blue-300 text-gray-900">
            I Am Looking For ...
          </span>
          <div className="flex flex-wrap justify-center">
            <div className="text-md flex flex-col items-center border border-2 border-blue-500 rounded-lg w-96 h-80 m-2 p-1 bg-gray-100 dark:bg-gray-500 overflow-auto">
              {postingSellTradeList.length > 0 ? (
                postingSellTradeList.map((posting) => posting.name)
              ) : (
                <span>No Trade List from Postings</span>
              )}
            </div>
            <div className="text-md flex flex-col items-center border border-2 border-blue-500 rounded-lg w-96 h-80 m-2 p-1 bg-gray-100 dark:bg-gray-500 overflow-auto">
              {userInterest.interests && userInterest.interests.length > 0 ? (
                "ABC"
              ) : (
                <span>No Interest List</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTradePage;

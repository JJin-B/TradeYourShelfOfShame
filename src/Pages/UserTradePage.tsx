import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

import { useAuth, apiAddress } from "../Wrapper/AuthContext";

import Posting from "../components/classes/Posting";
import UserTradePostingList from "../components/parts/UserTradePostingList";
import UserTradeInterestList from "../components/parts/UserTradeInterestList";
import UserMyInterestList from "../components/parts/UserMyInterestList";
import UserTradeSendMessage from "../components/parts/UserTradeSendMessage";

interface UserInterest {
  interestType: "sell" | "buy";
  id: string;
  name: string;
  year?: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  interests: UserInterest[];
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
  const [userPOI, setUserPOI] = useState<User>();
  const [error, setError] = useState<string | null>(null);
  const [postingBuyTradeList, setPostingBuyTradeList] = useState<
    PostingBggData[]
  >([]);
  const [postingSellTradeList, setPostingSellTradeList] = useState<
    PostingBggData[]
  >([]);

  useEffect(() => {
    let fetchUrl = apiAddress + `/user/${userId}`;
    console.log("Trade page fetching starts");
    axios
      .get<User>(fetchUrl)
      .then((response: AxiosResponse<User>) => {
        console.log(response.data);
        if (response.data) {
          setUserPOI(response.data);
        }
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
  }, [userId]);

  useEffect(() => {
    if (postings.length === 0) {
      setPostingBuyTradeList([]);
      setPostingSellTradeList([]);
      return;
    }
    const uniqueTypeBggDataCombinations: PostingBggData[] = [];

    for (const posting of postings) {
      if (!posting.bggData) {
        return;
      }
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
  }, [JSON.stringify(postings)]);

  if (error || !userPOI) {
    return <div>{error}</div>;
  }

  const isMyList: boolean = user != null && user._id === userId;

  return (
    <div className="my-2 text-2xl text-gray-900 w-full dark:text-white font-bold flex flex-col items-center">
      <span>{isMyList ? "My" : `${userPOI?.name}'s`} Trade List</span>
      <div className="flex flex-wrap justify-center w-full max-w-6xl my-2">
        <div className="flex flex-col items-center w-full">
          <span className="flex justify-center mx-1 text-lg font-bold rounded-md p-2 w-full bg-blue-300 text-gray-900">
            I Am Looking For ...
          </span>
          <div className="flex flex-wrap justify-center w-full">
            <div className="text-md flex flex-col items-center border border-2 border-blue-500 rounded-lg w-2/5  max-w-[600px] min-w-[280px] h-64 m-2 p-1 bg-gray-100 dark:bg-gray-500">
              <span className="border-b-2 mb-2">List from Postings</span>
              <UserTradePostingList postings={postingBuyTradeList} />
            </div>
            <div className="text-md flex flex-col items-center border border-2 border-blue-500 rounded-lg w-2/5  max-w-[600px] min-w-[280px] h-64 m-2 p-1 bg-gray-100 dark:bg-gray-500">
              <span className="border-b-2 mb-2">Interest List</span>
              <UserTradeInterestList
                interests={userPOI.interests?.filter(
                  (interest) => interest.interestType === "buy"
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center w-full">
          <span className="flex justify-center mx-1 text-lg font-bold rounded-md p-2 w-full bg-red-300 text-gray-900">
            I Am Offering ...
          </span>
          <div className="flex flex-wrap justify-center w-full">
            <div className="text-md flex flex-col items-center border border-2 border-red-500 rounded-lg w-2/5  max-w-[600px] min-w-[280px] h-64 m-2 p-1 bg-gray-100 dark:bg-gray-500">
              <span className="border-b-2 mb-2">List from Postings</span>
              <UserTradePostingList postings={postingSellTradeList} />
            </div>
            <div className="text-md flex flex-col items-center border border-2 border-red-500 rounded-lg w-2/5  max-w-[600px] min-w-[280px] h-64 m-2 p-1 bg-gray-100 dark:bg-gray-500">
              <span className="border-b-2 mb-2">Interest List</span>
              <UserTradeInterestList
                interests={userPOI.interests?.filter(
                  (interest) => interest.interestType === "sell"
                )}
              />
            </div>
          </div>
        </div>

        {user?._id === userPOI._id ? (
          <UserMyInterestList defaultUserInterestList={userPOI.interests} />
        ) : (
          <UserTradeSendMessage
            userPOI={{ _id: userPOI._id, name: userPOI.name }}
          />
        )}
      </div>
    </div>
  );
};

export default UserTradePage;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

import { useAuth, apiAddress } from "../Wrapper/AuthContext";

import Posting from "../components/classes/Posting";
import UserMyInterestList from "../components/parts/UserMyInterestList";
import UserTradeSendMessage from "../components/parts/UserTradeSendMessage";

import { PostingBggData, UserInfo } from "../components/classes/interfaces";
import UserTradeList from "../components/parts/UserTradeList";

const UserTradePage: React.FC = () => {
  const { user } = useAuth();
  const { userId } = useParams<{ userId: string }>();

  const [postings, setPostings] = useState<Posting[]>([]);
  const [userPOI, setUserPOI] = useState<UserInfo>();
  const [error, setError] = useState<string | null>(null);
  const [postingBuyTradeList, setPostingBuyTradeList] = useState<
    PostingBggData[]
  >([]);
  const [postingSellTradeList, setPostingSellTradeList] = useState<
    PostingBggData[]
  >([]);

  useEffect(() => {
    let fetchUrl = apiAddress + `/user/${userId}`;
    axios
      .get<UserInfo>(fetchUrl)
      .then((response: AxiosResponse<UserInfo>) => {
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

    fetchUrl = apiAddress + `/posting/search?author_id=${userId}&viewAll=true`;

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
        <UserTradeList
          type="buy"
          postings={postingBuyTradeList}
          user={userPOI}
        />

        <UserTradeList
          type="sell"
          postings={postingSellTradeList}
          user={userPOI}
        />

        {user?._id === userPOI._id ? (
          <UserMyInterestList defaultUserInterestList={userPOI.interests} />
        ) : (
          <UserTradeSendMessage userPOI={userPOI} />
        )}
      </div>
    </div>
  );
};

export default UserTradePage;

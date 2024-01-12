import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import UserTradeBggSearch from "./UserTradeBggSearch";
import UserTradeInterestList from "./UserTradeInterestList";
import Button from "./Button";

import { apiAddress } from "../../Wrapper/AuthContext";
import { useAuth } from "../../Wrapper/AuthContext";

interface UserInterest {
  interestType: "sell" | "buy";
  id: string;
  name: string;
  year?: string;
}

interface Props {
  defaultUserInterestList: UserInterest[];
}

const UserMyInterestList: React.FC<Props> = ({ defaultUserInterestList }) => {
  const navigate = useNavigate();
  const [userInterestList, setUserInterestList] = useState<UserInterest[]>(
    defaultUserInterestList
  );
  const { user } = useAuth();

  const addUserInterestList = (interest: UserInterest) => {
    const isResultSelected = userInterestList?.some(
      (result) => result.id === interest.id
    );

    if (isResultSelected) {
      toast.warn("The item already exists in the interest list");
    } else {
      setUserInterestList((prevList) =>
        prevList ? [...prevList, interest] : [interest]
      );
    }
  };

  const removeUserInterestList = (interest: UserInterest) => {
    setUserInterestList((prev) =>
      prev?.filter((result) => result.id !== interest.id)
    );
  };

  const saveUserInterest = () => {
    if (!user) {
      toast.error("Error occured! Please sign in again");
      navigate("/signin");
      return;
    }
    const fetchUrl = apiAddress + `/user/${user._id}/interest`;
    try {
      axios
        .patch(fetchUrl, userInterestList)
        .then(() => navigate(0))
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  };

  const resetUserInterestList = () => {
    setUserInterestList(defaultUserInterestList);
  };

  return (
    <div className="flex flex-col items-center w-full border my-2 rounded-md">
      <span className="flex justify-center mx-1 text-lg font-bold rounded-md p-2 w-full bg-gray-300 text-gray-900">
        My Interest List
      </span>
      <div className="flex flex-wrap justify-center w-full">
        <div className="text-md flex flex-col items-center rounded-lg w-2/5 max-w-[600px] min-w-[280px] h-64 m-2">
          <UserTradeBggSearch onClickAdd={addUserInterestList} />
        </div>
        <div className="text-md flex flex-col items-center border border-2 border-gray-500 rounded-lg w-2/5 max-w-[600px] min-w-[280px] h-64 m-2 p-1 bg-gray-100 dark:bg-gray-500 overflow-auto">
          <UserTradeInterestList
            interests={userInterestList}
            onClickRemoveButton={removeUserInterestList}
          />
        </div>
      </div>
      <div className="flex">
        <Button text="Save" className="mb-2 mx-2" onClick={saveUserInterest} />
        <Button
          text="Reset"
          className="mb-2 mx-2"
          onClick={resetUserInterestList}
        />
      </div>
    </div>
  );
};

export default UserMyInterestList;

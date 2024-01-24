import React from "react";
import axios from "axios";
import { useState } from "react";

interface Props {}
const TestingPage: React.FC<Props> = () => {
  const [result, setResult] = useState<string>("");
  //   const fetchUrl = "http://localhost:3001/test";
  const fetchUrl =
    "https://9afnnp3x28.execute-api.us-east-2.amazonaws.com/TTYS/test";

  const onClick1 = async () => {
    setResult("");
    // console.log(fetchUrl);
    axios
      .get(fetchUrl)
      .then((res) => {
        setResult(res.data);
      })
      .catch((e) => setResult(e));
  };
  const onClick2 = async () => {
    const data = { var1: "a", var2: "b" };
    setResult("");
    axios
      .post(fetchUrl, data)
      .then((res) => {
        setResult(res.data);
      })
      .catch((e) => setResult(e));
  };
  const onClick3 = async () => {
    setResult("");
  };
  const onClick4 = async () => {
    setResult("");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        className="bg-blue-500 p-2 m-2 rounded-lg border-2"
        onClick={onClick1}
      >
        Btn 1
      </button>
      <button
        className="bg-blue-500 p-2 m-2 rounded-lg border-2"
        onClick={onClick2}
      >
        Btn 2
      </button>
      <button
        className="bg-blue-500 p-2 m-2 rounded-lg border-2"
        onClick={onClick3}
      >
        Btn 3
      </button>
      <button
        className="bg-blue-500 p-2 m-2 rounded-lg border-2"
        onClick={onClick4}
      >
        Reset results
      </button>

      <textarea
        cols={30}
        rows={5}
        value={result}
        onChange={() => {}}
      ></textarea>
    </div>
  );
};

export default TestingPage;

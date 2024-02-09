import { useEffect, useState } from "react";
import Posting from "../components/classes/Posting";
import FrontImg from "../components/parts/FrontImage";
import FrontPagePostingPreview from "../components/parts/FrontPagePostingPreview";

import { apiAddress } from "../Wrapper/AuthContext";

const FrontPage: React.FC = () => {
  const [postings, setPostings] = useState<Posting[]>([]);
  useEffect(() => {
    // Fetch data from your API
    fetch(apiAddress + "/posting/latest-postings")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch latest postings");
        }
        return response.json();
      })
      .then((data) => {
        setPostings(data);
      })
      .catch((error) => {
        console.error("Error fetching latest postings:", error);
      });
  }, []);

  return (
    <>
      <FrontImg imgSrc={"/images/frontImage.webp"} />
      <div className="p-5 text-3xl flex flex-wrap mx-auto max-w-6xl">
        <h1>Recent Postings..</h1>
      </div>
      <div className="flex flex-wrap justify-center mx-auto max-w-6xl">
        {postings.slice(0, 8).map((posting: Posting) => (
          <FrontPagePostingPreview key={posting._id} posting={posting} />
        ))}
      </div>
    </>
  );
};

export default FrontPage;

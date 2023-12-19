import React from "react";
import User from "../components/classes/User";
import Posting from "../components/classes/Posting";
import PictureCarousel from "../components/parts/PictureCarousel";
import Button from "../components/parts/Button";
import { postings } from "../dummyData/dummydata";
import { useParams } from "react-router-dom";

interface Props {
  user: User;
}

const PostingDetailPage: React.FC<Props> = ({ user }) => {
  const { postId } = useParams<{ postId: string }>();

  const posting: Posting | undefined = postings.find((p) => p._id === postId);

  if (!posting) {
    // Handle the case where the posting is not found
    return <div>Posting not found!</div>;
  }

  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-center">
          <div className="m-3 flex-2/3 text-3xl max-w-2xl break-words">
            {posting.title}
            <PictureCarousel picUrls={posting.imageSrc} />
          </div>
          <div className="w-96 text-xl max-w-sm break-words border border-solid border-grey-700 p-4 ml-10 mt-10">
            <div>Price: ${posting.price}</div>
            <div>Location : </div>
            <div>Posted On : </div>
            <div>Created By : {user.name}</div>
            <div className="my-3">
              <Button text={`Check ${user.name}'s Trade List`} />
            </div>
            <div className="mt-5">
              <form className="p-3 border border-gray-300">
                <label
                  htmlFor="message"
                  className="p-1 px-3 font-black block mb-2 text-sm font-medium text-gray-900 dark:text-white dark:bg-gray-700 rounded-md"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={`Hello ${user.name}. I am interested in this item. Please let me know if this is available!`}
                ></textarea>
                <Button text="Send" />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto h-64 p-3 min-h-fit max-w-6xl m-10 dark:border dark:border-grey-700">
        <h1 className="text-2xl">Description</h1>
        <p className="mt-5">{posting.desc}</p>
      </div>
    </>
  );
};

export default PostingDetailPage;

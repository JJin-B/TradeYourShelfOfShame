import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiAddress } from "../../Wrapper/AuthContext";

interface DeleteBtnProps {
  posting_id: string;
}
const DeleteButton: React.FC<DeleteBtnProps> = ({ posting_id }) => {
  const navigate = useNavigate();
  const [deletePopup, setDeletePopup] = useState<boolean>(false);

  const openPopup = () => {
    setDeletePopup(true);
  };

  const closePopup = () => {
    setDeletePopup(false);
  };

  const submitDelete = () => {
    const fetchUrl = apiAddress + `/posting/${posting_id}`;
    axios
      .delete(fetchUrl)
      .then(() => {})
      .catch((error) => {
        console.error("Error fetching the result postings:", error);
      });
    setDeletePopup(false);
    navigate("/");
  };

  return (
    <>
      <button
        className="m-1 block w-24 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        onClick={openPopup}
        type="button"
      >
        Delete
      </button>

      <div
        className={`${
          !deletePopup && "hidden"
        } fixed z-50 inset-0 overflow-y-auto overflow-x-hidden flex items-center justify-center`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative border border-gray-500 bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={closePopup}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this posting?
              </h3>
              <button
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                onClick={submitDelete}
              >
                Yes, I'm sure
              </button>
              <button
                type="button"
                className="border border-gray-400 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={closePopup}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteButton;

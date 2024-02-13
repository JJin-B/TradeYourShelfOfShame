import { useState, ChangeEvent } from "react";
import PostImagePreview from "./PostImagePreview";

const acceptedFileTypes = ["image/png", "image/webp", "image/jpeg"];

interface Props {}
const PostImages: React.FC<Props> = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [mainImgIdx, setMainImgIdx] = useState<number>(0);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      const validFiles = files
        .filter((file) => acceptedFileTypes.includes(file.type))
        .slice(0, 5 - selectedFiles.length);
      setSelectedFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const removeImageByIndex = (idx: number) => {
    setSelectedFiles((prev) => {
      const newArray = [...prev.slice(0, idx), ...prev.slice(idx + 1)];
      return newArray;
    });
  };

  const handleMainImgIdx = (idx: number) => {
    setMainImgIdx(idx);
  };

  return (
    <div className="flex flex-col flex-wrap mb-2">
      <label
        htmlFor="images"
        className="mr-2 font-medium text-gray-900 dark:text-white"
      >
        Images (up to 5 images)
      </label>
      <div className="flex flex-wrap">
        {selectedFiles.map((file, index) => (
          <PostImagePreview
            key={index}
            file={file}
            isMain={index === mainImgIdx}
            onClickXbtn={() => removeImageByIndex(index)}
            onClickSetMain={() => handleMainImgIdx(index)}
          />
        ))}

        {selectedFiles.length < 5 && (
          <label
            htmlFor="images"
            className="flex flex-col items-center justify-center w-36 h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <span className="text-6xl dark:text-gray-300">&#43;</span>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG
              </p>
            </div>
            <input
              id="images"
              type="file"
              className="hidden"
              multiple
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default PostImages;

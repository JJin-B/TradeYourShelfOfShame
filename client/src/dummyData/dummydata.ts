import User from "../components/classes/User";
import Posting from "../components/classes/Posting";
import { bgNames, bgDescs } from "./boardgames";

const imageArray: string[] = [
  "/images/bgImg1.jpg",
  "/images/frontImage.jpg",
  "/images/logo-TYSS.png",
  "/images/logo-TYSS-dark.png",
];

const user: User = new User("UserName", "John Doe", "john.doe@gmail.com");

const postings: Posting[] = [];

for (let i = 0; i < 100; i++) {
  const randomIndex: number = Math.floor(Math.random() * bgNames.length);
  const imgSrcs: string[] = [];
  const imgCount: number = Math.floor(Math.random() * 5);

  for (let j = 0; j < imgCount; j++) {
    const randomImageIndex: number = Math.floor(
      Math.random() * imageArray.length
    );
    imgSrcs.push(imageArray[randomImageIndex]);
  }

  const postingType: "buy" | "sell" = Math.random() > 0.5 ? "buy" : "sell";

  const posting: Posting = new Posting(
    `${i}`,
    postingType,
    bgNames[randomIndex],
    bgDescs[randomIndex],
    Math.floor(Math.random() * 100) + 1,
    imgSrcs,
    "1"
  );

  postings.push(posting);
}

export { postings, user };

import Posting from "../classes/Posting";

interface RelatedBggGamesProps {
  posting: Posting;
}

const PostingDetailsRelatedBggGames: React.FC<RelatedBggGamesProps> = ({ posting }) => {
  return (
    <div className="mx-auto h-18 p-3 min-h-fit max-w-6xl m-10 dark:border dark:border-grey-700 overflow-auto rounded-md">
      <h1 className="text-2xl">Related BGG Games</h1>
      {posting.bggData.map((bgg) => (
        <li key={bgg.id} className="hover:underline hover:text-blue-500">
          <a
            href={`https://boardgamegeek.com/boardgame/${bgg.id}}`}
            target="_blank"
          >
            {bgg.name}
          </a>
        </li>
      ))}
    </div>
  );
};

export default PostingDetailsRelatedBggGames;

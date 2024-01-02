import React, { useEffect, useState, useRef } from "react";
import axios, { AxiosResponse } from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";

import Posting from "../components/classes/Posting";
import SearchPagePostingPreview from "../components/SearchPagePostingPreview";

interface Props {}

const SearchResultPage: React.FC<Props> = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const typeParam = queryParams.get("type")?.toLowerCase();
  const searchQuery = queryParams.get("q")?.toLowerCase();

  const [postings, setPostings] = useState<Posting[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  // const [isFirstRun, setIsFirstRun] = useState<boolean>(true);
  const isFirstRunRef = useRef(true);

  useEffect(() => {
    if (isFirstRunRef.current) {
      isFirstRunRef.current = false;
      return;
    }

    let fetchUrl = "http://localhost:3001/search?";

    if (typeParam) {
      fetchUrl += `type=${typeParam}`;
    }

    if (searchQuery) {
      fetchUrl += `${typeParam ? "&" : ""}q=${searchQuery}`;
    }

    if (typeParam || searchQuery) {
      fetchUrl += `&page=${page}`;
    } else {
      fetchUrl += `page=${page}`;
    }

    axios
      .get<Posting[]>(fetchUrl)
      .then((response: AxiosResponse<Posting[]>) => {
        if (!response.data || response.data.length === 0) {
          setHasMore(false);
          return;
        }

        setPostings((prevPostings) => [...prevPostings, ...response.data]);
      })
      .catch((error) => {
        console.error("Error fetching the result postings:", error);
      });
  }, [page]);

  return (
    <div className="justify-center mx-auto max-w-6xl">
      {postings.length > 0 ? (
        <InfiniteScroll
          dataLength={postings.length}
          next={() => setPage(page + 1)}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {postings.map((posting) => (
            <SearchPagePostingPreview key={posting._id} posting={posting} />
          ))}
        </InfiniteScroll>
      ) : (
        <div>
          {hasMore ? (
            <h4>Loading...</h4>
          ) : (
            <div className="text-center">NO POSTINGS FOUND</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResultPage;

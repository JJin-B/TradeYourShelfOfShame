import React, { useEffect, useState } from "react";

import axios, { AxiosResponse } from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";

import Posting from "../components/classes/Posting";
import SearchPagePostingPreview from "../components/parts/SearchPagePostingPreview";
import { apiAddress } from "../Wrapper/AuthContext";

interface Props {}

const SearchResultPage: React.FC<Props> = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const typeParam = queryParams.get("type")?.toLowerCase() || "";
  const searchQuery = queryParams.get("q")?.toLowerCase() || "";
  const authorParam = queryParams.get("author")?.toLowerCase() || "";

  // const isFirstRunRef = useRef(true); // this will check the first run to prevent requesting a query twice

  const [postings, setPostings] = useState<Posting[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    // if (isFirstRunRef.current) {
    //   isFirstRunRef.current = false;
    //   return;
    // }

    let fetchUrl = apiAddress + "/posting/search?";

    if (typeParam) {
      fetchUrl += `type=${typeParam}`;
    }

    if (searchQuery) {
      fetchUrl += `${typeParam ? "&" : ""}q=${searchQuery}`;
    }

    if (authorParam) {
      fetchUrl += `${
        typeParam || searchQuery ? "&" : ""
      }author_id=${authorParam}`;
    }

    if (typeParam || searchQuery || authorParam) {
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
  }, [page, typeParam, searchQuery, authorParam]);

  useEffect(() => {
    setPage(1); // Reset page to 1 when the URL parameters change
    setPostings([]); // Clear existing postings
    setHasMore(true); // Reset hasMore to true
  }, [location]);

  return (
    <div className="justify-center mx-auto max-w-6xl">
      {postings.length > 0 ? (
        <InfiniteScroll
          dataLength={postings.length}
          next={() => setPage(page + 1)}
          hasMore={hasMore}
          loader={<h1>Loading...</h1>}
        >
          {postings.map((posting) => (
            <SearchPagePostingPreview key={posting._id} posting={posting} />
          ))}
        </InfiniteScroll>
      ) : (
        <div>
          {hasMore ? (
            <h1>Loading...</h1>
          ) : (
            <div className="text-center">NO POSTINGS FOUND</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResultPage;

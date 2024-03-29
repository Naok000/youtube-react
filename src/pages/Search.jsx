import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import { fetchSearchData } from "../apis";
import { Store } from "../store/index";
import { SET_SEARCHED } from "../actions";
import VideoGrid from "../components/VideoGrid/VideoGrid";
import VideoGridItem from "../components/VideoGridItem/VideoGridItem";

const Search = () => {
  const { globalState, setGlobalState } = useContext(Store);
  const location = useLocation();
  const setSearchResult = async () => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");
    console.log(query);
    if (query) {
      await fetchSearchData(query).then((res) => {
        setGlobalState({
          type: SET_SEARCHED,
          payload: { searched: res.data.items },
        });
      });
    }
  };

  useEffect(() => {
    setSearchResult();
  }, [location.search]);

  return (
    <div>
      <Layout>
        <VideoGrid>
          {globalState.searched ? (
            globalState.searched.map((search) => {
              return (
                <VideoGridItem
                  id={search.id.videoId}
                  key={search.id.videoId}
                  src={search.snippet.thumbnails.default.url}
                  title={search.snippet.title}
                />
              );
            })
          ) : (
            <span>no result</span>
          )}
        </VideoGrid>
      </Layout>
    </div>
  );
};

export default Search;

import React, { useEffect, useContext } from "react";
import Layout from "../components/Layout/Layout";
import { fetchPopularData } from "../apis";
import { Store } from "../store";
import { SET_POPULAR } from "../actions";
import VideoGrid from "../components/VideoGrid/VideoGrid";
import VideoGridItem from "../components/VideoGridItem/VideoGridItem";

const Top = () => {
  // globalStateとdispatch関数の参照
  const { globalState, setGlobalState } = useContext(Store);
  useEffect(() => {
    fetchPopularData().then((res) => {
      setGlobalState({
        type: SET_POPULAR,
        payload: { popular: res.data.items },
      });
    });
  }, []);
  return (
    <Layout>
      <VideoGrid>
        {globalState.popular &&
          globalState.popular.map((popular) => {
            return (
              <VideoGridItem
                id={popular.id}
                key={popular.id}
                src={popular.snippet.thumbnails.default.url}
                title={popular.snippet.title}
              />
            );
          })}
      </VideoGrid>
    </Layout>
  );
};

export default Top;

import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import SideList from "../components/SideList/SideList";
import VideoDetail from "../components/VideoDetail/VideoDetail";
import { Store } from "../store/index";
import { fetchSelectedData, fetchRelatedData } from "../apis/index";
import { SET_RELATED, SET_SELECTED } from "../actions";

function Watch() {
  const { setGlobalState } = useContext(Store);
  const location = useLocation();
  const setVideos = async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("v");
    if (id) {
      const [selected, related] = await Promise.all([
        fetchSelectedData(id),
        fetchRelatedData(id),
      ]);
      setGlobalState({
        type: SET_SELECTED,
        payload: { selected: selected.data.items.shift() },
      });
      setGlobalState({
        type: SET_RELATED,
        payload: { related: related.data.items },
      });
    }
  };

  useEffect(() => {
    setVideos();
  }, [location.search]);
  return (
    <div>
      <Layout>
        <VideoDetail />
        <SideList />
      </Layout>
    </div>
  );
}

export default Watch;

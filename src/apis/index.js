import axios from "axios";

import { config } from "../apikey";

const KEY = config.apikey;

const youtube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

const commonParams = {
  part: "snippet",
  maxResults: 40,
  key: KEY,
  regionCode: "JP",
  type: "video",
};

// youtubeAPIからデータの取得
export const fetchPopularData = async () => {
  return await youtube.get("/videos", {
    params: {
      ...commonParams,
      chart: "mostPopular",
    },
  });
};

export const fetchSelectedData = async (id) => {
  return await youtube.get("videos", {
    params: {
      ...commonParams,
      id,
    },
  });
};

export const fetchRelatedData = async (id) => {
  return await youtube.get("/search", {
    params: {
      ...commonParams,
      relatedToVideoId: id,
    },
  });
};

export const fetchSearchData = async (query) => {
  return await youtube.get("/search", {
    params: {
      ...commonParams,
      q: query,
    },
  });
};

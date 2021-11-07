import axios from "axios";

const KEY = "AIzaSyAv6myl0caucqpVGlMZwuZIFzCp3HQHssM";

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

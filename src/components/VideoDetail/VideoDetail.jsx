import React, { useContext } from "react";
import ReactLinkify from "react-linkify";

import { Store } from "../../store/index";
import VideoPlay from "../VideoPlay/VideoPlay";
import Style from "./VideoDetail.module.scss";

const VideoDetail = () => {
  const { globalState } = useContext(Store);

  return globalState.selected && globalState.selected.id ? (
    <>
      <div className={Style.wrap}>
        <VideoPlay id={globalState.selected.id} />
        <p>{globalState.selected.snippet.title}</p>
        <hr />
        <ReactLinkify>
          <pre>{globalState.selected.snippet.description}</pre>
        </ReactLinkify>
      </div>
    </>
  ) : (
    <span>no data</span>
  );
};

export default VideoDetail;

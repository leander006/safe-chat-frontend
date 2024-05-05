import React, { useEffect } from "react";
import { useRef } from "react";

function Video({ stream }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div>
      <video
        ref={videoRef}
        style={{ width: "300px", height: "300px" }}
        muted={true}
        autoPlay
      />
    </div>
  );
}

export default Video;

import React, { useEffect } from "react";

const Clock = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
    script.type = "module";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="Clock">
      <dotlottie-player
        src="https://lottie.host/965e379e-7c51-4cab-bde2-88fe82c29641/AlB0MX1gZT.json"
        background="transparent"
        speed="1"
        style={{ width: "100%", height: "10%" }}
        loop
        autoplay
      ></dotlottie-player>
    </div>
  );
};

export default Clock;

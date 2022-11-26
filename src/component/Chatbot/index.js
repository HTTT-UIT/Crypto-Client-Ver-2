import { Box } from "@chakra-ui/react";
import ReactWebChat, {
  createDirectLine,
  createStyleSet,
  createStore,
} from "botframework-webchat";
import React, { useState, useEffect } from "react";

const Chatbot = (props) => {
  const [directLine, setDirectLine] = useState(
    createDirectLine({
      token: "",
    })
  );
  const initializeDirectLine = async () => {
    const res = await fetch(
      "https://directline.botframework.com/v3/directline/tokens/generate",
      {
        method: "POST",
        headers: new Headers({
          Authorization:
            "Bearer BdXtNjlCQrg.mXtfG34g2vfqZ4ErJeKA-rK9GB-vIiRJt2srhr7Ov58",
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      }
    );
    const { token } = await res.json();
    setDirectLine(createDirectLine({ token }));
  };
  const styleOptions = {
    emojiSet: true,
    botAvatarImage:
      "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
    botAvatarInitials: "BF",
    userAvatarInitials: "WC",

    hideUploadButton: true,
  };

  const styleSet = createStyleSet({
    bubbleBackground: " #f2f2f2",
    bubbleFromUserBackground: "rgba(0, 255, 0, .1)",
    rootHeight: "65vh",
    rootWidth: "100%",
    backgroundColor: " #ffffff",
  });

  styleSet.textContent = Object.assign({}, styleSet.textContent, {
    fontFamily: "'Comic Sans MS', 'Arial', sans-serif",
    fontWeight: "bold",
  });

  useEffect(() => {
    initializeDirectLine();
  }, []);

  return (
    <div>
      <ReactWebChat
        directLine={directLine}
        styleOptions={styleOptions}
        styleSet={styleSet}
        userID="-12"
      />
    </div>
  );
};

export default Chatbot;
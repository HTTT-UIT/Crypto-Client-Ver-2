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
      "https://znews-photo-fbcrawler.zadn.vn/Uploaded/mzdqv/2016_07_04/tumblr_lk6lwhaog71qfbh9jgif_480_480_0_64000_0_1_0.gif.jpg",
    botAvatarInitials: "Bot",
    userAvatarInitials: "Bạn",
    userAvatarImage: "https://i.pinimg.com/originals/80/25/a9/8025a9f63435b64305b1cf045c76fd70.jpg",
    hideUploadButton: true,
  };

  const styleSet = createStyleSet({
    bubbleBackground: "#f2f2f2",
    bubbleFromUserBackground: "#b2d8d8",
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
        userID="-5"
      />
    </div>
  );
};

export default Chatbot;
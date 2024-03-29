import { Input, Popover } from "antd";
import styles from "./index.module.scss";
import { SendOutlined, SmileOutlined } from "@ant-design/icons";
import { useState } from "react";
import Picker, { EmojiClickData } from "emoji-picker-react";
interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [inputValue, setInputValue] = useState("");
  const handleSendMessage = () => {
    if (inputValue) {
      onSend(inputValue);
      setInputValue("");
    }
  };
  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    setInputValue(inputValue + emojiObject.emoji);
  };
  return (
    <div className={styles["chatInput"]}>
      <Popover
        content={<Picker onEmojiClick={handleEmojiClick} />}
        trigger="click"
      >
        <SmileOutlined className={styles["emojiBtn"]} />
      </Popover>

      <Input.TextArea
        value={inputValue}
        placeholder="Type your message"
        className={styles["textInput"]}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <SendOutlined
        className={styles["sendBtn"]}
        onClick={handleSendMessage}
        disabled={!inputValue}
      />
    </div>
  );
};

export default ChatInput;

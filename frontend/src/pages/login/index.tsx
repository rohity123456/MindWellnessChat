import { Form, Input, Button, message } from "antd";
import styles from "./index.module.scss";
import { loginUser } from "./service";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStateValue } from "@/store";

const LoginPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [messageObj, setMessageObj] = useState({
    type: "",
    content: "",
  });
  const [, dispatch] = useStateValue();

  useEffect(() => {
    if (messageObj.content) {
      messageApi.open({
        type: messageObj.type as any,
        content: messageObj.content,
      });
      setMessageObj({
        type: "",
        content: "",
      });
    }
  }, [messageObj, messageApi]);

  const validateUsername = (username: string) => {
    if (username.trim() === "") {
      setMessageObj({
        type: "error",
        content: "Username cannot be empty",
      });
      return;
    }
    if (username.includes(" ")) {
      setMessageObj({
        type: "error",
        content: "Username cannot contain spaces",
      });
      return;
    }

    if (username.length < 3 || username.length > 30) {
      setMessageObj({
        type: "error",
        content: "Username must be between 3 and 30 characters",
      });
      return;
    }

    if (!/^[a-zA-Z0-9]*$/.test(username)) {
      setMessageObj({
        type: "error",
        content: "Username must contain only alphanumeric characters",
      });
      return;
    }

    return true;
  };

  const onFinish = (values: any) => {
    if (!validateUsername(values.username)) return;
    loginUser(values)
      .then((response) => {
        dispatch({
          type: "SET_USER",
          payload: response.data,
        });
        setMessageObj({
          type: "loading",
          content: "successfully logged in!",
        });
        setTimeout(() => {
          dispatch({
            type: "SET_AUTHENTICATED",
            payload: true,
          });
          navigate("/chat");
        }, 1000);
      })
      .catch((error) => {
        console.error("Login error:", error);
        messageApi.open({
          type: "error",
          content: error.response.data.message,
        });
      });
  };

  return (
    <div className={styles["login"]}>
      <Form onFinish={onFinish}>
        <h1>Login or Signup to MindWellness Chat</h1>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </div>
  );
};

export default LoginPage;

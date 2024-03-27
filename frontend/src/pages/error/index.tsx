import { Link } from "react-router-dom";
import { Button, Result } from "antd";

const ErrorPage = () => {
  return (
    <Result
      status="error"
      title="Something went wrong"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary">
          <Link to="/">Back Home</Link>
        </Button>
      }
    />
  );
};

export default ErrorPage;

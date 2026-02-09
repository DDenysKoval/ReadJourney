import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div>
      404 not found
      <Link to="/">Back to HomePage</Link>
    </div>
  );
};

export default NotFoundPage;

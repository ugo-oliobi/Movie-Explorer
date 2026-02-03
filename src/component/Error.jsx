import { useRouteError, Link } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  return (
    <div className="error-msg">
      <h2>An unexpected error occurred while loading this page.</h2>
      <h2>Error Message: {error.message}! </h2>
      <Link to="/">⬅ Back to Homepage</Link>
    </div>
  );
}

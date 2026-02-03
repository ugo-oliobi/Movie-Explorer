import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="page-not-found">
      <h1>404</h1>
      <h2>Oops! Page not found</h2>
      <p>The page you’re looking for doesn’t exist or may have been moved.</p>
      <Link to="/" className="home-link">
        ⬅ Back to Homepage
      </Link>
    </div>
  );
}

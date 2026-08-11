// ErrorPage.tsx
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import assets from "../assets/assets";

const ErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex flex-col items-center justify-center text-center min-h-screen gap-2">
        <img src={assets.butterfly_logo} alt="store_logo" className="w-80 ml-10" />
        <h1 className="text-3xl font-bold">
          {error.status} {error.statusText}
        </h1>
        <p className="text-gray-500">
          {error.status === 404 ? "This page doesn't exist." : "Something went wrong."}
        </p>
        <Link to="/" className="text-pink-500 underline">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-3">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <Link to="/" className="text-pink-500 underline">
        Go back home
      </Link>
    </div>
  );
};

export default ErrorPage;

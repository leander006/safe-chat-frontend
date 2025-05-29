
import { FaExclamationCircle, FaRedo } from "react-icons/fa";

const ErrorPage = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <FaExclamationCircle className="text-red-500 w-16 h-16 mb-4" />
      <h1 className="text-2xl font-bold text-gray-800">Connection Error</h1>
      <p className="text-gray-600 mt-2 mb-6">
        We are having trouble connecting to the server. Please check your internet
        connection or try again later.
      </p>

      <div className="space-y-4">
        <button
          onClick={onRetry}
          className="bg-[#5409DA] cursor-pointer hover:bg-[#453463] text-white px-6 py-3 rounded-lg shadow-md flex items-center justify-center"
        >
          <FaRedo className="inline-block mr-2 w-5 h-5" /> Retry Connection
        </button>

      </div>

      <div className="mt-8">
        <p className="text-gray-500 text-sm">
          Need help? Contact support at <a href="mailto:support@example.com" className="text-blue-500 underline">support@example.com</a>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;

export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md rounded-lg p-6 text-sm text-muted-foreground shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-white">
          Unauthorized Access
        </h1>
        <p className="mb-6">
          You are not authorized to navigate to this page as you don't have the
          necessary permissions.
        </p>

        <a
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-white transition duration-300 hover:bg-primary-700"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}

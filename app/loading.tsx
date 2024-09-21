export default function LoadingPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-white dark:bg-gray-900 opacity-85"></div>
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
    </div>
  );
}

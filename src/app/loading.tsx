export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        </div>
        <p className="text-lg font-medium text-gray-700">Loading blogs…</p>
        <p className="mt-2 text-sm text-gray-500">Please wait a moment</p>
      </div>
    </div>
  );
}

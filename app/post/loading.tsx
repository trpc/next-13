export default function Loading() {
  return (
    <div className="p-4 max-w-sm">
      <div className="animate-pulse flex">
        <div className="flex-1 flex flex-col gap-4 py-3">
          <div className="h-4 bg-gray-400 rounded" />
            <div className="h-3 bg-gray-400 rounded" />
            <div className="h-3 bg-gray-400 rounded" />
        </div>
      </div>
    </div>
  );
}

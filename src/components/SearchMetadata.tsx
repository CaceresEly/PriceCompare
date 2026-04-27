type SearchMetadataProps = {
  source: "database" | "provider";
  isStale: boolean;
  lastUpdatedAt: string;
};

function formatRelativeTime(date: string) {
  const diffMs = Date.now() - new Date(date).getTime();
  const diffSeconds = Math.max(Math.floor(diffMs / 1000), 0);
  const diffMinutes = Math.floor(diffSeconds / 60);

  if (diffSeconds < 60) {
    return "just now";
  }

  if (diffMinutes === 1) {
    return "1 minute ago";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} minutes ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours === 1) {
    return "1 hour ago";
  }

  return `${diffHours} hours ago`;
}

export function SearchMetadata({
  source,
  isStale,
  lastUpdatedAt,
}: SearchMetadataProps) {
  const sourceLabel =
    source === "database" ? "Cached history" : "Fresh provider data";

  const statusLabel = isStale ? "Refreshed" : "Cached";

  return (
    <div className="mb-4 flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600 md:flex-row md:items-center md:justify-between">
      <div>
        <span className="font-medium text-zinc-900">Data source:</span>{" "}
        {sourceLabel}
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
        <span>
          <span className="font-medium text-zinc-900">Status:</span>{" "}
          {statusLabel}
        </span>

        <span>
          <span className="font-medium text-zinc-900">Last updated:</span>{" "}
          {formatRelativeTime(lastUpdatedAt)}
        </span>
      </div>
    </div>
  );
}
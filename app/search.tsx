"use client";

import { useState } from "react";
import { search } from "./actions";
import { useRouter } from "next/navigation";

export default function Search() {
  const { push } = useRouter();
  const [q, setQ] = useState("");

  const onSearch = async () => {
    if (q) {
      const path = await search(q);

      push(path);
    }
  };

  const onType = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="flex gap-2 relative w-full">
      <input
        className="w-full p-2 border border-gray-300 rounded-full text-xs text-center"
        placeholder="search for a txn/addr"
        onKeyDown={onType}
        onChange={(e) => setQ(e.target.value)}
        value={q}
      />

      <button
        onClick={onSearch}
        className="absolute right-0 p-1 m-1 italic text-xs hover:bg-gray-100 hover:border-gray-300 rounded-full border border-transparent transition-all"
      >
        search
      </button>
    </div>
  );
}

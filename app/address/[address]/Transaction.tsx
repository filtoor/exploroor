"use client";

import { humanReadableType } from "@/app/helpers";
import NFT from "./NFT";

export interface TransactionType {
  signature: string;
  description: string;
  type: string;
  fee: number;
  feePayer: string;
  timestamp: number;
  events: {
    compressed: { assetId: string }[];
    swap: string[];
  };
}

export function Transaction({ transaction }: { transaction: TransactionType }) {
  return (
    <div className="flex flex-col shadow-md rounded-lg w-full p-4 gap-1">
      <span className="text-xs">
        {new Date(transaction.timestamp * 1000).toLocaleString()}
      </span>

      <div className="flex">
        <div className="flex gap-1">
          {transaction.events.compressed?.map((event) => (
            <NFT id={event.assetId} key={event.assetId} />
          ))}
        </div>

        <span className="text-xs italic">
          {humanReadableType(transaction.type)}
        </span>
      </div>
    </div>
  );
}

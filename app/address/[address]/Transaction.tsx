import {
  humanReadableMint,
  humanReadableType,
  lamportsToSol,
} from "@/app/helpers";
import NFT from "./NFT";
import { Suspense, useMemo } from "react";

export interface TransactionType {
  signature: string;
  description: string;
  type: string;
  fee: number;
  feePayer: string;
  timestamp: number;
  tokenTransfers: {
    fromUserAccount: string;
    toUserAccount: string;
    tokenAmount: number;
    mint: string;
  }[];
  nativeTransfers: {
    fromUserAccount: string;
    toUserAccount: string;
    amount: number;
  }[];
  accountData: {
    account: string;
    nativeBalanceChange: number;
    tokenBalanceChanges: {
      userAccount: string;
      tokenAccount: string;
      mint: string;
      rawTokenAmount: { tokenAmount: string; decimals: number };
    }[];
  }[];
  events: {
    compressed: { assetId: string }[];
    swap: string[];
  };
}

export function Transaction({
  transaction,
  account,
}: {
  transaction: TransactionType;
  account: string;
}) {
  const accountUpdate = useMemo(() => {
    return transaction.accountData.find((update) => update.account === account);
  }, [transaction]);

  const tokenAccountUpdate = useMemo(() => {
    return transaction.accountData.filter((update) =>
      update.tokenBalanceChanges.some(
        (tokenBalance) => tokenBalance.userAccount === account
      )
    );
  }, [transaction]);

  const accountBalanceChanged = useMemo(() => {
    if (transaction.type === "COMPRESSED_NFT_MINT") {
      return true;
    }

    if (!accountUpdate) {
      return false;
    }

    if (
      accountUpdate.nativeBalanceChange !== 0 ||
      accountUpdate.tokenBalanceChanges.length > 0
    ) {
      return true;
    }

    return false;
  }, [transaction]);

  if (!accountBalanceChanged) {
    return <></>;
  }

  console.log(accountUpdate);

  return (
    <div className="flex flex-col shadow-md rounded-lg w-full p-4 gap-2">
      <div className="flex w-full justify-between text-xs">
        <span className="font-bold">{humanReadableType(transaction.type)}</span>

        <span>{new Date(transaction.timestamp * 1000).toLocaleString()}</span>
      </div>

      <div className="flex">
        <div className="flex gap-1">
          {transaction.events.compressed?.map((event) => (
            <Suspense
              fallback={
                <div className="w-16 h-16 bg-gray-200 animate-pulse rounded-md" />
              }
            >
              <NFT id={event.assetId} key={event.assetId} />
            </Suspense>
          ))}

          {accountUpdate && (
            <div className="text-xs flex flex-col gap-1">
              {accountUpdate.nativeBalanceChange !== 0 && (
                <span>
                  {lamportsToSol(accountUpdate.nativeBalanceChange)} SOL
                </span>
              )}
              {accountUpdate.tokenBalanceChanges.map((token) => (
                <span key={token.mint}>
                  {Number.parseInt(token.rawTokenAmount.tokenAmount) /
                    10 ** token.rawTokenAmount.decimals}{" "}
                  {humanReadableMint(token.mint)}
                </span>
              ))}
              {tokenAccountUpdate.map((update) => (
                <span key={update.account}>
                  {update.tokenBalanceChanges
                    .filter((token) => token.userAccount === account)
                    .map((token) => (
                      <span key={token.mint}>
                        {Number.parseInt(token.rawTokenAmount.tokenAmount) /
                          10 ** token.rawTokenAmount.decimals}{" "}
                        {humanReadableMint(token.mint)}
                      </span>
                    ))}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

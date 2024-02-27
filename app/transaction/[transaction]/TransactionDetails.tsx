import NFT from "@/app/address/[address]/NFT";
import { TransactionType } from "@/app/address/[address]/Transaction";
import { formatTransactionDescription, shortenAddress } from "@/app/helpers";
import NativeTransfer from "./NativeTransfer";
import TokenTransfer from "./TokenTransfer";
import CopyButton from "./CopyButton";

async function getTransaction(id: string) {
  const rpc_url = process.env.RPC_URL!;
  const api_key = rpc_url.split("?api-key=")[1];
  const api_url = `https://api.helius.xyz/v0/transactions/?api-key=${api_key}&limit=25`;

  const response = await fetch(api_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      transactions: [id],
    }),
  });
  const result = await response.json();

  return result[0] as TransactionType;
}

export default async function TransactionDetails({ id }: { id: string }) {
  const transaction = await getTransaction(id);

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-bold">{shortenAddress(id)}</span>
          <CopyButton text={id} />
        </div>

        <span className="text-xs">
          {new Date(transaction.timestamp * 1000).toLocaleString()}
        </span>
      </div>

      <div className="flex flex-row gap-2">
        {transaction.events.compressed?.map((asset) => (
          <NFT id={asset.assetId} key={asset.assetId} />
        ))}
      </div>

      <span className="text-sm mb-4">
        {formatTransactionDescription(
          transaction.description,
          transaction.accountData.flatMap((ad) => [
            ad.account,
            ...ad.tokenBalanceChanges.flatMap((tbc) => tbc.userAccount),
          ])
        )}
      </span>

      {transaction.nativeTransfers.length > 0 && (
        <>
          <span className="font-bold text-sm uppercase text-xs tracking-tight">
            Native (SOL) Transfers:
          </span>
          <div className="flex flex-col">
            {transaction.nativeTransfers.map((transfer) => (
              <NativeTransfer transfer={transfer} key={transfer.amount} />
            ))}
          </div>
        </>
      )}

      {transaction.tokenTransfers.length > 0 && (
        <>
          <span className="font-bold text-sm uppercase text-xs tracking-tight">
            Token Transfers
          </span>
          <div className="flex flex-col">
            {transaction.tokenTransfers.map((transfer) => (
              <TokenTransfer transfer={transfer} key={transfer.tokenAmount} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

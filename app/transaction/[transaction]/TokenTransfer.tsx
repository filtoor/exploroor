import {
  humanReadableMint,
  lamportsToSol,
  shortenAddress,
} from "@/app/helpers";

export default function TokenTransfer({
  transfer,
}: {
  transfer: {
    fromUserAccount: string;
    toUserAccount: string;
    tokenAmount: number;
    mint: string;
  };
}) {
  const mint = humanReadableMint(transfer.mint);
  return (
    <span className="text-xs">
      Transfer from{" "}
      <a
        href={`/address/${transfer.fromUserAccount}`}
        className="font-bold hover:underline"
      >
        {shortenAddress(transfer.fromUserAccount)}
      </a>{" "}
      to{" "}
      <a
        href={`/address/${transfer.toUserAccount}`}
        className="font-bold hover:underline"
      >
        {shortenAddress(transfer.toUserAccount)}
      </a>{" "}
      for {transfer.tokenAmount} {mint.symbol}
    </span>
  );
}

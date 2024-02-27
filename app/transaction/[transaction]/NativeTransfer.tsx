import { lamportsToSol, shortenAddress } from "@/app/helpers";

export default function NativeTransfer({
  transfer,
}: {
  transfer: { fromUserAccount: string; toUserAccount: string; amount: number };
}) {
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
      for {lamportsToSol(transfer.amount)} SOL
    </span>
  );
}

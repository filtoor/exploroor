import { Suspense } from "react";
import AccountBalance from "./AccountBalance";
import AccountTransactions from "./AccountTransactions";
import { resolveAddress, shortenAddress } from "@/app/helpers";
import CopyButton from "@/app/transaction/[transaction]/CopyButton";

export default async function Address({
  params,
}: {
  params: { address: string };
}) {
  const address = await resolveAddress(params.address);

  return (
    <div className="flex flex-col gap-4 mb-16">
      <div className="flex flex-col gap-1 w-max">
        <span className="font-bold">Address: </span>
        <div className="flex gap-2 items-center">
          <span>{shortenAddress(address)}</span>
          <CopyButton text={address} />
        </div>
        {address !== params.address && (
          <span className="italic">
            {params.address}
            {!params.address.endsWith(".sol") &&
              address !== params.address &&
              ".sol"}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-bold">Balance: </span>
        <Suspense fallback={<span>Loading account...</span>}>
          <AccountBalance account={address} />
        </Suspense>
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-bold">Transactions: </span>
        <Suspense fallback={<span>Loading transactions...</span>}>
          <AccountTransactions account={address} />
        </Suspense>
      </div>
    </div>
  );
}

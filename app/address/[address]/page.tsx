import { Suspense } from "react";
import AccountBalance from "./AccountBalance";
import AccountTransactions from "./AccountTransactions";
import { resolveAddress } from "@/app/helpers";

export default async function Address({
  params,
}: {
  params: { address: string };
}) {
  const address = await resolveAddress(params.address);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 w-max">
        <span className="font-bold">Address: </span>
        <span>{params.address}</span>
        {address !== params.address && (
          <span className="italic">{address}</span>
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

import { Suspense } from "react";
import AccountBalance from "./AccountBalance";
import AccountTransactions from "./AccountTransactions";

export default function Address({ params }: { params: { address: string } }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 w-max">
        <span className="font-bold">Address: </span>
        <span>{params.address}</span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-bold">Balance: </span>
        <Suspense fallback={<span>Loading account...</span>}>
          <AccountBalance account={params.address} />
        </Suspense>
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-bold">Transactions: </span>
        <Suspense fallback={<span>Loading transactions...</span>}>
          <AccountTransactions account={params.address} />
        </Suspense>
      </div>
    </div>
  );
}

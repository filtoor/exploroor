import { Suspense } from "react";
import TransactionDetails from "./TransactionDetails";

export default async function Transaction({
  params,
}: {
  params: { transaction: string };
}) {
  return (
    <div className="flex flex-col gap-4 mb-16">
      <Suspense fallback={<span>Loading transaction...</span>}>
        <TransactionDetails id={params.transaction} />
      </Suspense>
    </div>
  );
}

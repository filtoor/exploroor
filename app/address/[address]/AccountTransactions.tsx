import { Transaction, TransactionType } from "./Transaction";

async function getAccountTransactions(address: string) {
  const rpc_url = process.env.RPC_URL!;
  const api_key = rpc_url.split("?api-key=")[1];
  const api_url = `https://api.helius.xyz/v0/addresses/${address}/transactions?api-key=${api_key}`;

  const response = await fetch(api_url);
  const result = await response.json();

  return result;
}

export default async function AccountTransactions({
  account,
}: {
  account: string;
}) {
  const accountTransactions = await getAccountTransactions(account);

  if (accountTransactions.error) {
    return <span>Error</span>;
  }

  return (
    <div className="flex flex-col gap-4">
      {accountTransactions.map((transaction: TransactionType) => (
        <Transaction transaction={transaction} key={transaction.signature} />
      ))}
    </div>
  );
}

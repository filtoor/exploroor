import { lamportsToSol } from "@/app/helpers";

async function getAccountBalance(address: string) {
  const response = await fetch(process.env.RPC_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getAccountInfo",
      params: [address, { encoding: "base58" }],
    }),
    next: { revalidate: 10 },
  });

  const result = await response.json();

  return result;
}

export default async function AccountBalance({ account }: { account: string }) {
  const accountBalance = await getAccountBalance(account);

  if (accountBalance.error) {
    return <span>Error</span>;
  }

  return (
    <span>{lamportsToSol(accountBalance.result.value?.lamports ?? 0)} SOL</span>
  );
}

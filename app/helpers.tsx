import { TransactionType } from "./address/[address]/Transaction";
import JUP_ADDRESSES from "./jup_addresses.json";

export function lamportsToSol(lamports: number) {
  return lamports / 1000000000;
}

export async function resolveAddress(q: string) {
  if (q.endsWith(".sol")) {
    const res = await fetch(
      `https://sns-sdk-proxy.bonfida.workers.dev/resolve/${q?.toLowerCase()}`
    );
    const data = await res.json();

    return data.result;
  }

  if (q.length < 32) {
    const res = await fetch(
      `https://sns-sdk-proxy.bonfida.workers.dev/resolve/${q?.toLowerCase()}.sol`
    );
    const data = await res.json();

    if (data.error) {
      return "Error";
    }

    return data.result;
  }

  return q;
}

export function sentenceCase(s: string) {
  return s
    .split("_")
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join(" ")
    .replace("Nft", "NFT");
}

export function shortenAddress(s: string) {
  if (s.length <= 6) return s;

  return `${s.slice(0, 6)}...${s.slice(-4)}`;
}

export function humanReadableType(t: string) {
  switch (t) {
    case "UNKNOWN":
      return "Transaction";
    default:
      return sentenceCase(t);
  }
}

export function humanReadableMint(m: string) {
  const jup_address = (
    JUP_ADDRESSES as {
      address: string;
      symbol: string;
      name: string;
      decimals: number;
    }[]
  ).find((a: { address: string; symbol: string }) => a.address === m);

  if (jup_address) {
    return jup_address;
  }

  return { name: "Unknown", address: m, symbol: "Unknown", decimals: 1 };
}

export function formatTransactionDescription(transaction: TransactionType) {
  const description = transaction.description;
  const addresses = transaction.accountData.flatMap((ad) => [
    ad.account,
    ...ad.tokenBalanceChanges.flatMap((tbc) => tbc.userAccount),
  ]);
  const words = description.split(" ");
  const jsx = [];
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    if (word.endsWith(".") || word.endsWith(",")) {
      word = word.slice(0, -1);
    }

    if (addresses.includes(word)) {
      jsx.push(
        <a href={`/address/${word}`} className="font-bold hover:underline">
          {shortenAddress(word)}
        </a>
      );
      jsx.push(" ");
    } else {
      jsx.push(word + " ");
    }
  }

  return jsx;
}

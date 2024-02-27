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
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export function shortenAddress(s: string) {
  if (s.length <= 6) return s;

  return `${s.slice(0, 6)}...${s.slice(-4)}`;
}

export function humanReadableType(t: string) {
  switch (t) {
    case "COMPRESSED_NFT_MINT":
      return "Compressed NFT Mint";
    case "NFT_MINT":
      return "NFT Mint";
    default:
      return sentenceCase(t.replace("_", " "));
  }
}

export function humanReadableMint(m: string) {
  switch (m) {
    case "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v":
      return "USDC";
    case "So11111111111111111111111111111111111111112":
      return "SOL";
    default:
      const jup_address = JUP_ADDRESSES.find(
        (a: { address: string; symbol: string }) => a.address === m
      );

      if (jup_address) {
        return jup_address.symbol;
      }
      return "Unknown";
  }
}

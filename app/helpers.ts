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

export async function humanReadableType(t: string) {
  switch (t) {
    case "COMPRESSED_NFT_MINT":
      return "Compressed NFT Mint";
    case "NFT_MINT":
      return "NFT Mint";
    case "TOKEN_MINT":
      return "Token Mint";
    default:
      return t;
  }
}

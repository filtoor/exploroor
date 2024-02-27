async function getNFTImage(id: string) {
  const response = await fetch(process.env.RPC_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getAsset",
      params: { id: id },
    }),
  });

  const result = await response.json();

  if (result.error) {
    console.log(result.error);
    return "";
  }

  // get any redirect
  const imageResponse = await fetch(result.result.content.links.image, {
    cache: "no-store",
  });
  return imageResponse.url;
}

async function getSpamClassification(id: string) {
  const response = await fetch("https://api.filtoor.xyz/classify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ids: [id],
    }),
  });
  const result = await response.json();
  return result[0];
}

export default async function NFT({ id }: { id: string }) {
  const [classification, image] = await Promise.all([
    getSpamClassification(id),
    getNFTImage(id),
  ]);

  if (classification === "spam") {
    return <div className="h-16 w-16">🚫</div>;
  }

  if (!image) {
    return <div className="h-16 w-16">?</div>;
  }

  return (
    <img
      src={image}
      alt={`NFT #${id}`}
      className="rounded-md shadow-md h-16 w-16"
    />
  );
}

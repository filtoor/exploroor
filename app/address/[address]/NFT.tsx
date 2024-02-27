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

  if (!result.result.content.links.image) {
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

  if (!image) {
    return <div className="h-16 w-16">?</div>;
  }

  return (
    <div className="flex flex-col gap-1 relative">
      <img src={image} alt={`NFT #${id}`} className="rounded-md shadow-md" />

      {classification === "spam" && (
        <span className="text-red-800 absolute w-full text-center top-0 bg-red-200 h-full opacity-70 rounded-md hover:opacity-0 transition-all pt-[15%] select-none">
          🚫 Likely Spam
        </span>
      )}
    </div>
  );
}

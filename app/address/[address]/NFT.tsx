export default function NFT({ id }: { id: string }) {
  return (
    <img
      src="https://solarni.us/_next/image?url=https%3A%2F%2Fbafybeih3w6jc3tnw4lrok5ewtgcnoxer76ef5tdxkj773fyhzvyk2x3tgq.ipfs.nftstorage.link%2F5525.png&w=384&q=75"
      alt={`NFT #${id}`}
      className="rounded-md shadow-md h-16 w-16"
    />
  );
}

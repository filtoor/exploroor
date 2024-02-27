export default function Address({ params }: { params: { address: string } }) {
  return <span>{params.address}</span>;
}

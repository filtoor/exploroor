import Search from "./search";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-4 h-screen">
      <h1 className="text-4xl">exploroor</h1>
      <span>
        a txn explorer built for <span className="italic">speed</span>
      </span>

      <Search />
    </main>
  );
}

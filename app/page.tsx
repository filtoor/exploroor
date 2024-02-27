import Search from "./search";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-4 h-screen w-full max-w-lg px-4">
      <h1 className="text-4xl">exploroor</h1>
      <span>explorer with spam detection</span>

      <Search />
    </main>
  );
}

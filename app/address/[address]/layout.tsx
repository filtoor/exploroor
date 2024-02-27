import Search from "@/app/search";

export default function AddressLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex justify-center">
      <div className="max-w-lg w-full flex flex-col mt-4 px-4 gap-4">
        <div className="flex gap-4 items-center mt-4">
          <a className="font-bold italic hover:underline" href="/">
            exploroor
          </a>

          <Search />
        </div>

        <hr />

        {children}
      </div>
    </div>
  );
}

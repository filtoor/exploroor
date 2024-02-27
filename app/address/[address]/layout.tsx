import Search from "@/app/search";

export default function AddressLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="flex justify-center">
          <div className="max-w-lg flex flex-col mt-4 px-4 gap-8">
            <div className="flex gap-4 items-center mt-4">
              <span className="font-bold italic">exploroor</span>

              <Search />
            </div>

            <hr />

            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

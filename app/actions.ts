"use server";

export async function search(q: string) {
  if (q.length > 44) return `/transaction/${q}`;

  return `/address/${q}`;
}

"use server";

export async function search(q: string) {
  return `/address/${q}`;
}

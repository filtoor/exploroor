"use server";

export async function search(q: string) {
  if (q.endsWith(".sol")) {
  }
  return `/address/${q}`;
}

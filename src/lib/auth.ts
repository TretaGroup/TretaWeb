import { api } from "./api";

export async function refresh() {
  const res = await api("/auth/refresh", { method: "POST" });
  return res.ok;
}

export async function getMe() {
  await refresh(); // attempt silent renewal

  const res = await api("/users/me");
  if (!res.ok) return null;
  return res.json();
}

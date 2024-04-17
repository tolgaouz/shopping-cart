import { Clerk } from "@clerk/clerk-expo";

export const SERVER_URL = "http://localhost:4000/api";

export const fetcher = async (endpoint: string, init?: RequestInit) => {
  const { headers, ...restInit } = init || {};

  return fetch(`${SERVER_URL + endpoint}`, {
    headers: {
      Authorization: `Bearer ${await Clerk.session.getToken()}`,
      ...headers,
    },
    ...restInit,
  }).then((res) => res.json());
};

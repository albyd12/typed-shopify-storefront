import { Client } from "./types/client";
import { parseGql } from "./utils/gql";

/**
 * Sends a graphql query with headers
 * @param client
 * @param query
 * @returns
 */
export const gql = async (client: Client, query: string) => {
  const URL = `https://${client.domain}/api/2022-10/graphql.json`;

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": client.accessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: query,
  };
  try {
    const data = await fetch(URL, options).then((response) => {
      return response.json();
    });
    return parseGql(data.data) as any;
  } catch (error) {
    throw new Error("Error fetching");
  }
};

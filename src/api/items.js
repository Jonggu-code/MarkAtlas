import client from "./client";

export const getItems = async (country = "kr") => {
  const res = await client.get("/api/items", {
    params: { country },
  });
  return res.data;
};

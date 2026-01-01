import client from "./client";

export const getItems = async (country = "kr") => {
    const res = await client.get("/items", {
        params: { country },
    });
    return res.data;
};

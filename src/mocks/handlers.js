import { delay, http, HttpResponse } from "msw";
import data_kr from "../data/trademarks_kr_trademarks.json";
import data_us from "../data/trademarks_us_trademarks.json";

export const handlers = [
  http.get("*/api/items", async ({ request }) => {
    await delay(2000);

    const url = new URL(request.url);
    const country = url.searchParams.get("country");

    if (country === "us") {
      return HttpResponse.json(data_us);
    }

    return HttpResponse.json(data_kr);
  }),
];

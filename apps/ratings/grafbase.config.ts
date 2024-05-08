import { graph, connector, config } from "@grafbase/sdk";

const g = graph.Standalone();

const ratings = connector.OpenAPI("ratings", {
  schema:
    "https://raw.githubusercontent.com/amadeus4dev/amadeus-open-api-specification/main/spec/json/HotelRatings_v2_swagger_specification.json",
  headers: (headers) => {
    headers.set("Authorization", { forward: "Authorization" });
  },
});

g.datasource(ratings, { namespace: false });

export default config({
  graph: g,
  auth: {
    rules: (rules) => {
      rules.public();
    },
  },
  // cache: {
  //   rules: [
  //     {
  //       types: ["Query"], // Cache everything for 60 seconds
  //       maxAge: 60,
  //       staleWhileRevalidate: 60,
  //     },
  //   ],
  // },
});

import { graph, connector, config } from "@grafbase/sdk";

const g = graph.Standalone();

const hotels = connector.OpenAPI("hotels", {
  schema:
    "https://raw.githubusercontent.com/amadeus4dev/amadeus-open-api-specification/main/spec/json/HotelList_v1_swagger_specification.json",
  headers: (headers) => {
    headers.set("Authorization", { forward: "Authorization" });
  },
});

g.datasource(hotels, { namespace: false });

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

import { graph, connector, config } from "@grafbase/sdk";

const g = graph.Standalone({ subgraph: true });

const ratings = connector.OpenAPI("ratings", {
  schema:
    "https://raw.githubusercontent.com/amadeus4dev/amadeus-open-api-specification/main/spec/json/HotelRatings_v2_swagger_specification.json",
  headers: (headers) => {
    headers.set("Authorization", { forward: "Authorization" });
  },
});

g.datasource(ratings, { namespace: false });

g.type("Hotel", {
  hotelId: g.string(),
  sentiments: g
    .ref("GetSentimentsByHotelIds")
    .optional()
    .join("sentimentsByHotelIds(hotelIds: $hotelId)"),
}).key("hotelId");

export default config({
  graph: g,
  auth: {
    rules: (rules) => {
      rules.public();
    },
  },
});

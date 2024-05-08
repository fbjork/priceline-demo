import { graph, connector, config } from "@grafbase/sdk";

const typeDefs = `#graphql
  type Hotel @key(fields: "hotelId", resolvable: false) {
    hotelId: String
    sentiments: GetSentimentsByHotelIds @join(select: "sentimentsByHotelIds(hotelIds: [$hotelId])")
  }
`;

const g = graph.Standalone({ typeDefs, subgraph: true });

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
});

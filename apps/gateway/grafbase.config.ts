import { graph, config } from "@grafbase/sdk";

const g = graph.Federated({
  subgraphs: [
    {
      name: "hotels",
      url: "http://localhost:4001/graphql",
    },
    {
      name: "ratings",
      url: "http://localhost:4002/graphql",
    },
  ],
  headers: (headers) => {
    headers
      .subgraph("hotels")
      .set("Authorization", { forward: "Authorization" });
    headers
      .subgraph("ratings")
      .set("Authorization", { forward: "Authorization" });
  },
});

export default config({ graph: g });

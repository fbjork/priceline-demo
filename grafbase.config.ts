import { graph, connector, config } from "@grafbase/sdk";

const g = graph.Standalone();

const countries = connector.GraphQL("countries", {
  url: "https://countries.trevorblades.com",
});

g.datasource(countries);

export default config({
  graph: g,
  auth: {
    rules: (rules) => {
      rules.public();
    },
  },
  cache: {
    rules: [
      {
        types: ["Query"], // Cache everything for 60 seconds
        maxAge: 600,
        staleWhileRevalidate: 600,
      },
    ],
  },
});

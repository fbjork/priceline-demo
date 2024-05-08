# Priceline demo

A federated graph with two subgraphs: `hotels` and `ratings`.

Both subgraphs use the Grafbase [OpenAPI connector](https://grafbase.com/docs/connectors/openapi) to convert REST APIs to GraphQL using OpenAPI specs.

The `hotels` subgraph uses the Amadeus [Hotel List](https://developers.amadeus.com/self-service/category/hotels/api-doc/hotel-list/api-reference) REST API. The `ratings` subgraph uses the Amadeus [Hotel Ratings](https://developers.amadeus.com/self-service/category/hotels/api-doc/hotel-ratings) REST API.

export function getCountriesList() {
  const countries = [
    {
      country: "USA",
      path: "us",
      currency: {
        name: "USD",
        type: "dollar",
        symbol: "$",
      },
    },
    {
      country: "UK",
      path: "uk",
      currency: {
        name: "GBP",
        type: "pound",
        symbol: "£",
      },
    },
  ];

  return countries;
}

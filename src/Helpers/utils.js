export function getCountriesList() {
  const countries = [
    {
      country: "Ireland",
      path: "ireland",
      currency: {
        name: "EUR",
        type: "euro",
        symbol: "€",
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

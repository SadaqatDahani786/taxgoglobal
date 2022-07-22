//Images
import flagUK from "../Assets/Images/flag-uk.jpg";
import flagNetherlands from "../Assets/Images/flag-netherlands.png";
import flagIreland from "../Assets/Images/flag-ireland.jpg";

export function getCountriesList() {
  const countries = [
    {
      country: "Ireland",
      path: "ireland",
      flag: flagIreland,
      years: ["2022/23", "2021/22", "2020/21", "2019/20", "2018/19"],
      currency: {
        name: "EUR",
        type: "euro",
        symbol: "€",
      },
    },
    {
      country: "Netherland",
      path: "netherland",
      flag: flagNetherlands,
      years: ["2019/20"],
      currency: {
        name: "EUR",
        type: "euro",
        symbol: "€",
      },
    },
    {
      country: "UK",
      path: "uk",
      flag: flagUK,
      years: ["2022/23", "2021/22", "2020/21", "2019/20", "2018/19"],
      currency: {
        name: "GBP",
        type: "pound",
        symbol: "£",
      },
    },
  ];

  return countries;
}

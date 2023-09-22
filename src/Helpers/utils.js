//Images
import flagUK from "../Assets/Images/flag-uk.jpg";
import flagNetherlands from "../Assets/Images/flag-netherlands.png";
import flagIreland from "../Assets/Images/flag-ireland.jpg";
import flagNigeria from "../Assets/Images/flag-nigeria.jpg";
import flagKenya from "../Assets/Images/flag-kenya.jpg";
import flagSouthAfrica from "../Assets/Images/flag-south-africa.jpg";
import flagSerbia from "../Assets/Images/flag-serbia.jpg";

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
      country: "Kenya",
      path: "kenya",
      flag: flagKenya,
      years: ["2020/21"],
      currency: {
        name: "KSH",
        type: "shilling",
        symbol: "KES",
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
      country: "Nigeria",
      path: "nigeria",
      flag: flagNigeria,
      years: ["2022/23"],
      currency: {
        name: "NGN",
        type: "naira",
        symbol: "₦",
      },
    },
    {
      country: "Serbia",
      path: "serbia",
      flag: flagSerbia,
      years: ["2019/20"],
      currency: {
        name: "RSD",
        type: "dinar",
        symbol: "RSD",
      },
    },
    {
      country: "South Africa",
      path: "south-africa",
      flag: flagSouthAfrica,
      years: ["2021/22"],
      currency: {
        name: "ZAR",
        type: "rand",
        symbol: "R",
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

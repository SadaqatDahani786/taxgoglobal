//Images
import flagUK from "../Assets/Images/flag-uk.jpg";
import flagNetherlands from "../Assets/Images/flag-netherlands.png";
import flagIreland from "../Assets/Images/flag-ireland.jpg";
import flagNigeria from "../Assets/Images/flag-nigeria.jpg";
import flagKenya from "../Assets/Images/flag-kenya.jpg";
import flagSouthAfrica from "../Assets/Images/flag-south-africa.jpg";
import flagSerbia from "../Assets/Images/flag-serbia.jpg";
import flagFrance from "../Assets/Images/flag-france.jpg";
import flagHongKong from "../Assets/Images/flag-hong-kong.jpg";
import flagCanada from "../Assets/Images/flag-canada.jpg";
import flagUSA from "../Assets/Images/flag-usa.jpg";

export function getCountriesList() {
  const countries = [
    {
      country: "America",
      path: "america",
      flag: flagUSA,
      years: ["2021/22"],
      provinces_or_states: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District of Columbia",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
      marrital_status: [
        "Single",
        "Married - Filing Seperately",
        "Married - Filing Jointly",
        "Head of Household",
      ],
      currency: {
        name: "USD",
        type: "dollar",
        symbol: "$",
      },
    },
    {
      country: "Canada",
      path: "canada",
      flag: flagCanada,
      years: ["2021/22"],
      provinces_or_states: [
        "Alberta",
        "British Columbia",
        "Nova Scotia",
        "Prince Edward Island",
        "Ontario",
        "Quebec",
        "Manitoba",
        "New Brunswick",
        "Newfoundland & Labrador",
        "Saskatchewan",
        "Northwest Territories",
        "Nunavut",
        "Yukon",
      ],
      currency: {
        name: "CAD",
        type: "dollar",
        symbol: "$",
      },
    },
    {
      country: "France",
      path: "france",
      flag: flagFrance,
      years: ["2020/21"],
      marrital_status: ["Single", "Married"],
      currency: {
        name: "EUR",
        type: "euro",
        symbol: "€",
      },
    },
    {
      country: "Hong Kong",
      path: "hong-kong",
      flag: flagHongKong,
      years: ["2022/23"],
      marrital_status: ["Single", "Married", "One Parent Family"],
      currency: {
        name: "HKD",
        type: "dollar",
        symbol: "HK$",
      },
    },
    {
      country: "Ireland",
      path: "ireland",
      flag: flagIreland,
      years: ["2022/23", "2021/22", "2020/21", "2019/20", "2018/19"],
      marrital_status: ["Single", "Married - One Income", "One Parent Family"],
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

const API_ENDPOINT = "http://localhost:5000/api/v1";

/**
 ** ====================================
 ** CALCULATE TAX
 ** ====================================
 */
export function calculateTax(
  country,
  income,
  taxYear,
  filingStatus,
  noOfChilds,
  age
) {
  return {
    url: `${API_ENDPOINT}/calculate-tax/${country}?income=${income}&tax-year=${taxYear}&filing-status=${filingStatus}&number-of-childs=${noOfChilds}&age=${age}`,
  };
}

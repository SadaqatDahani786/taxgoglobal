const API_ENDPOINT = "http://localhost:5000/api/v1";

/**
 ** ====================================
 ** CALCULATE TAX US
 ** ====================================
 */
export function calculateTaxUS(income) {
  return { url: `${API_ENDPOINT}/calculate-tax/us?income=${income}` };
}

/**
 ** ====================================
 ** CALCULATE TAX UK
 ** ====================================
 */
export function calculateTaxUK(income) {
  return { url: `${API_ENDPOINT}/calculate-tax/uk?income=${income}` };
}

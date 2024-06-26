import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

//UI Components
import Heading from "../../Components/Heading";
import Paragrah from "../../Components/Paragraph";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import Results from "../../Components/Results";
import Alert from "../../Components/Alert";
import Combobox from "../../Components/Combobox";

//Hooks & Functions
import useInput from "../../Hooks/useInput";
import useFetch from "../../Hooks/useFetch";
import { calculateTax } from "../../API/api";
import {
  isEmpty,
  createValidator,
  IsDecimal,
  isNumber,
  isMax,
  isMin,
} from "../../Helpers/validation";
import { getCountriesList } from "../../Helpers/utils";

/*
 ** **
 ** ** ** STYLED COMPONENTS
 ** **
 */
//Wrapper
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
`;

//Heading Wrapper
const HeadingWrapper = styled.div`
  text-align: center;
  text-transform: uppercase;
  padding: 25px 0;
`;

//AnchorLink
const AnchorLink = styled(Link)`
  align-self: flex-end;
  font-size: 1.6rem;
  text-decoration: none;
  color: var(--color-primary);
`;

//Form Wrapper
const FormWrapper = styled.div`
  display: flex;
  gap: 20px;
  background-color: var(--color-secondary);
  padding: 20px 20px 0;
`;

//Form Group
const FormGroup = styled.div`
  flex-grow: 1;
  &:first-of-type {
    flex-grow: 1;
  }
`;

/*
 ** **
 ** ** ** COMPONENT [TaxCalculator]
 ** **
 */
const TaxCalculator = () => {
  //State
  const [taxResults, setTaxResults] = useState([]);
  const [selectedTaxYear, setSelectedTaxYear] = useState("");
  const [selectedFilingStatus, setSelectedFilingStatus] = useState("");
  const [selectedNoOfChilds, setSelectedNoOfChilds] = useState("");
  const [selectedProvinceOrState, setSelectedProvinceOrState] = useState("");
  const [showAlertError, setShowAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [countries] = useState(getCountriesList());
  const [country, setCountry] = useState({});
  const Params = useParams();
  const Navigate = useNavigate();

  //If wrong parameter, redirect to 404 page
  useEffect(() => {
    const ind = countries.findIndex((curr) => curr.path === Params.country);
    if (ind === -1) Navigate("/404");

    setCountry(countries[ind]);
  }, [Navigate, countries, Params]);

  //Refs
  const refGrossIncome = useRef(null);
  const refAge = useRef(null);
  const refTaxYear = useRef(null);
  const refFilingStatus = useRef(null);
  const refNoOfChilds = useRef(null);
  const refResults = useRef(null);
  const refProvincesOrStates = useRef(null);

  //Form Input
  const grossIncome = useInput(
    "",
    createValidator([
      {
        validator: isEmpty,
        message: "Please enter gross income of yours.",
      },
      {
        validator: IsDecimal,
        message: "Please enter a valid number for gross income.",
      },
    ])
  );
  const age = useInput(
    "",
    createValidator([
      {
        validator: isEmpty,
        message: "Please enter your age.",
      },
      {
        validator: isNumber,
        message: "Please enter a valid number for your age.",
      },
      {
        validator: isMin,
        options: {
          min: 18,
        },
        message: "Please enter an age between (18-100).",
      },
      {
        validator: isMax,
        options: {
          max: 100,
        },
        message: "Please enter an age between (18-100).",
      },
    ])
  );

  //API
  const [fetchCalcTax, calculatedTax, calcTaxLoading] = useFetch(
    calculateTax(
      country.path,
      grossIncome.value,
      selectedTaxYear,
      selectedFilingStatus,
      selectedNoOfChilds,
      selectedProvinceOrState,
      age.value
    )
  );

  //Calculate Tax Handler
  const clickCalculateTaxHandler = (e) => {
    e.preventDefault();

    //Trigger Validation
    grossIncome.validation.validate();
    age.validation.validate();

    //Check For Errors
    if (!grossIncome.validation.touched || grossIncome.validation.error)
      return refGrossIncome.current.focus();
    else if (!age.validation.touched || age.validation.error)
      return refAge.current.focus();
    else if (!selectedTaxYear || selectedTaxYear === "")
      return refTaxYear.current.focus();
    else if (
      (!selectedFilingStatus || selectedFilingStatus === "") &&
      (country.country === "Ireland" ||
        country.country === "France" ||
        country.country === "Hong Kong" ||
        country.country === "America")
    )
      return refFilingStatus.current.focus();
    else if (
      (!selectedNoOfChilds || selectedNoOfChilds === "") &&
      (country.country === "France" || country.country === "Hong Kong") &&
      (selectedFilingStatus === "Married" ||
        selectedFilingStatus === "One Parent Family")
    )
      return refNoOfChilds.current.focus();
    else if (
      (!selectedProvinceOrState || selectedProvinceOrState === "") &&
      (country.country === "Canada" || country.country === "America")
    )
      return refProvincesOrStates.current.focus();

    //All Ok
    fetchCalcTax(
      null,
      (res) => {
        //Tax Info -> Response
        const taxInfo = res.taxInfo;

        //Set Results
        if (country.country === "Ireland") {
          setTaxResults([
            {
              title: "Gross Income",
              value: taxInfo.currency + taxInfo.gross_income,
            },
            {
              title: "Universal Social Charge (USC)",
              value: taxInfo.currency + taxInfo.usc,
            },
            {
              title: "Pay-Related Social Insurance (PRSI)",
              value: taxInfo.currency + taxInfo.prsi,
            },
            {
              title: "Total Deduction",
              value: taxInfo.currency + taxInfo.deduction,
            },
            {
              title: "Net Income",
              value: taxInfo.currency + taxInfo.net_income,
            },
          ]);
        } else if (country.country === "UK") {
          setTaxResults([
            {
              title: "Gross Income",
              value: taxInfo.currency + taxInfo.gross_income,
            },
            {
              title: "National Insurace Contributions (Class 1 NIC)",
              value: taxInfo.currency + taxInfo.nic,
            },
            {
              title: "Social And Health Care Levy",
              value: taxInfo.currency + taxInfo.levies,
            },
            {
              title: "Total Deduction",
              value: taxInfo.currency + taxInfo.deduction,
            },
            {
              title: "Net Income",
              value: taxInfo.currency + taxInfo.net_income,
            },
          ]);
        } else if (country.country === "Netherland") {
          setTaxResults([
            {
              title: "Gross Income",
              value: taxInfo.currency + taxInfo.gross_income,
            },
            {
              title: "General Tax Credit",
              value: taxInfo.currency + taxInfo.general_tax_credit,
            },
            {
              title: "Labour Tax Credit",
              value: taxInfo.currency + taxInfo.labour_tax_credit,
            },
            {
              title: "Total Deduction",
              value: taxInfo.currency + taxInfo.deduction,
            },
            {
              title: "Net Income",
              value: taxInfo.currency + taxInfo.net_income,
            },
          ]);
        } else if (country.country === "Nigeria") {
          setTaxResults([
            {
              title: "Gross Income",
              value: taxInfo.currency + taxInfo.gross_income,
            },
            {
              title: "Consolidated Relief Allowance",
              value: taxInfo.currency + taxInfo.cra,
            },
            {
              title: "Gross Income Relief",
              value: taxInfo.currency + taxInfo.gia,
            },
            {
              title: "National Housing Fund (NHF) Contributions",
              value: taxInfo.currency + taxInfo.nhf,
            },
            {
              title: "Pension Contributions",
              value: taxInfo.currency + taxInfo.pension,
            },
            {
              title: "Total Deduction",
              value: taxInfo.currency + taxInfo.deduction,
            },
            {
              title: "Net Income",
              value: taxInfo.currency + taxInfo.net_income,
            },
          ]);
        } else if (country.country === "Kenya") {
          setTaxResults([
            {
              title: "Gross Income",
              value: taxInfo.currency + taxInfo.gross_income,
            },
            {
              title: "National Social Security Fund (NSSF)",
              value: taxInfo.currency + taxInfo.nssf,
            },
            {
              title: "National Health Insurance Fund (NHIF)",
              value: taxInfo.currency + taxInfo.nhif,
            },
            {
              title: "Pay As You Earned (PAYE)",
              value: taxInfo.currency + taxInfo.paye,
            },
            {
              title: "Total Deduction",
              value: taxInfo.currency + taxInfo.deduction,
            },
            {
              title: "Net Income",
              value: taxInfo.currency + taxInfo.net_income,
            },
          ]);
        } else if (country.country === "South Africa") {
          setTaxResults([
            {
              title: "Gross Income",
              value: taxInfo.currency + taxInfo.gross_income,
            },
            {
              title: "Pay As You Earned (PAYE)",
              value: taxInfo.currency + taxInfo.paye,
            },
            {
              title: "Unemployment Insurance Fund (UIF)",
              value: taxInfo.currency + taxInfo.uif,
            },
            {
              title: "Total Deduction",
              value: taxInfo.currency + taxInfo.deduction,
            },
            {
              title: "Net Income",
              value: taxInfo.currency + taxInfo.net_income,
            },
          ]);
        } else if (country.country === "Serbia") {
          setTaxResults([
            {
              title: "Gross Income",
              value: taxInfo.currency + taxInfo.gross_income,
            },
            {
              title: "Tax",
              value: taxInfo.currency + taxInfo.tax,
            },
            {
              title: "Health Insurance Contribution",
              value: taxInfo.currency + taxInfo.health_insurance,
            },
            {
              title: "Pension Contribution",
              value: taxInfo.currency + taxInfo.pension,
            },
            {
              title: "Unemployment Insurance Contribution",
              value: taxInfo.currency + taxInfo.unemployment_insurance,
            },
            {
              title: "Total Deduction",
              value: taxInfo.currency + taxInfo.deduction,
            },
            {
              title: "Net Income",
              value: taxInfo.currency + taxInfo.net_income,
            },
          ]);
        } else if (country.country === "France") {
          setTaxResults([
            {
              title: "Gross Income",
              value: taxInfo.currency + taxInfo.gross_income,
            },
            {
              title: "Income Tax",
              value: taxInfo.currency + taxInfo.tax,
            },
            {
              title: "Surcharge Tax",
              value: taxInfo.currency + taxInfo.surcharges,
            },
            {
              title: "Contribution sociale généralisée (CSG)",
              value: taxInfo.currency + taxInfo.csg,
            },
            {
              title: "Contribution au remboursement de la dette sociale (CRDS)",
              value: taxInfo.currency + taxInfo.crds,
            },
            {
              title: "Total Deduction",
              value: taxInfo.currency + taxInfo.deduction,
            },
            {
              title: "Net Income",
              value: taxInfo.currency + taxInfo.net_income,
            },
          ]);
        } else if (country.country === "Hong Kong") {
          setTaxResults([
            {
              title: "Gross Income",
              value: taxInfo.currency + taxInfo.gross_income,
            },
            {
              title: "Taxable Income",
              value: taxInfo.currency + taxInfo.taxable_income,
            },
            {
              title: "Personal Allowance",
              value: taxInfo.currency + taxInfo.personal_allowance,
            },
            {
              title: "Child(ren) Allowance",
              value: taxInfo.currency + taxInfo.children_allowance,
            },
            {
              title: "Total Deduction",
              value: taxInfo.currency + taxInfo.deduction,
            },
            {
              title: "Net Income",
              value: taxInfo.currency + taxInfo.net_income,
            },
          ]);
        } else if (country.country === "Canada") {
          setTaxResults([
            {
              title: "Gross Income",
              value: taxInfo.currency + taxInfo.gross_income,
            },
            {
              title: "Federal Tax",
              value: taxInfo.currency + taxInfo.tax,
            },
            {
              title: "Provincial Tax",
              value: taxInfo.currency + taxInfo.tax_provincial,
            },
            {
              title: "Canada Pension Plan (CPP)",
              value: taxInfo.currency + taxInfo.cpp,
            },
            {
              title: "Employment Insurance (EI)",
              value: taxInfo.currency + taxInfo.ei,
            },
            {
              title: "Total Deduction",
              value: taxInfo.currency + taxInfo.deduction,
            },
            {
              title: "Net Income",
              value: taxInfo.currency + taxInfo.net_income,
            },
          ]);
        } else if (country.country === "America") {
          setTaxResults([
            {
              title: "Gross Income",
              value: taxInfo.currency + taxInfo.gross_income,
            },
            {
              title: "Federal Tax",
              value: taxInfo.currency + taxInfo.tax,
            },
            {
              title: "State Tax",
              value: taxInfo.currency + taxInfo.state_tax,
            },
            {
              title: "Social Security",
              value: taxInfo.currency + taxInfo.social_security,
            },
            {
              title: "Medicare",
              value: taxInfo.currency + taxInfo.medicare,
            },
            {
              title: "Federal Insurance Contribution Act (FICA)",
              value: taxInfo.currency + taxInfo.fica,
            },
            {
              title: "Total Deduction",
              value: taxInfo.currency + taxInfo.deduction,
            },
            {
              title: "Net Income",
              value: taxInfo.currency + taxInfo.net_income,
            },
          ]);
        }

        setErrorMessage("");
        setShowAlertError(false);
      },
      (err) => {
        setErrorMessage(err.message);
        setShowAlertError(true);
      }
    );
  };

  //Scroll into view on when tax results show up
  useEffect(() => {
    if (refResults.current) refResults.current.scrollIntoView();
  }, [taxResults]);

  return (
    <Wrapper>
      <Alert
        severety={"error"}
        open={showAlertError}
        title={"Error!"}
        message={errorMessage}
        onClose={() => setShowAlertError(false)}
      />
      <AnchorLink to="/">Select Different Country?</AnchorLink>
      <FormWrapper>
        <FormGroup>
          <HeadingWrapper>
            <Heading level={3}>{country.country} Tax Form</Heading>
          </HeadingWrapper>
        </FormGroup>
      </FormWrapper>
      <FormWrapper>
        <FormGroup>
          <Paragrah size="lead" color="primary">
            Enter your amount in ({country?.currency?.symbol})
          </Paragrah>
          <Input
            onChange={grossIncome.onChangeHandler}
            onBlur={grossIncome.onBlurHandler}
            value={grossIncome.value}
            error={grossIncome.validation.error}
            helpertext={grossIncome.validation.message}
            name="grossIncome"
            ref={refGrossIncome}
            label="Annual Gross Income"
            size="medium"
            color="primary"
          />
        </FormGroup>
      </FormWrapper>
      <FormWrapper>
        <FormGroup>
          <Paragrah size="lead" color="primary">
            What age did you turn in{" "}
            {selectedTaxYear
              ? selectedTaxYear.split("/")[0]
              : new Date(Date.now()).getFullYear()}
            ?
          </Paragrah>
          <Input
            onChange={age.onChangeHandler}
            onBlur={age.onBlurHandler}
            value={age.value}
            error={age.validation.error}
            helpertext={age.validation.message}
            name="age"
            ref={refAge}
            label="Age"
            size="medium"
            color="primary"
            type="number"
          />
        </FormGroup>
      </FormWrapper>
      <FormWrapper>
        <FormGroup>
          <Combobox
            ref={refTaxYear}
            size="large"
            label={"Tax Year"}
            placeholder={"Select Tax Year"}
            items={country.years}
            onChange={(e) => setSelectedTaxYear(e.target.value)}
          />
        </FormGroup>
      </FormWrapper>
      <FormWrapper>
        <FormGroup>
          {(country.country === "Ireland" ||
            country.country === "France" ||
            country.country === "Hong Kong" ||
            country.country === "America") && (
            <Combobox
              ref={refFilingStatus}
              size="large"
              label={"Filing Status"}
              placeholder={"Select Filing Status"}
              items={country.marrital_status}
              onChange={(e) => {
                setSelectedFilingStatus(e.target.value);
                e.target.value === "Single" && setSelectedNoOfChilds("");
              }}
            />
          )}
        </FormGroup>
      </FormWrapper>
      <FormWrapper>
        <FormGroup>
          {(country.country === "France" || country.country === "Hong Kong") &&
            (selectedFilingStatus === "Married" ||
              selectedFilingStatus === "One Parent Family") && (
              <Combobox
                ref={refNoOfChilds}
                size="large"
                label={"Childrens"}
                placeholder={"Number of childrens"}
                items={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
                onChange={(e) => setSelectedNoOfChilds(e.target.value)}
              />
            )}
        </FormGroup>
      </FormWrapper>
      <FormWrapper>
        <FormGroup>
          {(country.country === "Canada" || country.country === "America") && (
            <Combobox
              ref={refProvincesOrStates}
              size="large"
              label={country.country === "Canada" ? "Provinces" : "State"}
              placeholder={`Select ${
                country.country === "Canada" ? "Provinces" : "State"
              }`}
              items={country.provinces_or_states}
              onChange={(e) => setSelectedProvinceOrState(e.target.value)}
            />
          )}
        </FormGroup>
      </FormWrapper>
      <FormWrapper>
        <Button
          loading={calcTaxLoading}
          onClick={clickCalculateTaxHandler}
          size="medium"
          color="primary"
          variant="contained"
        >
          Calculate Tax
        </Button>
      </FormWrapper>

      {!showAlertError && calculatedTax?.status === "success" ? (
        <Results
          ref={refResults}
          taxInfo={taxResults}
          currency={country.currency.symbol}
        />
      ) : (
        ""
      )}
    </Wrapper>
  );
};

export default TaxCalculator;

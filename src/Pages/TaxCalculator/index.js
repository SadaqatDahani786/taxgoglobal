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
  gap: 20px;
`;

//Heading Wrapper
const HeadingWrapper = styled.div`
  text-align: center;
  text-transform: uppercase;
  padding: 25px 0;
`;

//Button Wrapper
const ButtonWrapper = styled.div``;

//AnchorLink
const AnchorLink = styled(Link)`
  align-self: flex-end;
  font-size: 1.6rem;
  text-decoration: none;
  color: var(--color-primary);
`;

/*
 ** **
 ** ** ** COMPONENT [TaxCalculator]
 ** **
 */
const TaxCalculator = () => {
  //State
  const [taxResults, setTaxResults] = useState([]);
  const [selectedTaxYear, setSelectedTaxYear] = useState("2022/23");
  const [selectedFilingStatus, setSelectedFilingStatus] = useState("Single");
  const [showAlertError, setShowAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const countries = getCountriesList();
  const [country, setCountry] = useState({});
  const Params = useParams();
  const Navigate = useNavigate();

  //If wrongo parameter, redirect to 404 page
  useEffect(() => {
    const ind = countries.findIndex((curr) => curr.path === Params.country);
    if (ind === -1) Navigate("/404");

    setCountry(countries[ind]);
  }, [Navigate, countries, Params]);

  //Refs
  const refGrossIncome = useRef(null);
  const refAge = useRef(null);

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
        validator: isMax,
        options: {
          max: 122,
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
    else if (
      country.country === "Ireland" &&
      (!age.validation.touched || age.validation.error)
    )
      return refAge.current.focus();

    //All Ok
    fetchCalcTax(
      null,
      (res) => {
        const taxInfo = res.taxInfo;
        if (country.country === "Ireland") {
          setTaxResults([
            {
              title: "Gross Income",
              value: taxInfo.currency + taxInfo.gross_income,
            },
            {
              title: "Net Income",
              value: taxInfo.currency + taxInfo.net_income,
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
      <HeadingWrapper>
        <Heading level={3}>{country.country} Tax Form</Heading>
      </HeadingWrapper>
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
      {country.country === "Ireland" && (
        <React.Fragment>
          <Paragrah size="lead" color="primary">
            How old are you?
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
          />
        </React.Fragment>
      )}
      <Combobox
        size="large"
        label={"Tax Year"}
        items={["2022/23", "2021/22", "2020/21", "2019/20", "2018/19"]}
        onChange={(e) => setSelectedTaxYear(e.target.value)}
      />
      {country.country === "Ireland" && (
        <Combobox
          size="large"
          label={"Filing Status"}
          items={["Single", "Married - One Income", "One Parent Family"]}
          onChange={(e) => setSelectedFilingStatus(e.target.value)}
        />
      )}
      <ButtonWrapper>
        <Button
          loading={calcTaxLoading}
          onClick={clickCalculateTaxHandler}
          size="medium"
          color="primary"
          variant="contained"
        >
          Calculate Tax
        </Button>
      </ButtonWrapper>

      {!showAlertError && calculatedTax?.status === "success" ? (
        <Results taxInfo={taxResults} />
      ) : (
        ""
      )}
    </Wrapper>
  );
};

export default TaxCalculator;

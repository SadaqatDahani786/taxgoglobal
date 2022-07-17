import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//UI Components
import Paragrah from "../../Components/Paragraph";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import Results from "../../Components/Results";
import Alert from "../../Components/Alert";

//Hooks & Functions
import useInput from "../../Hooks/useInput";
import useFetch from "../../Hooks/useFetch";
import { calculateTaxUS } from "../../API/api";
import { isEmpty, createValidator, IsDecimal } from "../../Helpers/validation";
import { getCountriesList } from "../../Helpers/utils";

/*
 ** **
 ** ** ** STYLED COMPONENTS
 ** **
 */
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

//Button Wrapper
const ButtonWrapper = styled.div``;

/*
 ** **
 ** ** ** COMPONENT [TaxCalculator]
 ** **
 */
const TaxCalculator = () => {
  //State
  const [showAlertError, setShowAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const countries = getCountriesList();
  const [country, setCountry] = useState({});
  const Params = useParams();
  const Navigate = useNavigate();

  useEffect(() => {
    const ind = countries.findIndex((curr) => curr.path === Params.country);
    if (ind === -1) Navigate("/404");

    setCountry(countries[ind]);
  }, [Navigate, countries, Params]);

  //Refs
  const refGrossIncome = useRef(null);

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

  //API
  const [fetchCalcTaxUS, calculatedTaxUs, calcTaxUSLoading] = useFetch(
    calculateTaxUS(grossIncome.value)
  );

  //Calculate Tax Handler
  const clickCalculateTaxHandler = (e) => {
    e.preventDefault();

    //Trigger Validation
    grossIncome.validation.validate();

    //Check For Errors
    if (!grossIncome.validation.touched || grossIncome.validation.error)
      return refGrossIncome.current.focus();

    //All Ok
    fetchCalcTaxUS(
      null,
      (res) => {
        console.log(res);
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
        label="Gross Income"
        size="medium"
        color="primary"
      />
      <ButtonWrapper>
        <Button
          loading={calcTaxUSLoading}
          onClick={clickCalculateTaxHandler}
          size="medium"
          color="primary"
          variant="contained"
        >
          Calculate Tax
        </Button>
      </ButtonWrapper>

      {!showAlertError && calculatedTaxUs?.taxInfo ? (
        <Results taxInfo={calculatedTaxUs?.taxInfo} />
      ) : (
        ""
      )}
    </Wrapper>
  );
};

export default TaxCalculator;

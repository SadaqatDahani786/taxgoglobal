import Input from "../../Components/Input";
import styled from "styled-components";

//UI Components
import Paragrah from "../../Components/Paragraph";
import Button from "../../Components/Button";

//Hooks & Functions
import useInput from "../../Hooks/useInput";
import { isEmpty, createValidator, IsDecimal } from "../../Helpers/validation";
import { useRef } from "react";

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

  //Calculate Tax Handler
  const clickCalculateTaxHandler = (e) => {
    e.preventDefault();

    //Trigger Validation
    grossIncome.validation.validate();

    //Check For Errors
    if (!grossIncome.validation.touched || grossIncome.validation.error)
      return refGrossIncome.current.focus();

    //All Ok
    alert("Tax Calulating");
  };

  return (
    <Wrapper>
      <Paragrah size="lead" color="primary">
        Enter your amount in ($)
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
          onClick={clickCalculateTaxHandler}
          size="medium"
          color="primary"
          variant="contained"
        >
          Calculate Tax
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default TaxCalculator;

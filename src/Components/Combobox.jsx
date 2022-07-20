import React from "react";
import styled from "styled-components";

/*
 ** **
 ** ** ** STYLED COMPONENTS
 ** **
 */
//Wrapper
const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  & > label {
    flex: 0 1 20%;
  }
  & > select {
    flex-grow: 1;
  }
`;

//Combobox
const ComboboxStyled = styled.select`
  background-color: var(--color-tertiary);
  border: 1px solid var(--color-primary-alpha);
  padding: ${({ size }) =>
    (size === "small" && "0.5rem 1.5rem") ||
    (size === "medium" && "1rem 1.5rem") ||
    (size === "large" && "1.4rem 1.5rem")};
  color: var(--color-primary);
  width: 15rem;
  width: ${({ block }) => block && "100%"};
`;

//Combobox Item
const ComboboxItem = styled.option`
  text-transform: capitalize;
`;

//Label
const Label = styled.label`
  font-size: 1.2rem;
  color: var(--color-primary);
`;

/*
 ** **
 ** ** ** COMPONENT [Combobox]
 ** **
 */
const Combobox = ({
  size = "medium",
  items = [],
  dataset,
  label,
  block = false,
  value,
  onChange,
}) => {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <ComboboxStyled
        size={size}
        {...dataset}
        block={block}
        value={value}
        onChange={onChange}
      >
        {items.map((item, ind) => (
          <ComboboxItem key={ind}>{item}</ComboboxItem>
        ))}
      </ComboboxStyled>
    </Wrapper>
  );
};

export default Combobox;

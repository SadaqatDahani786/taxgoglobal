import styled from "styled-components";

/*
 ** **
 ** ** ** STYLED COMPONENTS
 ** **
 */
//Wrapper
const Wrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

//Table Styled
const TableStyled = styled.table`
  width: 100%;
  table-layout: auto;
  background-color: var(
    ${({ color }) =>
      (color === "primary" && "--color-secondary") ||
      (color === "secondary" && "--color-tertiary") ||
      (color === "tertiary" && "--color-primary")}
  );
  border: 1px solid var(--color-primary);
  border-collapse: collapse;
`;

//Th
const Th = styled.th`
  border-bottom: 1px solid var(--color-primary);
  padding: 1.5rem 0.5rem;
  text-align: left;
  font-size: 1.6rem;
  color: var(
    ${({ color }) =>
      (color === "primary" && "--color-secondary") ||
      (color === "secondary" && "--color-primary") ||
      (color === "tertiary" && "--color-primary")}
  );
  background-color: var(
    ${({ color }) =>
      (color === "primary" && "--color-primary") ||
      (color === "secondary" && "--color-secondary-alpha") ||
      (color === "tertiary" && "--color-tertiary")}
  );
`;

//Tr
const Tr = styled.tr`
  &:nth-child(even) {
    background-color: var(
      ${({ color }) =>
        (color === "primary" && "--color-primary-alpha") ||
        (color === "secondary" && "--color-secondary-alpha") ||
        (color === "tertiary" && "--color-tertiary-alpha")}
    );
  }
`;

//Td
const Td = styled.td`
  padding: 0.5rem;
  font-size: 1.5rem;
  text-transform: capitalize;
  color: var(
    ${({ color }) =>
      (color === "primary" && "--color-primary") ||
      (color === "secondary" && "--color-primary") ||
      (color === "tertiary" && "--color-secondary")}
  );
`;

/*
 ** **
 ** ** ** COMPONENT [Table]
 ** **
 */
const Table = ({ color = "primary", rows = [], cols = [] }) => {
  return (
    <Wrapper>
      <TableStyled>
        <thead>
          <Tr color={color}>
            {cols.map((col, ind) => (
              <Th color={color} key={ind}>
                {col.heading}
              </Th>
            ))}
          </Tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <Tr color={color}>
              {cols.map((col, j) => (
                <Td color={color} key={i + j}>
                  {row[col["field"]]}
                </Td>
              ))}
            </Tr>
          ))}
        </tbody>
      </TableStyled>
    </Wrapper>
  );
};

export default Table;

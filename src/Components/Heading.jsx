import styled from "styled-components";

/*
 ** **
 ** ** ** STYLED COMPONENTS
 ** **
 */
//Display 1
const Display1 = styled.h1`
  font-size: 2.4rem;
  color: var(
    ${({ color }) =>
      (color === "primary" && "--color-primary") ||
      (color === "secondary" && "--color-secondary") ||
      (color === "tertiary" && "--color-tertiary")}
  );
`;

//Display 2
const Display2 = styled.h2`
  font-size: 2rem;
  color: var(
    ${({ color }) =>
      (color === "primary" && "--color-primary") ||
      (color === "secondary" && "--color-secondary") ||
      (color === "tertiary" && "--color-tertiary")}
  );
`;

//Display 3
const Display3 = styled.h3`
  font-size: 1.8rem;
  color: var(
    ${({ color }) =>
      (color === "primary" && "--color-primary") ||
      (color === "secondary" && "--color-secondary") ||
      (color === "tertiary" && "--color-tertiary")}
  );
`;

//Display 4
const Display4 = styled.h3`
  font-size: 1.6rem;
  color: var(
    ${({ color }) =>
      (color === "primary" && "--color-primary") ||
      (color === "secondary" && "--color-secondary") ||
      (color === "tertiary" && "--color-tertiary")}
  );
`;

/*
 ** **
 ** ** ** COMPONENT [Heading]
 ** **
 */
const Heading = ({ level = 1, color = "primary", children }) => {
  return (
    (level === 1 && <Display1 color={color}>{children}</Display1>) ||
    (level === 2 && <Display2 color={color}>{children}</Display2>) ||
    (level === 3 && <Display3 color={color}>{children}</Display3>) ||
    (level === 4 && <Display4 color={color}>{children}</Display4>)
  );
};

export default Heading;

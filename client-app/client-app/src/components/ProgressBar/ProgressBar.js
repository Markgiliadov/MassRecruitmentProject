import React from "react";
import PropType from "prop-types";
import Styled from "styled-components";

const Container = Styled.div`
progress{
    margin-right: 8px;
}
`;

const ProgressBar = ({ value, max }) => {
  return (
    <Container>
      <progress value={value} max={max} />
      <span>{(value / max) * 100}%</span>
    </Container>
  );
};
ProgressBar.PropType = {
  value: PropType.number.isRequired,
  max: PropType.number,
};
ProgressBar.defaltProps = {
  max: 100,
};
export default ProgressBar;

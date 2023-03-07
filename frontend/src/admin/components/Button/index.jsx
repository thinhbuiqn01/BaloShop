import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import { Button } from "antd";

const ButtonBase = styled(Button)`
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  outline: none !important;
  span:last-child {
    line-height: none;
    margin-inline-start: 0 !important;
  }
`;
function Index(props) {
  return <ButtonBase {...props}>{props.children}</ButtonBase>;
}

export default Index;

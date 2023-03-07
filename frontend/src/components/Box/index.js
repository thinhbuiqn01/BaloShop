import styled from "styled-components";
import React from "react";
import {
  background,
  border,
  color,
  compose,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  typography,
} from "styled-system";

const BaseBox = styled.div(
  compose(
    space,
    color,
    layout,
    typography,
    flexbox,
    grid,
    background,
    border,
    position,
    shadow
  )
);

const Box = ({ children, ...rest }) => <BaseBox {...rest}>{children}</BaseBox>;

export default Box;

import React from "react";
import Box from "../../../components/Box";

function H1(props) {
  return (
    <Box color="#1677ff" fontSize="22px" fontWeight="bold" {...props}>
      {props.children}
    </Box>
  );
}

export default H1;

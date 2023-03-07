import React from "react";
import Main from "../../../admin/components/layout/Main";

function Index({ children }) {
  console.log("v");
  return <Main>{children}</Main>;
}

export default Index;

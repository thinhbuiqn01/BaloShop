import { useState } from "react";

export function useToggleValue() {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
    console.log(toggle);
  };
  return [toggle, handleToggle];
}

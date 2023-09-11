import React from "react";
import { Button } from "../../StyledComponents/Button-styles";

export const SharedButtons = ({ active, text, onClick }) => {
  return (
    <Button className={active ? "active" : ""} onClick={onClick}>
      {text}
    </Button>
  );
};

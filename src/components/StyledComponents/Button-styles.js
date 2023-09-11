import { NavLink } from "react-router-dom";

import styled, { css } from "styled-components";

const blockButtonStyles = css`
  background-color: rgb(53, 162, 159);
  color: white;
  box-shadow: 0 2px 0 0 rgba(55, 59, 63, 0.5);

  &:hover {
    background-color: rgb(73, 182, 179);
    cursor: pointer;
  }
`;

const orangeButtonStyles = css`
  background-color: rgb(255, 163, 111);
  color: white;

  &:hover {
    background-color: rgb(73, 182, 179);
    cursor: pointer;
  }
`;

const defaultButtonStyles = css`
  background-color: white;
  color: rgb(53, 162, 159);

  &:hover {
    background-color: white;
    color: rgb(73, 182, 179);
    cursor: pointer;
  }
`;

const getButtonStyles = (props) => {
  if (props.variant === "block") {
    return blockButtonStyles;
  }
  if (props.variant === "orange") {
    return orangeButtonStyles;
  }
  return defaultButtonStyles;
};

export const BlockButton = styled(NavLink)`
  text-decoration: none;
  padding: 0.8rem;
  border-radius: 5px;
  margin-left: 5px;
  ${getButtonStyles};
`;

export const Button = styled.button`
  padding: 0.8rem;
  background-color: ${(props) =>
    props.variant === "orange" ? "rgb(255, 133, 81)" : "rgb(7, 25, 82)"};
  margin: 2%;
  border-radius: 5px;
  color: white;

  &:hover {
    background-color: ${(props) =>
      props.variant === "orange" ? "rgb(255, 163, 111)" : "rgb(37, 55, 112)"};
  }
  &:active {
    background-color: ${(props) =>
      props.variant === "orange" ? "rgb(255, 163, 111)" : "rgb(37, 55, 112)"};
    cursor: pointer;
  }
`;

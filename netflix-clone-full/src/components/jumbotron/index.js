import React from "react";
import {
  Container,
  Inner,
  Item,
  Title,
  SubTitle,
  Image,
  Pane,
} from "./styles/jumbotron";

const Jumbotron = ({ direction = "row", children, ...restProps }) => {
  return (
    <Item {...restProps}>
      <Inner direction={direction}>{children}</Inner>
    </Item>
  );
};

Jumbotron.Container = ({ children, ...restProps }) => {
  return <Container {...restProps}>{children}</Container>;
};

Jumbotron.Pane = ({ children, ...restProps }) => {
  return <Pane {...restProps}>{children}</Pane>;
};

Jumbotron.Title = ({ children, ...restProps }) => {
  return <Title {...restProps}>{children}</Title>;
};

Jumbotron.SubTitle = ({ children, ...restProps }) => {
  return <SubTitle {...restProps}>{children}</SubTitle>;
};

Jumbotron.Image = ({ children, ...restProps }) => {
  return <Image {...restProps} />;
};

export default Jumbotron;

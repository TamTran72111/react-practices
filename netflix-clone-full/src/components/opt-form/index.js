import React from "react";
import { Container, Input, Break, Button, Text } from "./styles/opt-form";

const OptForm = ({ children, ...restProps }) => {
  return <Container {...restProps}>{children}</Container>;
};

OptForm.Input = function OptFormInput({ ...restProps }) {
  return <Input {...restProps} />;
};

OptForm.Button = ({ children, ...restProps }) => (
  <Button {...restProps}>
    {children} <img src="/images/icons/chevron-right.png" alt="Try Now" />
  </Button>
);

OptForm.Text = ({ children, ...restProps }) => (
  <Text {...restProps}>{children}</Text>
);

OptForm.Break = (props) => <Break {...props} />;
export default OptForm;

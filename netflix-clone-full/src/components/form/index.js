import React from "react";
import {
  Container,
  Error,
  TextSmall,
  Title,
  Text,
  Link,
  Input,
  Submit,
  Base,
} from "./styles/form";

const Form = ({ children, ...restProps }) => {
  return <Container {...restProps}>{children}</Container>;
};

Form.Base = ({ children, ...restProps }) => (
  <Base {...restProps}>{children}</Base>
);

Form.Error = ({ children, ...restProps }) => (
  <Error {...restProps}>{children}</Error>
);

Form.Title = ({ children, ...restProps }) => (
  <Title {...restProps}>{children}</Title>
);

Form.Text = ({ children, ...restProps }) => (
  <Text {...restProps}>{children}</Text>
);

Form.TextSmall = ({ children, ...restProps }) => (
  <TextSmall {...restProps}>{children}</TextSmall>
);

Form.Link = ({ children, ...restProps }) => (
  <Link {...restProps}>{children}</Link>
);

Form.Input = (props) => <Input {...props} />;

Form.Submit = ({ children, ...restProps }) => (
  <Submit {...restProps}>{children}</Submit>
);

export default Form;

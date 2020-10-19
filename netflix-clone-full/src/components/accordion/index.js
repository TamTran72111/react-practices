import React, { useState, useContext, createContext } from "react";
import {
  Container,
  Frame,
  Title,
  Item,
  Inner,
  Header,
  Body,
} from "./styles/accordion";

const ToggleContext = createContext();

export default function Accordion({ children, ...restProps }) {
  return (
    <Container {...restProps}>
      <Inner>{children}</Inner>
    </Container>
  );
}

Accordion.Title = ({ children, ...restProps }) => {
  return <Title {...restProps}>{children}</Title>;
};

Accordion.Frame = ({ children, ...restProps }) => {
  return <Frame {...restProps}>{children}</Frame>;
};

Accordion.Item = function AccordionItem({ children, ...restProps }) {
  const [show, setShow] = useState(false);
  const setToggle = () => {
    setShow((prevShow) => !prevShow);
  };
  return (
    <ToggleContext.Provider value={{ toggle: show, setToggle }}>
      <Item {...restProps}>{children}</Item>
    </ToggleContext.Provider>
  );
};

Accordion.Header = function AccordionHeader({ children, ...restProps }) {
  const { toggle, setToggle } = useContext(ToggleContext);

  return (
    <Header onClick={setToggle} {...restProps}>
      {children}
      {toggle ? (
        <img src="/images/icons/close-slim.png" alt="Close" />
      ) : (
        <img src="/images/icons/add.png" alt="Open" />
      )}
    </Header>
  );
};

Accordion.Body = function AccordionBody({ children, ...restProps }) {
  const { toggle } = useContext(ToggleContext);
  return toggle ? <Body {...restProps}>{children}</Body> : null;
};

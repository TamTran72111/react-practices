import React, { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

import {
  Background,
  ButtonLink,
  Container,
  Logo,
  Feature,
  FeatureCallOut,
  Text,
  Picture,
  Group,
  Link,
  Profile,
  Dropdown,
  SearchIcon,
  Search,
  SearchInput,
  PlayButton,
} from "./styles/header";

const Header = ({ bg = true, children, ...restProps }) => {
  return bg ? (
    <Background data-testid="header-bg" {...restProps}>
      {children}
    </Background>
  ) : (
    children
  );
};

Header.Feature = ({ children, ...restProps }) => (
  <Feature {...restProps}>{children}</Feature>
);

Header.FeatureCallOut = ({ children, ...restProps }) => (
  <FeatureCallOut {...restProps}>{children}</FeatureCallOut>
);

Header.Text = ({ children, ...restProps }) => (
  <Text {...restProps}>{children}</Text>
);

Header.Dropdown = ({ children, ...restProps }) => (
  <Dropdown {...restProps}>{children}</Dropdown>
);

Header.PlayButton = ({ children, ...restProps }) => (
  <PlayButton {...restProps}>{children}</PlayButton>
);

Header.Search = function HeaderSearch({
  searchTerm,
  setSearchTerm,
  ...restProps
}) {
  const [searchActive, setSearchActive] = useState(false);
  return (
    <Search {...restProps}>
      <SearchIcon
        data-testid="search-click"
        onClick={() => setSearchActive((searchActive) => !searchActive)}
      >
        <img src="images/icons/search.png" alt="search" />
      </SearchIcon>
      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search films and series"
        active={searchActive}
        data-testid="search-input"
      />
    </Search>
  );
};

Header.TextLink = ({ children, ...restProps }) => (
  <Link {...restProps}>{children}</Link>
);

Header.Frame = ({ children, ...restProps }) => (
  <Container {...restProps}>{children}</Container>
);

Header.Group = ({ children, ...restProps }) => (
  <Group {...restProps}>{children}</Group>
);

Header.Profile = ({ children, ...restProps }) => (
  <Profile {...restProps}>{children}</Profile>
);

Header.ButtonLink = ({ children, ...restProps }) => (
  <ButtonLink {...restProps}>{children}</ButtonLink>
);

Header.Picture = ({ src, ...restProps }) => (
  <Picture {...restProps} src={`/images/users/${src}.png`} />
);

Header.Logo = ({ to, ...restProps }) => (
  <ReactRouterLink to={to}>
    <Logo {...restProps} />
  </ReactRouterLink>
);

export default Header;

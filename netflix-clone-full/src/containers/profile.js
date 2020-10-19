import React from "react";
import Header from "../components/header";
import Profiles from "../components/profiles";
import { HOME } from "../constants/routes";
import logo from "../logo.svg";

const SelectProfileContainer = ({ user, setProfile }) => {
  return (
    <>
      <Header bg={false}>
        <Header.Frame>
          <Header.Logo to={HOME} src={logo} alt="Netflix" />
        </Header.Frame>
      </Header>

      <Profiles>
        <Profiles.Title>Who's watching?</Profiles.Title>
        <Profiles.List>
          <Profiles.User
            data-testid="user-profile"
            onClick={() => {
              setProfile({
                displayName: user.displayName,
                photoURL: user.photoURL,
              });
            }}
          >
            <Profiles.Picture src={user.photoURL} />
            <Profiles.Name>{user.displayName}</Profiles.Name>
          </Profiles.User>
        </Profiles.List>
      </Profiles>
    </>
  );
};

export default SelectProfileContainer;

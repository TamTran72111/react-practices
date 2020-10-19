import React from "react";
import { LockBody, Picture, Spinner, ReleaseBody } from "./styles/loading";

const Loading = ({ src, ...restProps }) => {
  return (
    <Spinner data-testid="loading">
      <LockBody />
      <Picture src={`/images/users/${src}.png`} data-testid="loading-picture" />
    </Spinner>
  );
};

Loading.ReleaseBody = () => <ReleaseBody />;

export default Loading;

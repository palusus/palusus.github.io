import React from "react";
import { Spinner } from "@patternfly/react-core";

const Loading = () => (
  <div style={{ float: "right" }}>
    Profile loading <Spinner size={"lg"}/>
  </div>
);

export default Loading;

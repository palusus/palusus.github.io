import React from "react";
import { Title, Button, EmptyState, EmptyStateVariant, EmptyStateIcon, EmptyStateBody, EmptyStateSecondaryActions } from "@patternfly/react-core";
import { CubesIcon } from "@patternfly/react-icons";

const SimpleEmptyState = ( {setView} ) => (
  <EmptyState variant={EmptyStateVariant.full}>
    <EmptyStateIcon icon={CubesIcon} />
    <Title headingLevel="h5" size="lg">
      No countries selected yet
    </Title>
    <EmptyStateBody>
      You can quickly select countries in compact table on the left side. For more possibilites go to the full Table.
    </EmptyStateBody>
      <Button onClick={() => setView("table")}>Show me the full Table</Button>
  </EmptyState>
);

export default SimpleEmptyState;

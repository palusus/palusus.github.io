import React, { ReactFragment, useState } from "react";
import {
  Drawer,
  DrawerPanelContent,
  DrawerContent,
  DrawerContentBody,
  DrawerPanelBody,
  DrawerHead,
  DrawerActions,
  DrawerCloseButton,
  Button
} from "@patternfly/react-core";

const DrawerInlineContentPanelLeft = (drawer, panel) => {
  const [isExpanded, setExpanded] = useState(false);
  const onClick = () => setExpanded(!isExpanded);

  const onCloseClick = () => setExpanded(false);

  const panelContent = panel ? (
    panel
  ) : (
    <DrawerPanelContent>
      <DrawerHead>
        <span>drawer-panel</span>
        <DrawerActions>
          <DrawerCloseButton onClick={this.onCloseClick} />
        </DrawerActions>
      </DrawerHead>
    </DrawerPanelContent>
  );

  const drawerContent =
    drawer !== undefined
      ? drawer
      : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium est a porttitor vehicula. Quisque vel commodo urna. Morbi mattis rutrum ante, id vehicula ex accumsan ut. Morbi viverra, eros vel porttitor facilisis, eros purus aliquet erat,nec lobortis felis elit pulvinar sem. Vivamus vulputate, risus eget commodo eleifend, eros nibh porta quam, vitae lacinia leo libero at magna. Maecenas aliquam sagittis orci, et posuere nisi ultrices sit amet. Aliquam ex odio, malesuada sed posuere quis, pellentesque at mauris. Phasellus venenatis massa ex, eget pulvinar libero auctor pretium. Aliquam erat volutpat. Duis euismod justo in quam ullamcorper, in commodo massa vulputate.";

  return (
    <React.Fragment>
      <Button onClick={onClick}>Toggle Drawer</Button>
      <Drawer isExpanded={isExpanded} isInline position="left">
        <DrawerContent panelContent={panelContent}>
          <DrawerContentBody>{drawerContent}</DrawerContentBody>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
};

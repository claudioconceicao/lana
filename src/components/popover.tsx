import React from "react";
import { Button, PopoverBody, UncontrolledPopover } from "reactstrap";

function Example() {
  return (
    <>
      <Button id="Popover1">Default popover</Button>
      <UncontrolledPopover placement="bottom" target="Popover1">
        <PopoverBody>This is a very beautiful popover, show some love.</PopoverBody>
      </UncontrolledPopover>
    </>
  );
}

export default Example;
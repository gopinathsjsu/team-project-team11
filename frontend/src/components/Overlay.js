import React from 'react';
import { GridOverlay } from '@material-ui/data-grid';

const CustomNoRowsOverlay = () => {
  return (
    <GridOverlay>
      You have no new requests to approve
    </GridOverlay>
  );
};

export default CustomNoRowsOverlay;

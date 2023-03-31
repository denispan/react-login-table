import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { randomId } from '@mui/x-data-grid-generator';
import {
  GridRowModes, GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer
} from '@mui/x-data-grid-pro';
import React from 'react';

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}


export const EditToolbar = (props: EditToolbarProps) => {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' }
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon/>} onClick={handleClick}>
        Добавить запись
      </Button>
    </GridToolbarContainer>
  );
};

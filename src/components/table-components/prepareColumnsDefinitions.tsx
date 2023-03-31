import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
  GridActionsCellItem,
  GridColDef, GridRowId,
  GridRowModes, GridRowModesModel
} from '@mui/x-data-grid-pro';
import React from 'react';

type IData = {
  rowModesModel: GridRowModesModel
  handleSaveClick: (id: GridRowId) => any
  handleCancelClick: (id: GridRowId) => any
  handleEditClick: (id: GridRowId) => any
  handleDeleteClick: (id: GridRowId) => any
}
export const prepareColumnsDefinitions = ({
                                           rowModesModel,
                                           handleSaveClick,
                                           handleCancelClick,
                                           handleEditClick,
                                           handleDeleteClick
                                         }: IData): GridColDef[] => [
  {
    field: 'companySignatureName',
    headerName: 'Название компании',
    width: 150,
    editable: true
  },
  {
    field: 'companySigDate',
    headerName: 'Дата регистрации',
    width: 190,
    type: 'dateTime',
    valueGetter:  (params) => new Date(params.row.companySigDate),
    editable: true
  },
  {
    field: 'documentName',
    headerName: 'Имя документа',
    width: 150,
    editable: true
  },
  {
    field: 'documentStatus',
    headerName: 'Статус документа',
    width: 150,
    editable: true
  },
  {
    field: 'documentType',
    headerName: 'Тип документа',
    width: 150,
    editable: true
  },
  {
    field: 'employeeNumber',
    headerName: 'Номер сотрудника',
    width: 150,
    editable: true
  },
  {
    field: 'employeeSigDate',
    headerName: 'Дата подписания',
    width: 190,
    type: 'dateTime',
    valueGetter:  (params) => new Date(params.row.employeeSigDate),
    editable: true
  },
  {
    field: 'employeeSignatureName',
    headerName: 'Подписанный документ',
    width: 150,
    editable: true
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Действие',
    width: 100,
    cellClassName: 'actions',
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon/>}
            label="Save"
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            icon={<CancelIcon/>}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(id)}
            color="inherit"
          />
        ];
      }

      return [
        <GridActionsCellItem
          icon={<EditIcon/>}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon/>}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />
      ];
    }
  }
];

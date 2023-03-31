import { AlertProps } from '@mui/material';
import {
  GridEventListener, GridRowId, GridRowModes,
  GridRowModesModel,
  GridRowParams,
  MuiEvent
} from '@mui/x-data-grid-pro';
import React, { useEffect, useState } from 'react';
import { dataType } from '../../services/IFetchUserDocsResponse';
import UserDocsService from '../../services/userDocsService';

export const useDocsTable = () => {
  const [snackbar, setSnackbar] = useState<Pick<AlertProps,
    'children' | 'severity'> | null>(null);
  const [rows, setRows] = useState<dataType[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleCloseSnackbar = () => setSnackbar(null);
  const showLoaderSnackbar = () => setSnackbar({children:"Loading....", severity:"info"})

  useEffect(() => {
    const getTableData = async () => {
      showLoaderSnackbar();
      await new Promise(r => setTimeout(r, 1000));
      const tableData = await UserDocsService.fetchTableData();
      handleCloseSnackbar();
      // console.log(tableData);
      setRows(tableData);
    };
    getTableData();
  }, []);


  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    event.defaultMuiPrevented = true;
    console.log('handleRowEditStop');
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => async () => {
    await setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View }
    });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    try {
      showLoaderSnackbar();
      await new Promise(r => setTimeout(r, 2000));
      await UserDocsService.deleteRowTable(id);
      setRows(rows.filter((row) => row.id !== id));
      setSnackbar({ children: 'Данные успешно удалены', severity: 'success' });
    } catch (e) {
      setSnackbar({ children: 'Ошибка удаления данных', severity: 'error' });
    }
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const onProcessRowUpdateError = async (error: Error) => {
    console.log('onProcessRowUpdateError', error);
    setSnackbar({ children: error.message, severity: 'error' });
  };

  const processRowUpdate = async (newRow: dataType) => {
    const isNew = newRow.isNew;
    const updatedRow = { ...newRow, isNew: undefined };
    console.log('processRowUpdate');
    console.log('isNew', isNew);

    if (!(updatedRow.documentName && updatedRow.documentStatus)) {
      throw new Error('Данные не загружены на сервер. Поля <Имя документа> и <Статус документа> обязательны для заполнения')
    }

    try {
      showLoaderSnackbar();
      await new Promise(r => setTimeout(r, 2000));
      let serverResponse;
      if (isNew) {
        serverResponse = await UserDocsService.addRowTable(updatedRow);
        console.log(serverResponse);
      } else {
        serverResponse = await UserDocsService.setRowTable(updatedRow.id, updatedRow);
      }
      const tableData = serverResponse.data.data;
      console.log('tableData', tableData);
      setRows(rows.map((row) => (row.id === newRow.id ? tableData : row)));
      console.log('setRows');
      setSnackbar({ children: 'Данные успешно сохранены в таблице', severity: 'success' });
      return tableData;
    } catch (e: any) {
      console.log(123, e);
      console.log('e.response.data', e.response.data);
      throw new Error('Данные не загружены на сервер. Поля <Имя документа> и <Статус документа> обязательны для заполнения');
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  return {
    rows,
    rowModesModel,
    setRows, setRowModesModel,
    handleRowEditStart,
    handleRowEditStop,
    handleEditClick,
    onProcessRowUpdateError,
    snackbar,
    setSnackbar,
    handleCloseSnackbar,
    handleSaveClick,
    handleDeleteClick,
    handleCancelClick,
    processRowUpdate,
    handleRowModesModelChange
  };
};

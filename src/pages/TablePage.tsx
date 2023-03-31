import { Alert, Snackbar } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGridPro } from '@mui/x-data-grid-pro';
import React, { FC } from 'react';
import Header from '../components/header/Header';
import { EditToolbar } from '../components/table-components/EditToolbar';
import {
  prepareColumnsDefinitions
} from '../components/table-components/prepareColumnsDefinitions';
import { useDocsTable } from '../components/table-components/useDocsTable';
import styles from '../styles/TablePage.module.scss';


const TablePage: FC = () => {
  const {
    handleRowEditStart,
    handleRowEditStop,
    handleEditClick,
    handleSaveClick,
    handleDeleteClick,
    handleCancelClick,
    processRowUpdate,
    onProcessRowUpdateError,
    handleRowModesModelChange,
    rows,
    rowModesModel,
    setRows, setRowModesModel,
    snackbar,
    handleCloseSnackbar
  } = useDocsTable();

  const columns = prepareColumnsDefinitions({
    rowModesModel,
    handleSaveClick,
    handleCancelClick,
    handleEditClick,
    handleDeleteClick
  });
  return (
    <>
      <Header/>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Документы в работе</h1>
        <Box
          sx={{
            height: 500,
            width: '100%',
            '& .actions': {
              color: 'text.secondary'
            },
            '& .textPrimary': {
              color: 'text.primary'
            }
          }}
        >
          <DataGridPro
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            onProcessRowUpdateError={onProcessRowUpdateError}
            processRowUpdate={processRowUpdate}
            slots={{
              toolbar: EditToolbar
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel }
            }}
          />
          {!!snackbar && (
            <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={3000}
                      sx={{ height: '100%' }}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                      }}>
              <Alert {...snackbar} onClose={handleCloseSnackbar}/>
            </Snackbar>
          )}
        </Box>
      </div>

    </>

  );
};

export default TablePage;

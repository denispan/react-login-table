import { AxiosResponse } from 'axios';
import $api from './api';
import {
  dataType,
  IFetchUserDocsResponse,
  ICreateUserDocResponse
} from './IFetchUserDocsResponse';
import { GridRowId } from '@mui/x-data-grid-pro';


export default class UserDocsService {
  static fetchTableData(): Promise<dataType[]> {
    return $api.get<IFetchUserDocsResponse>('/ru/data/v3/testmethods/docs/userdocs/get')
      .then((response) => response.data.data);
  }

  static addRowTable(dataNew: {}): Promise<AxiosResponse<ICreateUserDocResponse>> {
    return $api.post<ICreateUserDocResponse>('/ru/data/v3/testmethods/docs/userdocs/create', dataNew);
  }

  static deleteRowTable(id: GridRowId): Promise<AxiosResponse<IFetchUserDocsResponse>> {
    return $api.post<IFetchUserDocsResponse>(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`);
  }

  static setRowTable(id: GridRowId, dataNew: {}): Promise<AxiosResponse<ICreateUserDocResponse>> {
    return $api
      .post<ICreateUserDocResponse>(`/ru/data/v3/testmethods/docs/userdocs/set/${id}`, dataNew)
  }
}

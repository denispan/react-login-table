export interface IFetchUserDocsResponse {
    data: dataType[];
    error_code: number;
    error_message: string;
}
export interface ICreateUserDocResponse {
    data: dataType;
    error_code: number;
    error_message: string;
}

export type dataType = {
    isNew?: boolean;
    id: string;
    companySigDate: string;
    companySignatureName: string;
    documentName: string;
    documentStatus: string;
    documentType: string;
    employeeNumber: string;
    employeeSigDate: string;
    employeeSignatureName: string;
}



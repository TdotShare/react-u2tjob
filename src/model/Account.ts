export interface Account {
    id: number;
    idcard: string
    banned : string;
}

export type APIAccount_data = {
    bypass: boolean,
    data: Account,
    status : string,
    message : string
}
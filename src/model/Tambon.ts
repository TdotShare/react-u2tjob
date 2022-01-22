export interface Tambon {
    id : number;
    name: string;
    create_at : string;
    update_at : string;
}


export type APITambon_data = {
    bypass: boolean,
    data: Tambon,
    status : string,
    message : string
}
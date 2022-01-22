interface Auth {
    id: number;
    idcard: string
    username : string;
    firstname : string;
    surname : string;
    email : string;
    admin : boolean;
    role : number;
    token : string;
}

export type APIAuth_data = {
    bypass: boolean,
    data: Auth,
    status : string,
    message : string
}
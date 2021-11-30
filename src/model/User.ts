interface Auth {
    user_id: number;
    card_id: string;
    token : string;
}

export type APIAuth_data = {
    bypass: boolean,
    data: Auth,
    status : string,
    message : string
}
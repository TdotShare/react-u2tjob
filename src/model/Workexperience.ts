export interface Workexperience {
    id : number;
    user_id : number;
    workplace: string;
    position: string;
    salary : string;
    duration : string;
    note : string;
}

export type APIWorkexperience_data = {
    bypass: boolean,
    data: Workexperience,
    status : string,
    message : string
}
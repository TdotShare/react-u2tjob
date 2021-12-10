export interface Training {
    id : number;
    user_id : number;
    name: string;
    time: string;
    create_at : string;
    update_at : string;
}


export type APITraining_data = {
    bypass: boolean,
    data: Training,
    status : string,
    message : string
}
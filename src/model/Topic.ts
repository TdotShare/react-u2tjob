export interface Topic {
    id : number,
    name: string;
    round : number;
    time: Date;
}


export type APITopic_data = {
    bypass: boolean,
    data: Topic,
    status : string,
    message : string
}
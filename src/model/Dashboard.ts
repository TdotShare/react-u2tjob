export interface Dashboard {
    countuser: number;
    countjob: number;
}

export interface APIDashboard_data {
    bypass: boolean,
    data: Dashboard,
    status : string,
    message : string
}
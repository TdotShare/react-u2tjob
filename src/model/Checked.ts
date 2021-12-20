interface CheckedJob {
    id: number;
    code : string;
    topic_id: number;
    user_id: number;
    evid0?: string;
    evid1?: string;
    evid2?: string;
    evid3?: string;
    evid4?: string;
    evid5?: string;
    evid6?: string;
    evid7?: string;
    evid8?: string;
    talent?: string;
    work_area_one?: string;
    work_area_two?: string;
    type_job?: string;
    create_at : string;
    update_at : string;
    idcard? : number;
    profile_id? : number;
    fullname : string;
}


export type APIChkecedJob_data = {
    bypass: boolean,
    data: Array<CheckedJob>,
    status: string,
    message: string
}
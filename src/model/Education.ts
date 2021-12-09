export interface Education {
    id: number;
    user_id: number;
    degree_id : string;
    major : string;
    gpa : string;
    university : string;
    timeend : string;
    create_at : string;
    update_at : string;
}

export type APIEducation_data = {
    bypass: boolean,
    data: Education,
    status : string,
    message : string
}
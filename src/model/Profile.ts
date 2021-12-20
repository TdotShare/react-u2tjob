import { Education } from "./Education"
import { Training } from "./Training"
import { Workexperience } from "./Workexperience"

export interface Profile {
    id?: number;
    user_id?: number;
    title? : string;
    firstname? : string;
    surname? : string;
    birthday? : string;
    email? : string;
    nationality? : string;
    religion? : string;
    tel? : string;
    status? : string;
    address_current? : string;
    address_home? : string;
    job_name? : string;
    address_job? : string;
    work_detail? : string;
}

export type APIProfile_data = {
    bypass: boolean,
    data: Profile,
    status : string,
    message : string
}


export type APIProfileView_data = {
    bypass: boolean,
    data: { profile ?: Profile, education : Education  , workexperience : Workexperience , training : Training },
    status : string,
    message : string
}
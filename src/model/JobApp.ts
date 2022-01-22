
import { Profile } from "./Profile"
import { Topic } from "./Topic"
import { Tambon } from "./Tambon"

export interface Job {
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
}


export type APIJobApp_data = {
    bypass: boolean,
    data: { profile?: Profile, topic: Topic , job : Job , tambon : Tambon[] },
    status: string,
    message: string
}
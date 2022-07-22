export interface Areau2t {
    area_id : number;
    area_tambon_id: number;
    area_tambon : string;
    area_district : string;
    area_province : string;
    area_postcode : string;
    area_create_by : string;
    area_update_by : string;
    area_create_at : string;
    area_update_at : string;
}

export type APIAreau2t_data = {
    bypass: boolean,
    data: Areau2t,
    status : string,
    message : string
}
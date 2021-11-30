export const systemConfig  =  {
    API : process.env.NODE_ENV !== 'production' ? "http://127.0.0.1:8000/api" : "https://mis-ird.rmuti.ac.th/service/u2tjob/api" , 
    NameFull : `ระบบสมัครงาน U2TJob IRD`,
    NameInit : `IRD - U2TJob`,
    BaseRouter : process.env.NODE_ENV !== 'production' ? "/" : "/u2tjob/" 
}
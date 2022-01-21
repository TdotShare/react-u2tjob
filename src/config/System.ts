export const systemConfig  =  {
    ImagesPath : process.env.NODE_ENV !== 'production' ? "http://127.0.0.1:8000/upload" : "https://u2tjob.ird.rmuti.ac.th/service/u2tjob/upload" , 
    HOST : process.env.NODE_ENV !== 'production' ? "http://127.0.0.1:3000" : "https://u2tjob.ird.rmuti.ac.th" , 
    API : process.env.NODE_ENV !== 'production' ? "http://127.0.0.1:8000/api" : "https://u2tjob.ird.rmuti.ac.th/service/u2tjob/api" , 
    NameFull : `ระบบสมัครงาน U2TJob IRD`,
    NameInit : `IRD - U2TJob`,
    BaseRouter : process.env.NODE_ENV !== 'production' ? "/" : "/" 
}

//"homepage": "https://u2tjob.ird.rmuti.ac.th",
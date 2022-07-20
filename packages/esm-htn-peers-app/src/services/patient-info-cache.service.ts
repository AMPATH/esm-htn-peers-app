import { uniq } from "lodash"

const PATIENT_INFO_CACHE="PATIENT_INFO_CACHE"
const PATIENT_UUIDS_CACHE="PATIENT_UUIDS_CACHE"
// expires daily
const DAY = 1000 * 60 * 60 * 24

const currentTime = () => Date.now()

const getPatientInfoCache = ()=>{

    let cachedData={
        data:{},
        expires: currentTime() + DAY
    }  

    try {
        const data=localStorage.getItem(PATIENT_INFO_CACHE)
        if(data){
            const _cache = JSON.parse(data);
            const expiry = _cache.expires;
            if (expiry && expiry >= currentTime()) {
                cachedData = _cache;
            }
        }
    }
    catch(e){
        console.error(e.message)
    }

    return cachedData;
}

const setPatientInfoCache=(peerId: string, value : any)=>{

    let patientInfocache=getPatientInfoCache();
    
    const item={
        id:peerId,
        expiry:new Date().getTime()+DAY,
        patientInfo: value
    }

    patientInfocache.data[peerId]=item

    try{
        localStorage.setItem(PATIENT_INFO_CACHE,JSON.stringify(patientInfocache))
        savePatientUuids(value.filter(v => !v.isFake).map(v => v.uuid))
    }
    catch(e){
        refreshCache(patientInfocache)
    }

}

const refreshCache=(patientInfocache: any)=>{

    //refresh it if it is more than a day later
    for (const peerId in patientInfocache.data) {
        const expiry = patientInfocache.data[peerId].expiry
        if (expiry && expiry <= currentTime()) {
          delete patientInfocache.data[peerId]
        }
    }

    localStorage.setItem(
        PATIENT_INFO_CACHE,
        JSON.stringify({
          data: patientInfocache.data,
          expires:currentTime() + DAY,
        })
    );

}

const fetchPatientUuids = (): Array<string> =>{
    let cachedUuids = [];
    try {
        const data=localStorage.getItem(PATIENT_UUIDS_CACHE)
        if(data){
            cachedUuids = JSON.parse(data)
        }
    }
    catch(e){
        console.error(e.message)
    }

    return cachedUuids;
}

const savePatientUuids = (patientUuids: Array<string>)=>{

    let cachedUuids=fetchPatientUuids();

    cachedUuids = cachedUuids.concat(patientUuids);

    try{
        localStorage.setItem(PATIENT_UUIDS_CACHE,JSON.stringify(uniq(cachedUuids)))
    }
    catch(e){
        localStorage.setItem(PATIENT_UUIDS_CACHE,JSON.stringify([]))
        console.error(e.message)
    }
}

const saveGenericItem = (key: string, item: any): void => {
    try{
        localStorage.setItem(key,
            JSON.stringify({
                data: item,
                expires:currentTime() + DAY,
              }))
    }
    catch(e){
        console.error(e.message)
    }
}

const getGenericItem = (key: string): any => {
    let item = null;
    try {
        let cache=localStorage.getItem(key)
        if(cache){
            const _cache = JSON.parse(cache);
            const expiry = _cache.expires;
            if (expiry && expiry >= currentTime()) {
                item = _cache.data;
            }
            
        }
    }
    catch(e){
        console.error(e.message)
    }

    return item;
}

export {
    setPatientInfoCache, getPatientInfoCache, 
    savePatientUuids, fetchPatientUuids,
    saveGenericItem, getGenericItem
}
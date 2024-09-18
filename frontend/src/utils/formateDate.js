export const formateDate =(date,config)=>{
    const defaultoption = {day:'numeric',month:'short',year:'numeric'}
    const options = config ? config :defaultoption

    return new Date(date).toLocaleDateString('en-US',options)
}
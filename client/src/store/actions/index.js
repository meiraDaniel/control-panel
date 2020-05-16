export const actionTypes =  {
    CREATE_SESSION:"CREATE_SESSION",
    FINISH_SESSION:" FINISH_SESSION",

}

export const createSession = (id,token,firstname,lastname,adm) => ({
    type : actionTypes.CREATE_SESSION,
    id:id,
    token : token,
    firstname:firstname,
    lastname:lastname,
    adm:adm
});

export const logout = () => ({
    type : actionTypes.CREATE_SESSION,
    id:'',
    token : '',
    firstname:'',
    lastname:''
});
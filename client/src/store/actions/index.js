export const actionTypes =  {
    CREATE_SESSION:"CREATE_SESSION",
    FINISH_SESSION:" FINISH_SESSION",
    GET_ID:"GET_ID"
}

export const createSession = (id,token,firstname,lastname,adm,role,avatar,email) => ({
    type : actionTypes.CREATE_SESSION,
    id:id,
    token : token,
    firstname:firstname,
    lastname:lastname,
    adm:adm,
    role:role,
    avatar:avatar,
    email:email
});

export const logout = () => ({
    type : actionTypes.CREATE_SESSION,
    id:'',
    token : '',
    firstname:'',
    lastname:'',
    adm:'',
    role:'',
    avatar:'',
    email:''
});

export const getId =(account_id,avatar)=>({
    type : actionTypes.GET_ID,
    account_id:account_id,
    avatar:avatar
})
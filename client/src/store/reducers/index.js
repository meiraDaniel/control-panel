export  function createSession(state={}, action){
    switch(action.type){
        case "CREATE_SESSION":
        return {...state, id:action.id, token:action.token, firstname:action.firstname,lastname:action.lastname,adm:action.adm, role:action.role, avatar:action.avatar,email:action.email};
    
        default: 
        return state;
    }} 

    export  function getId(state={}, action){
        switch(action.type){
            case "GET_ID":
            return {...state, account_id:action.account_id};
        
            default: 
            return state;
        }} 
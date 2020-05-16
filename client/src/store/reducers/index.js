export  function createSession(state={}, action){
    switch(action.type){
        case "CREATE_SESSION":
        return {...state, id:action.id, token:action.token, firstname:action.firstname,lastname:action.lastname,adm:action.adm};
    
        default: 
        return state;
    }}
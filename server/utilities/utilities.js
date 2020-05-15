const isStringEmpty =string =>{
    if(string ==='') return true
    else return false
  }
  function isObjectEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
 
function isArrayEmpty(array) {
   
        if(array.length === 0) return false;
    
    return true;
}

const allMandatory = `All the fields are mandatory`
const thisMandatory = `cannot be empty`

  module.exports = {
    isObjectEmpty,isStringEmpty,isArrayEmpty,allMandatory,thisMandatory
  }
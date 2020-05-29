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

function getMonthName(id){
  switch (id) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
    default:
      return "Not Valid";
  }}
  
  module.exports = {
    getMonthName,isObjectEmpty,isStringEmpty,isArrayEmpty,allMandatory,thisMandatory
  }
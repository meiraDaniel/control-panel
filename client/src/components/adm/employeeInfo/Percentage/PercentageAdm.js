import React,{useState,useEffect,useCallback} from 'react'
import ProgressBar from '../../../AprovedHours/ProgressBar'

function PercentageAdm({table}){
const[percentageDays,setPercentageDays]=useState([])
const[percentageMonths,setPercentageMonths]=useState([])


const handleWorkDays=useCallback(()=>{
  const num = table.length
  setPercentageDays(Math.round((num*100)/20)) 


 },[table])

 const handleMonthWorked=useCallback(()=>{
  let month = [];
   table.forEach((item) => month.push(item.month))
  const uniqueMonth= month.filter((v, i) => month.indexOf(v) === i);
const num =uniqueMonth.length
setPercentageMonths(Math.round((num*100)/12)) 


 },[table])


useEffect(() => {
    handleWorkDays();
  }, [handleWorkDays]);
  
  useEffect(() => {
    handleMonthWorked();
  }, [handleMonthWorked]);



    return(
        <main className="percentageAdm--center-main">
          <div className="percentage--daysWorked">
      <h2>Days worked </h2>
      <ProgressBar    
    size={60}
    strokeWidth={6}
    circleOneStroke='#888787'
    circleTwoStroke='#01D3BA' 
    percentage={percentageDays}/>
    </div>
    <div className="percentage--daysWorked">

    <h2>Months worked </h2>
      <ProgressBar    
    size={60}
    strokeWidth={6}
    circleOneStroke='#888787'
    circleTwoStroke='#01D3BA' 
    percentage={percentageMonths}/>
    </div>
        </main>
    )
}

export default PercentageAdm
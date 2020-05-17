import React,{useState,useEffect} from 'react'
import ProgressBar from '../../../AprovedHours/ProgressBar'

function PercentageAdm({table}){
const[percentageDays,setPercentageDays]=useState([])
const[percentageMonths,setPercentageMonths]=useState([])

useEffect(() => {
    handleWorkDays();
  }, []);
  
  useEffect(() => {
    handleMonthWorked();
  }, []);

const handleWorkDays=()=>{
     const num = table.length
     console.log(table)
     setPercentageDays(Math.round((num*100)/20)) 
  
  
    }

    const handleMonthWorked=()=>{
     let month = [];
      table.forEach((item) => month.push(item.month))
     const uniqueMonth= month.filter((v, i) => month.indexOf(v) === i);
const num =uniqueMonth.length
setPercentageMonths(Math.round((num*100)/12)) 


    }


    return(
        <main className="percentageAdm--center-main">
      <h1><ProgressBar    
    size={80}
    strokeWidth={9}
    circleOneStroke='#888787'
    circleTwoStroke='#01D3BA' 
    percentage={percentageDays}/></h1>
      <h1><ProgressBar    
    size={80}
    strokeWidth={9}
    circleOneStroke='#888787'
    circleTwoStroke='#01D3BA' 
    percentage={percentageMonths}/></h1>
        </main>
    )
}

export default PercentageAdm
import getAllDataFromHours from '../../services/API/getAllDataFromHours'
import React,{useState,useEffect,useCallback} from 'react'
import ProgressBar from './ProgressBar'
import "./Percentage.scss"

function Percentage({token,account_id}){
   
    const [percentage,setPercentage] =useState(0)
    const handleAllHours = useCallback(()=>{
        getAllDataFromHours(account_id,token).then(res=>
           {  const num =(res.data.filter(e => e.approved ===true).length);
             const per= (res.data.length);
            findPercentage(num,per)
             
            }).catch(err=>console.log(err))},[account_id,token])
            
    useEffect(() => {
        handleAllHours(); 
       },[handleAllHours]);
      
     
      
    const findPercentage=(num,per)=>{
       setPercentage(Math.round((num*100)/per)) 
    }
    return(
        <main className="percentage--center-main">
        <h1> Hours approved</h1>
         <ProgressBar    
    size={200}
    strokeWidth={14}
    circleOneStroke='#888787'
    circleTwoStroke='#01D3BA' 
    percentage={percentage}/>

        </main>
    )
}

export default Percentage
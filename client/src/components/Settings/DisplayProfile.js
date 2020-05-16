import React,{useState, useEffect} from 'react'


function DisplayProfile ({data}) {


    return (
        <div  className='displayProfile-main'>
      
<div  className='displayProfile-rigth-main'>
<h1>{`${data.firstname} ${data.lastname}` }</h1>
    <h2>{data.email}</h2>
    <h3>{data.role}</h3>

</div>
        </div>
    )
}

  export default DisplayProfile;
  

import React,{useState, useEffect} from 'react'
import getAllMyPosts from "../../services/API/getAllMyPosts"
import "./Wall.scss"
import { connect } from "react-redux";
import Posts from './Posts'
import { useForm } from "react-hook-form";
import postOnWAllHelper from '../../services/API/postOnWallHelper'
import logo from '../../images/logo.svg'

function Wall ({account_id,token,firstname}) {
  
const[data,setData]=useState([])
const { register, errors, handleSubmit } = useForm();
const [message,setMessage] = useState('')
const [flag,setFlag]= useState(false)
const [snackFlag,setSnackFlag]= useState(false)
const [maxCharsTitle,setMaxCharsTitle] =useState(21)
const [maxCharsPost,setMaxCharsPost] =useState(50)

useEffect(() => {
    getDataFromWall()
   },[flag]);

const getDataFromWall=()=>{
    getAllMyPosts(account_id,token).then(res=> setData(res.data)).catch(err=> {setMessage(err.response.data.message);setSnackFlag(!snackFlag)})
}
const onSubmit = (value, e) => {
    e.preventDefault();
    
    postOnWAllHelper(account_id,value.title,value.message,token).then(res=>{setMessage(res.data.message);toggleFlag()}).catch(err=>{ setMessage(err.response.data.message);setSnackFlag(!snackFlag)})
    
  };
  const toggleFlag=()=>{
    setFlag(!flag)
  }
 

 const handleChangePost =  (input) => {

  setMaxCharsPost(50 - input.length) 

}

const handleChangeTittle = (input) => {

  setMaxCharsTitle (20 - input.length) 




}
    return (
      <div>
      <div className="dashboard--top-nav">
      <h2 className='page-name'>My Wall</h2>

         <img src={logo} alt="logo" />
     </div>
        <div className='wall--main'>
         {snackFlag?<p onClicl={()=> setSnackFlag(!snackFlag)}  className={snackFlag?'snackbar':'snackclose'}>{message}</p>:null}
            <div className='wall--left-posts'>
                {data.length>0?data.map((post,i)=>
                <Posts firstname={firstname} post={post}  i={i}/>
                ):<h1>Loading</h1>}
            </div>
            <div className='wall--rigth-insertPosts'>
            <form
        className='wall--center-form'
        onSubmit={handleSubmit(onSubmit)}
      >
      <div className='wall-center-formInput'>
               <h1 className='wall--top-circle'>Create Post</h1>
        
        <div className="wall--right-inputs">
        <label htmlFor="title">
          title
        </label>
        <input
        onChange={(e)=>handleChangeTittle(e.target.value)}
       className='wall--input'
          type="text"
          name="title"
          ref={register({ required: true, maxLength: 21 })}
        />
        {errors.title && "This tittle is too big"}
        
        <p id='chars--title' className='lighGreen'> Characters left:  <span className={maxCharsTitle>10?'lighGreen':'red'}>  {maxCharsTitle}</span> </p>

        <label  htmlFor="message">
          message
        </label>
        <input
        onChange={(e)=>handleChangePost(e.target.value)}
                 className='wall--input'
                 id='wall--input-textarea'

          type="text"
          name="message"
          ref={register({ required: true, maxLength: 50 })}
        />
                      
                      <p  id='chars--post' className='lighGreen'> Characters left:  <span  className={maxCharsPost>10?'lighGreen':'red'}>  {maxCharsPost}</span> </p>

        {errors.message && "This post is too big"}
        
          <input id='wall-button' className='button' type='submit' value="Send"/>
          </div>
          </div>
      </form>
    
            </div>

        </div>
        </div>
    )
}

function mapToProps(state) {
    return {
      firstname: state.createSession.firstname,
      token: state.createSession.token,
      account_id: state.createSession.id,
    };
  }
  
  export default connect(mapToProps)(Wall);
  


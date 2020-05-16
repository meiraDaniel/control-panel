import React,{useState, useEffect} from 'react'
import getAllMyPosts from "../../services/API/getAllMyPosts"
import "./Wall.scss"
import { connect } from "react-redux";
import Posts from './Posts'
import { useForm } from "react-hook-form";
import postOnWAllHelper from '../../services/API/postOnWallHelper'

function Wall ({account_id,token,firstname}) {
const[data,setData]=useState([])
const { register, errors, handleSubmit } = useForm();
const [message,setMessage] = useState('')
const [flag,setFlag]= useState(false)
useEffect(() => {
    getDataFromWall();
   },[flag]);

const getDataFromWall=()=>{
    getAllMyPosts(account_id,token).then(res=> setData(res.data)).catch(err=> console.log(err.response.data.message))
}
const onSubmit = (value, e) => {
    e.preventDefault();
    postOnWAllHelper(account_id,value.title,value.message,token).then(res=>setMessage(res.data.message)).catch(err=> setMessage(err.response.data.message))
    toggleFlag()
  };
  const toggleFlag=()=>{
    setFlag(!flag)
  }

    return (
        <div className='wall--main'>
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
        <div className='wall--top-circle'>
                {message?<h1>{message}</h1>:<h1>Create a Post</h1>}
        </div>
        <label htmlFor="title">
          title
        </label>
        <input
       
          type="text"
          name="title"
          ref={register({ required: true, maxLength: 20 })}
        />
        {errors.title && "Something is not correct"}
        

        <label  htmlFor="message">
          message
        </label>
        <input
          
          type="text"
          name="message"
          ref={register({ required: true, maxLength: 240 })}
        />
        {errors.message && "Something is not correct"}
        
          <input type='submit' value="Send"/>
          </div>
      </form>
    
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
  


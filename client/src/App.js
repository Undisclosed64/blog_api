import './App.css';
import axios from 'axios';
import React from "react";
import Home from './components/Home';
import SignUp from './components/SignUp'
import Loader from './components/Loader';
import Navbar from './components/Nav';
import SignIn from './components/SignIn';
import StoryDetails from './components/StoryDetails';
import DeleteStory from './components/DeleteStory';
import CommentView from './components/CommentView';
import Account from './components/Account';
import LogOut from './components/LogOut';



import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

const baseURL = "http://localhost:3000/api";


function App(){
  const [post, setPost] = React.useState(null);
  const [user,setUser] = React.useState('');
  const [err,setErrMsg] = React.useState('');
  const token = localStorage.getItem('token');


 //get posts
  React.useEffect(() => {
    axios.get(`${baseURL}/stories`)
    .then((response) => {
      setPost(response.data);
    }).catch(err => {
      //console.log(err)
      setErrMsg(err); 
    })
  }, []);

//get current user
  React.useEffect(() => {
    axios.get(`${baseURL}/auth/user`,{ headers: {"Authorization" : `Bearer ${token}`}}).then((response) => {
      setUser(response.data.user)
    });
  }, []);


  
if(!err){
if(!post) return <Loader/>
} else {
return <div className='homePageError'>Error: Failed to fetch:( </div>
}
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar/>
<Routes>
<Route exact path='/'element={<Home post={post}></Home>}/> 

<Route exact path='/stories/:storyId'element={<StoryDetails user={user}></StoryDetails>}/> 

<Route exact path='/stories/:storyId/update'element={<StoryDetails user={user}></StoryDetails>}/> 

<Route exact path='/stories/:storyId/delete'element={<DeleteStory></DeleteStory>}/> 

<Route exact path='/stories/:storyId/comments/:commentId'element={<CommentView user={user}></CommentView>}/> 

<Route exact path='/sign-up'element={<SignUp></SignUp>}/>

<Route exact path='/sign-in'element={<SignIn></SignIn>}/> 

<Route exact path='/account'element={<Account user={user}></Account>}/> 
<Route exact path='/log-out'element={<LogOut></LogOut>}/> 


 </Routes>
 </BrowserRouter>
 </div>
  );
}


export default App;

import useStyles from "./style" ;
import axios from "axios" ; 
import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createposts , updateposts} from "../../redux/actions/posts" ; 
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import {useHistory} from "react-router-dom" ; 
    const Form = ({currentId , setcurrentId}) => {
     const history = useHistory() ; 
    const dispatch = useDispatch();
    // const currentid = useSelector(state=>state.selecteduser.selected) ; 
    // console.log(`${currentid}`) ; 
    // const [currentId , setcurrentId] = useState(`${currentid}`) ; 
    // console.log(currentId) ; 
    const [postData, setPostData] = useState({title: '', message: '', tags: '', selectedFile: '' });
    const post =useSelector((state)=>currentId?state.posts.posts.find((p)=>p._id===currentId):null)
    const classes = useStyles() ; 
    const [image, setImage] = useState(null);
    const user = JSON.parse(localStorage.getItem('profile')) ; 
      
    useEffect(() => {
     if(post){ 
      setPostData(post) ; 
     }
    }, [post])
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "instagram_clone");
        data.append("cloud_name", "daynsu4jq");
        if(currentId==null){
          try{
            
            const image = await axios.post(
              "https://api.cloudinary.com/v1_1/daynsu4jq/image/upload",
              data
            );
              
            dispatch(createposts({...postData , name:user?.result?.name ,   selectedFile: image?.data?.secure_url }, history));

            clear() ; 
          }
          
          catch(err){
            console.log(err) ; 
          }
        }
        else{
          
          dispatch( updateposts(currentId ,{...postData , name:user?.result?.name } ));
          clear() ;    
        }
        }
    const clear = ()=>{
        setcurrentId(null) ; 
        setPostData({title: '', message: '', tags: '', selectedFile: '' })
    };

    if(!user?.result?.name){
      return (
        <Paper className={classes.paper}>
          <Typography variant="h6" align="center">
            Please Sign In to create your own memories and like other's memories.
          </Typography>
        </Paper>
      );
    }
    return (
        <Paper className={classes.paper}  elevation={6}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h6">{currentId?"Editing":"Creating"} a memory</Typography>
          <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
          <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
          <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
          {/* <div className={classes.fileIn  put}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div> */}
          <div className="btn #64b5f6 blue darken-1">
            
            <input
              name="selectedFile"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
      </Paper>
    )
    }

export default Form

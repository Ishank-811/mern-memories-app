import React from 'react'
import {useSelector} from "react-redux"  ; 
import { Grid, CircularProgress } from '@material-ui/core';
import Post from "./Post/Post"
import useStyles from "./style" ;
const Posts = ({setcurrentId}) => {
    const {posts, isloading} = useSelector(state => state.posts); 
  
    const classes = useStyles() ; 
    if(!posts.length && !isloading){
      return "no posts"
    }
    return (
     
           <div>
           {
       isloading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
              {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={6} md={6}>
                  <Post post={post} setcurrentId={setcurrentId}  />
                </Grid>
              ))}
            </Grid>
          )
           }
          </div>
    )
}

export default Posts ; 
  
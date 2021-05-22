import React , {useState , useEffect} from 'react'
import { AppBar ,Avatar,Button,Toolbar,Typography } from "@material-ui/core" ; 
import useStyles from "./Style" ; 
import {Link} from "react-router-dom" ; 
import memories from "../../images/memories.png" ; 
import memoriestext from "../../images/memories-Text.png"
import {useDispatch} from "react-redux" ; 
import {useHistory , useLocation} from "react-router-dom" ; 
const Navbar = () => {
    const location = useLocation() ; 
    const history = useHistory() ; 
    const dispatch = useDispatch() ; 
    const [user , setuser] =useState(JSON.parse(localStorage.getItem('profile'))) ; 
     
    const classes = useStyles() ; 
    const logout = () =>{
        dispatch({type:"LOGOUT"}) ;  
        setuser(null) ; 
     
        history.push("/auth") ; 

    }
 useEffect(() => {

    const token = user?.token ; 
    setuser(JSON.parse(localStorage.getItem('profile'))) ; 
 }, [location]) ; 
    return (
        
           <AppBar className={classes.appBar} position="static" color="inherit">
           <Link to="/" className={classes.brandContainer}>
           <img src={memoriestext} alt="icon" height="45px" />
          <img   className={classes.image} src={memories} alt="memories" height="60"></img>
           </Link>  
           <Toolbar className={classes.toolbar}>
            {user?(
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6" >{user.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >Logout</Button>
                </div>
            ):(<Button component={Link} to="/auth" variant="h6" color='primary'>signin</Button> )}
           </Toolbar>
         
          </AppBar>   
        
    )
}

export default Navbar

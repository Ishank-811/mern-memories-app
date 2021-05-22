import React, { useState } from "react";
import {
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container,
} from "@material-ui/core";
import useStyles from "./Style";
import Input from "./Input";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import Icon from "./Icon";
import { useHistory } from "react-router-dom";
import {signup , signin} from "../../redux/actions/auth" ; 

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [isSignup, setisSignup] = useState(false);
    const [showPassword, setshowPassword] = useState(false);
    const [formdata , setform] = useState({ 
        firstName: '',
        lastName: '', 
        email: '',
        password: '',
        confirmPassword: '' }) ; 
     
    const handleSubmit = (e) => { 
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formdata , history)) ; 
        } 
        else{
            dispatch(signin(formdata , history)) ; 
        }
    };
    const handleChange = (e) => { 
        const name= e.target.name ; 
        const value = e.target.value ; 
        
        setform({...formdata ,[name]:value }); 
    };
    const handleShowPassword = () =>
        setshowPassword((prevShowpasword) => !prevShowpasword);
    const switchMode = () => {
        setisSignup((prev) => !prev);
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: "AUTH", data: { result, token } });
            history.push("/");
        } catch (err) {
            console.log(err);
        }
    };
    const googleFailure = () => {
        console.log("google failed to singin");
    };
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
                <Typography component="h1" variant="h5">
                    {isSignup ? "Sign up" : "Sign in"}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input
                                    name="firstName"
                                    label="First Name"
                                    handleChange={handleChange}
                                    
                                    autoFocus
                                    half
                                />
                                <Input
                                    name="lastName"
                                    label="Last Name"
                                    handleChange={handleChange}
                                    half
                                />
                            </>
                        )}
                        <Input
                            name="email"
                            label="Email Address"
                            handleChange={handleChange}
                            type="email"
                        />
                        <Input
                            name="password"
                            label="Password"
                            handleChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignup && (
                            <Input
                                name="confirmPassword"
                                label="Repeat Password"
                                handleChange={handleChange}
                                type="password"
                            />
                        )}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin
                        clientId="686063206026-pb2taeqd40h2is1obbt6hgsmblorgua6.apps.googleusercontent.com"
                        render={(renderprops) => (
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderprops.onClick}
                                disabled={renderprops.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >
                                google Signin
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    ></GoogleLogin>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup
                                    ? "Already have an account? Sign in"
                                    : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;

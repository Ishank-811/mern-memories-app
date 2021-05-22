import React from 'react'
import {Container } from "@material-ui/core" ; 
import Navbar from './Component/Navbar/Navbar';
import {BrowserRouter  , Switch , Route, Redirect} from "react-router-dom" ;  
import Home from './Component/Home/Home';
import Auth from "./Component/Auth/Auth" ; 
import Postdetails from './Component/Postdetails/Postdetails';
const App = () => {
  const user = JSON.parse(localStorage.getItem("profile")) ; 
    return (
        <BrowserRouter>
        <Container maxidth="xl">
      <Navbar></Navbar>
      <Switch>
          <Route path="/" exact component={()=><Redirect to="/posts" />}/>
          <Route path="/Posts" exact component={Home}/>
          <Route path="/Posts/search" exact component={Home}/>
          <Route path="/Posts/:id" exact component={Postdetails}/>
          <Route path="/auth" exact component={()=>(!user ? <Auth/> :<Redirect to="/posts" /> )}/>
      </Switch>
        
        </Container>
        </BrowserRouter>
    )
}

export default App

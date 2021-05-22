import * as api from "../../api/index" ; 

export const getPost = (id) =>async(dispatch)=>{
  try{
   dispatch({type: "START_LOADING" })
   const {data} = await api.fetchpost(id)  ; 
  
   dispatch({ type:"FETCH_POST" , payload:data}) ; 
   dispatch({type: "END_LOADING" })
  }catch(err){
   console.log(err)  ;
  }     
}

export const getposts = (page) =>async(dispatch)=>{
   try{
    dispatch({type: "START_LOADING" })
    const {data} = await api.fetchposts(page)  ; 
  
    dispatch({ type:"FETCH_ALL" , payload:data}) ; 
    dispatch({type: "END_LOADING" })
   }catch(err){
    console.log(err)  ;
   }    
}
export const createposts = (post , history) =>async(dispatch)=>{
    try{
      dispatch({type: "START_LOADING" });
     const {data} = await api.createposts(post) ;

     history.push(`/posts/${data._id }`);
     
     dispatch({ type:"CREATE" , payload:data}) ; 
     dispatch({type: "END_LOADING" })
    }catch(err){
     console.log(err)  ;
    }    
 }
export const updateposts = (id , post) =>async(dispatch)=>{
    try{
       const {data} =  await api.updateposts(id,post) ;
       
       dispatch({type:"UPDATE" , payload:data})  ; 
    }catch(err){ 
        console.log(err) ;
    }
}
export const deleteposts = (id) => async (dispatch) => {
    try {
      await api.deleteposts(id);
  
      dispatch({ type: 'DELETE', payload: id });
    } catch (error) {
      console.log(error);
    }
  };

  export const likeposts = (id) => async (dispatch) => {
    try {
      const {data} =await api.likeposts(id);
        
      dispatch({ type: 'LIKE', payload: {...data} });
    } catch (error) {
      console.log(error);
    }
  };  

  export const getpostbysearch = (searchQuery)=> async (dispatch) =>{

    try{
      dispatch({type: "START_LOADING" })

      const {data:{data}} = await api.fetchpostsbysearch(searchQuery);
      dispatch({ type: 'FETCH_SEARCH', payload: data });
      dispatch({type: "END_LOADING" })
   
    }catch(err){
      console.log(err) ; 
    }
  }
const reducer = (state={posts:[] , isloading:true} , action)=>{
    switch(action.type){
        case "START_LOADING" : 
        console.log("...loading"); 
        return {
            ...state , isloading:true , 
        }
        case "END_LOADING" : 
        return {
            ...state , isloading:false , 
        }
        case 'FETCH_ALL':
        
            return {
                ...state, 
             posts:action.payload.data , 
             currentPage :action.payload.currentPage, 
             numberofPages:action.payload.numberofPages
            }
        case "FETCH_POST" : 
        
        return {...state , post:action.payload }    
        case "FETCH_SEARCH" : 
        return {...state , posts:action.payload }    
        case "CREATE" :
            return {...state , posts:[...state ,action.payload] } 
        case "UPDATE" : 
        return {...state , posts:state.posts.map((post)=>
            post._id===action.payload._id?action.payload:post
        )} 
        case "DELETE" : 
        return {...state , posts:state.posts.filter((post)=>post._id!== action.payload)} 
        case "LIKE"  : 
        return {...state , posts:state.posts.map((post)=>
            post._id===action.payload._id?action.payload:post
        )} 
         default : 
         return {...state , posts:state} 
          
    }
}
export default reducer  ; 
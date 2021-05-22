const selecteduser = (state={selected:null } , action)=>{
    switch (action.type) {
        case "SELECTED":
            return({selected:action?.payload})  ; 
        default:
            return state ;     
    }
}
export default selecteduser ; 
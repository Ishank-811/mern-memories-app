const  express = require("express") ; 
const {getposts ,getpost ,createposts , updatepost, deleteposts , likeposts , getpostsbysearch}  = require("../controllers/post.js"); 
const router   = express.Router() ; 
const auth = require("../middleware/auth") ;
router.get("/search", getpostsbysearch) 
router.get("/" , getposts) ;
 

router.get("/:id", getpost); 
router.post("/" , auth ,  createposts) ;
router.patch("/:id" ,auth ,  updatepost);   
router.delete("/:id" ,auth , deleteposts);
router.patch("/:id/likeposts" ,auth , likeposts);    
module.exports = router ;   
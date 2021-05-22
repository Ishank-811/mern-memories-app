const { Mongoose } = require("mongoose");
const postmessage = require("../models/postmessage") ;
const getposts = async (req,res)=>{
    const {page} = req.query ; 
    try{
        const LIMIT=4 ; 
        
        const startIndex = (Number(page)-1)*LIMIT; //get starting index of every page  
    
        const total = await postmessage.countDocuments({}) ; 
    
        const posts = await postmessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex) ;
       
        res.status(200).json({data:posts,currentPage:Number(page) , numberofPages:Math.ceil(total/LIMIT) }) ; 
    }catch(error){      

        res.status(400).json({message:error.message}) ; 
    }
}

const getpost = async(req,res)=>{
    const {id} = req.params ; 
   
try{
    const post  = await postmessage.findById(id) ;
    res.status(201).json(post) ;  

}catch(err){
    console.log(err); 
    res.status(404).json({message:err.message})
}
}


const createposts = async (req,res)=>{
   const post  = req.body ; 
  
   const newpost = new postmessage({...post ,creator:req.userId ,createdAt:new Date().toISOString() }) ; 
   try{
  
    await newpost.save() ; 
    res.status(200).json(newpost) ; 
   }catch(error){
       console.log(error) ; 
    res.status(409).json({message:error.message}) ;
   }
}

const  updatepost = async (req,res)=>{

const { id } = req.params;
const { name,title, message, creator, selectedFile, tags } = req.body;
 
const updatedPost = {name, creator, title, message, tags, selectedFile, _id: id };

await postmessage.findByIdAndUpdate(id, updatedPost, { new: true });

res.json(updatedPost);
}
const deleteposts = async (req,res)=>{
    const {id} = req.params ; 
    await postmessage.findByIdAndRemove(id) ; 
    res.json({message:"post deleted successully"}) ;

}
const likeposts = async(req,res)=>{
    const {id} = req.params ; 
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }
      const post = await postmessage.findById(id);
    const index = post.likes.findIndex((id) => id ===String(req.userId)); 
    if (index === -1) {
        post.likes.push(req.userId);
      } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
      }
      const updatedPost = await postmessage.findByIdAndUpdate(id, post, { new: true });
      res.status(200).json(updatedPost); 

    // const post = await postmessage.findById(id);

    // const updatedpost = await postmessage.findByIdAndUpdate(id , { likeCount: post.likeCount + 1 } , {new:true}) ;  
   
    // res.json(updatedpost) ; 
}

const getpostsbysearch = async(req,res)=>{
  
    const {searchQuery , tags}  = req.query ; 
  
    
 
try{
const title = new RegExp(searchQuery , 'i') ; 
const posts = await postmessage.find({$or:[{title}, {tags:{$in:tags.split(',')}}]}); 

res.json({data:posts}) ; 

}catch(err){
     console.log(err) ; 
     res.status(409).json({message:err.message}) ;
}

}

module.exports = {getpost, getposts , createposts , updatepost ,deleteposts , likeposts , getpostsbysearch} ; 
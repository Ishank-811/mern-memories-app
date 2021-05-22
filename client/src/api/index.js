import axios from "axios" ; 
const API  =axios.create({baseURL:'http://localhost:8080'}) ;

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const fetchpost = (id)=>API.get(`/posts/${id}`) ;
export const fetchposts = (page)=>API.get(`/posts?page=${page}`) ;
export const fetchpostsbysearch = (searchQuery)=> API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const createposts = (newpost)=>API.post('/posts' , newpost) ;  
export const updateposts = (id , updatedpost)=>API.patch(`/posts/${id}` , updatedpost) ; 
export const deleteposts  = (id) =>API.delete(`/posts/${id}`) ; 
export const likeposts  = (id) =>API.patch(`/posts/${id}/likeposts`) ; 
export const signin  = (formdata) =>API.post(`/users/signin` , formdata) ;   
export const signup   = (formdata) =>API.post(`/users/signup` , formdata) ;   

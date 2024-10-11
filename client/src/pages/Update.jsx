import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios"

export const Update = () => {
    const [book, setbook] = useState({
        title:"",
        description:"",
        price:null,
        cover:""
    });

    // sets the new values of the form to the setbook onChange

    const handleChange = (e)=>{
        setbook((prev)=>({...prev,[e.target.name]: e.target.value}))
    };

    // add to database

    const navigate = useNavigate();
    const location = useLocation();

    const bookId = location.pathname.split("/")[2];


    const handleUpdate = async (e)=>{
        e.preventDefault();
        try {
            await axios.put("http://localhost:5000/books/"+ bookId,book);
            navigate("/");
        } catch (error) {
            console.log(error);
            
        }};


  return (
    <div className="form">
        <h1>Update Book Details</h1>
        <label htmlFor="title">Title</label>
        <input type="text" placeholder='Title' onChange={handleChange} name='title'/>

        <label htmlFor="description">Description</label>
        <input type="text" placeholder='Description' onChange={handleChange}  name='description' />

        <label htmlFor="price">Price</label>
        <input type="number" placeholder='Price' onChange={handleChange} name='price' />

        <label htmlFor="cover">Cover</label>
        <input type="text" placeholder='cover' onChange={handleChange}  name='cover'/>

        <button onClick={handleUpdate} className='formButton'>Update</button>
    </div>
  )
}

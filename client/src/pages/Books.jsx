import React, { useEffect, useState } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';


export const Books = () => {
    const [books, setBooks] = useState([]);

// fetching all the books
    useEffect(() => {
      const fetchAllBooks = async ()=>{
        try {
            const res = await axios.get("http://localhost:5000/books");
            setBooks(res.data)
            
        } catch (error) {
            console.log(error);
            
        }
      }
      fetchAllBooks();
    }, [])
    

  return (
    <div>
        <h1>Edyting's Bookshop</h1>
        <div className="books">
            {books.map((book)=>(
                <div key={book.id} className="book">
                   {book.cover && <img src={book.cover} alt='' />}
                   <h2>{book.title}</h2>
                   <p>{book.description}</p>
                   <span>{book.price}</span>
                   <button className="delete">Delete</button>
                   <button className="update">Update</button>
                </div>
            ))}
        </div>
        <button><Link to="/add">Add new book</Link></button>
    </div>
  )
}

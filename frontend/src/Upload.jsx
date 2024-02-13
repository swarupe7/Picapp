import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './upload.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
    const navigate=useNavigate();
    const [image,setImage] =useState('');
    const handleUpload = async() =>{
        try {
            const formData = new FormData();
            formData.append('image', image);
      
            const response = await axios.post('http://localhost:5000/api/upload', formData ,{
                withCredentials: true,
              });
      
            const data = response.data;
            toast.success('uploaded');
            
          } catch (error) {
            toast.error('failed to upload');
            console.error('Error uploading image:', error);
          }
    }
    const check=()=>{
        if(!(localStorage.getItem('token'))){
            navigate('/');

        }
    }
    const handleLogout = () => {
        // Clear the token from localStorage on logout
        localStorage.removeItem('token');
        navigate('/');
      };
    useEffect(() => {
        check();
    },[]);
  return (
    <>
    <button className="logout-btn" onClick={handleLogout}>
          X
        </button>
    <div className="App">
        <ToastContainer/>
      <h1>Image Upload App</h1>
      
      
      <div>
        <h2>Upload Image</h2>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <br />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
    </>
  )
}

export default Upload
import { Button, Container, Grid, Input, makeStyles, Paper, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Sidebar from './Sidebar';

const useStyles = makeStyles((theme) => ({
  root:{
    padding:'0 1rem 1rem 1rem',
    '@media(min-width:960px)' : {
        paddingLeft:216
    }
  },
  fieldItem:{
    width:'100%',
    padding:10,
    margin:'10px 0',
    border:'1px solid',
    borderColor:theme.palette.primary.main,
    borderRadius:3
  },
  fieldLabel:{
    color:theme.palette.primary.main,
    fontSize:20,
    fontWeight:700
  }
}))

const AddProduct = () => {
  const {root,fieldLabel, fieldItem} = useStyles();
  const [imageURL, setImageURL] = useState('');
  const { register, handleSubmit, watch, errors } = useForm();
  const handleImageUpload = event => {
    // console.log(event.target.files[0]);
    const imageData = new FormData();
    imageData.set('key', 'f722e3d0ff6c21590defd11ada10cc8b');
    imageData.append('image', event.target.files[0])
    axios.post('https://api.imgbb.com/1/upload', imageData)
      .then(function (response) {
        setImageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
  const onSubmit = (data, e) => {
    const juiceData = {
      name: data.name,
      price: data.price,
      imageURL: imageURL
    }
    axios.post('http://localhost:4000/addJuice', juiceData)
      .then(res => {
        console.log(res.data);
        res.data && e.target.reset();
      })
      .catch(err => {
        // console.log(err);
      });
    console.log(juiceData)
  };
  return (
    <>
      <Sidebar />
      <Container className={root}>
        <Paper style={{maxWidth:500, margin:'2rem auto',padding:20}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className={fieldLabel} htmlFor="name">Juice Name</label>
            <input className={fieldItem} name="name" placeholder="Enter Name" ref={register} />
          </div>
          <div>
            <label className={fieldLabel} htmlFor="price">Juice Price</label>
            <input className={fieldItem} name="price" placeholder="Enter Price" ref={register} />
          </div>
          <div>
            <label className={fieldLabel} htmlFor="imageURL">Add Photo</label>
            <input className={fieldItem} type="file" name="imageURL" onChange={handleImageUpload} />
          </div>
          <Button type="submit" variant="contained" color="primary">Save</Button>
        </form>
        </Paper>
      </Container>
    </>
  );
};

export default AddProduct;
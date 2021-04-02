import { Button, Container, Grid, Input, makeStyles, Paper, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Loader from './Loader';
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
    padding:'1vmax',
    // margin:'10px 0',
    border:'1px solid',
    borderColor:theme.palette.primary.main,
    borderRadius:3,
    fontSize:'calc(1vmax + 5px)'
  },
  fieldLabel:{
    color:theme.palette.primary.main,
    fontSize:'calc(1vmax + 10px)',
    fontWeight:700
  }
}))

const AddProduct = () => {
  const {root,fieldLabel, fieldItem} = useStyles();
  const [imageURL, setImageURL] = useState('');
  // const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, errors } = useForm();
  const handleImageUpload = event => {
    // console.log(event.target.files[0]);
    const imageData = new FormData();
    imageData.set('key', 'f722e3d0ff6c21590defd11ada10cc8b');
    imageData.append('image', event.target.files[0])
    axios.post('https://api.imgbb.com/1/upload', imageData)
      .then(response=> {
        setImageURL(response.data.data.display_url);
        setLoading(false)
      })
      .catch(err =>  {
        // console.log(err);
      });
  }
  const onSubmit = (data, e) => {
    const juiceData = {
      name: data.name,
      ingredient:data.ingredient,
      price: data.price,
      imageURL: imageURL
    }
    setLoading(true);
    axios.post('https://banana-tart-95567.herokuapp.com/addJuice', juiceData)
      .then(res => {
        console.log(res.data);
        res.data && e.target.reset();
        setLoading(false)
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
        <Paper style={{maxWidth:1000, margin:'2rem auto',padding:20}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
          <Grid item sm={6} xs={12}>
            <label className={fieldLabel} htmlFor="name">Juice Name</label>
            <input className={fieldItem} name="name" placeholder="Enter Name" ref={register} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <label className={fieldLabel} htmlFor="price">Juice Price</label>
            <input className={fieldItem} name="price" placeholder="Enter Price" ref={register} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <label className={fieldLabel} htmlFor="price">Main Ingredient</label>
            <input className={fieldItem} name="ingredient" placeholder="Enter Ingredient" ref={register} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <label className={fieldLabel} htmlFor="imageURL">Add Photo</label>
            <input className={fieldItem} type="file" name="imageURL" 
            onChange={(e)=> {
            handleImageUpload(e);
            setLoading(true);
            }} />
            {loading && <Loader/>}
          </Grid>
          </Grid>
          <Button type="submit" disabled={loading} variant="contained" color="primary" style={{fontSize:'calc(1vmax + 5px)',marginTop:10}}>Save</Button>
          {loading && <Loader/>}
        </form>
        </Paper>
      </Container>
    </>
  );
};

export default AddProduct;
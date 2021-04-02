import { Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetContext } from '../context';
import Loader from './Loader';

const Home = () => {
    
    const {setCheckoutJuiceId} = GetContext();
    const [juices, setJuices] = useState([]);
    const [loading , setLoading] = useState(true);
    useEffect(() => {
        axios.get('https://banana-tart-95567.herokuapp.com/juices')
            .then(res=> {
                // console.log(res.data);
                setJuices(res.data)
                setLoading(false);
            })
            .catch(err=> {
                console.log(err);
            })
    }, [])
    return (
        <Container>
            <Grid container spacing={5} justify="center">
                {   loading ? <Loader /> :
                    juices.map(juice => (
                        <Grid item md={4} sm={6} xs={12} key={juice._id} >
                            <Paper style={{maxWidth:300 , margin:'auto',overflow:'hidden'}}>
                                <img style={{maxWidth:300}} src={juice.imageURL} alt=""/>
                                <Typography variant="h5" align="center">{juice.name}</Typography>
                                <div style={{display:'flex', justifyContent:'space-around',padding:'1rem 0'}}>
                                <Typography variant="h4" color="primary">${juice.price}</Typography>
                                <Link to='/checkout' style={{textDecoration:'none'}}>
                                    <Button onClick={()=> setCheckoutJuiceId(juice._id)} variant="contained" color="primary">Buy Now</Button>
                                </Link>
                                </div>
                            </Paper>
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    );
};

export default Home;
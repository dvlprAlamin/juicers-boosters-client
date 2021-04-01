import { Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetContext } from '../context';

const Home = () => {
    const {setCheckoutJuiceId} = GetContext();
    const [juices, setJuices] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4000/juices')
            .then(res=> {
                // console.log(res.data);
                setJuices(res.data)
            })
            .catch(err=> {
                console.log(err);
            })
    }, [])
    return (
        <Container>
            <Grid container spacing={5} justify="center">
                {
                    juices.map(juice => (
                        <Grid item lg={4} md={6} sm={12} key={juice._id} >
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
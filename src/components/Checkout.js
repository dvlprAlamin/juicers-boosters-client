import { Button, Container, makeStyles, Table, TableBody, TableCell, TableHead, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetContext } from '../context';
import Loader from './Loader';
const useStyles = makeStyles((theme) => ({
    tableHeading: {
        fontWeight:700,
        fontSize:20,
        color:theme.palette.primary.main
    }
}));
const Checkout = () => {
    const {tableHeading} = useStyles();
    const {checkoutJuiceId, loggedInUser} = GetContext();
    console.log(checkoutJuiceId);
    const [checkoutJuice, setCheckoutJuice] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(()=> {
        axios.get(`https://banana-tart-95567.herokuapp.com/juices/${checkoutJuiceId}`)
            .then(res=> {
                // console.log(res.data[0]);
                setCheckoutJuice(res.data[0])
                setLoading(false)
            })
            .catch(err=> {
                console.log(err);
            })
    }, [checkoutJuiceId])

    const checkoutHandler = () => {
        const orderData = {
            email:loggedInUser.email,
            ingredient:checkoutJuice.ingredient,
            name:checkoutJuice.name,
            quantity:1,
            price:checkoutJuice.price,
            date: new Date(),
        }
        axios.post('https://banana-tart-95567.herokuapp.com/order', orderData)
      .then(res => {
        console.log(res.data);
        // setLoading(false)
      })
      .catch(err => {
        // console.log(err);
      });
    }
    return (
        <Container>
            {loading? <Loader/>:
            <>
                <Typography variant="h4" style={{marginBottom:25}}>Checkout</Typography>
            <Table>
                <TableHead>
                    <TableCell className={tableHeading}>Juice Name</TableCell>
                    <TableCell className={tableHeading} align="center">Quantity</TableCell>
                    <TableCell className={tableHeading} align="right">Price</TableCell>
                </TableHead>
                <TableBody>
                    <TableCell>{checkoutJuice.name}</TableCell>
                    <TableCell align="center">1</TableCell>
                    <TableCell align="right">${checkoutJuice.price}</TableCell>
                </TableBody>
            </Table>
            <div style={{textAlign:'right', marginTop:30}}>
            <Button component={Link} to='/orders' onClick={checkoutHandler} variant="contained" color="primary" >Checkout</Button>
            </div>
            </>}
        </Container>
    );
};

export default Checkout;
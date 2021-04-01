import { Button, Container, makeStyles, Table, TableBody, TableCell, TableHead, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GetContext } from '../context';
const useStyles = makeStyles((theme) => ({
    tableHeading: {
        fontWeight:700,
        fontSize:20,
        color:theme.palette.primary.main
    }
}));
const Checkout = () => {
    const {tableHeading} = useStyles();
    const {checkoutJuiceId} = GetContext();
    console.log(checkoutJuiceId);
    const [checkoutJuice, setCheckoutJuice] = useState({})
    useEffect(()=> {
        axios.get(`https://banana-tart-95567.herokuapp.com/juices/${checkoutJuiceId}`)
            .then(res=> {
                // console.log(res.data[0]);
                setCheckoutJuice(res.data[0])
            })
            .catch(err=> {
                console.log(err);
            })
    }, [checkoutJuiceId])
    return (
        <Container>
            
            <Typography variant="h4" style={{marginBottom:25}}>Checkout</Typography>
            {/* {<h2>Name: {checkoutJuice.name}</h2>} */}
            {/* {<h2>Price: ${checkoutJuice.price}</h2>} */}
            <Table>
                <TableHead>
                    <TableCell className={tableHeading}>Name</TableCell>
                    <TableCell className={tableHeading}>Quantity</TableCell>
                    <TableCell className={tableHeading}>Price</TableCell>
                </TableHead>
                <TableBody>
                    <TableCell>{checkoutJuice.name}</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>${checkoutJuice.price}</TableCell>
                </TableBody>
            </Table>
            <div style={{textAlign:'right', marginTop:30}}>
            <Button variant="contained" color="primary" >Checkout</Button>
            </div>
        </Container>
    );
};

export default Checkout;
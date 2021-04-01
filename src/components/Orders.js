import { Container, makeStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
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
const Orders = () => {
    const {tableHeading} = useStyles();
    const { loggedInUser } = GetContext();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get(`https://banana-tart-95567.herokuapp.com/orders?email=${loggedInUser.email}`)
            .then(res => {
                setOrders(res.data);
            })
    }, [loggedInUser])
    return (
        <Container>
            <Typography style={{marginBottom:30}} variant="h4">Orders</Typography>
            {orders.length > 0 ?
                <Table component={Paper}>
                <TableHead>
                    <TableRow>
                        <TableCell className={tableHeading}>Juice Name</TableCell>
                        <TableCell className={tableHeading} align="center">Quantity</TableCell>
                        <TableCell className={tableHeading} align="right">Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orders.map(order => <TableRow key={order._id}>
                            <TableCell component="th" scope="row">
                                {order.name}
                            </TableCell>
                            <TableCell align="center">{order.quantity}</TableCell>
                            <TableCell align="right">${order.price}</TableCell>
                            {/* <TableCell align="right"> </TableCell> */}
                        </TableRow>)
                    }
                </TableBody>
            </Table>:
            <Typography variant="h5">You didn't place any order yet.</Typography>}

        </Container>
    );
};

export default Orders;
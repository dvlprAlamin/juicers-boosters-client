import { Container, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GetContext } from '../context';
import Loader from './Loader';
const useStyles = makeStyles((theme) => ({
    tableHeading: {
        fontSize: 'calc(1vmax + 10px)',
        color: theme.palette.primary.main,
    },
    tableBody: {
        fontSize: 'calc(1vmax + 5px)'
    },
    table: {
        '@media(max-width:500px)': {
        }
    }
}));
const Orders = () => {
    const { tableHeading, tableBody } = useStyles();
    const { loggedInUser } = GetContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`https://banana-tart-95567.herokuapp.com/orders?email=${loggedInUser.email}`)
            .then(res => {
                setOrders(res.data);
                setLoading(false)
            })
    }, [loggedInUser]);
    const totalOrderPrice = orders.reduce((price, order) => price + (+order.price), 0)
    return (
        <Container>
            {loading ? <Loader /> :
                <>
                    <Typography style={{ marginBottom: 30, fontSize: 'calc(1vmax + 20px)' }} variant="h4">Orders</Typography>
                    {orders.length > 0 ?
                        <TableContainer component={Paper} >
                            <Table>
                                <TableHead>
                                    <TableRow >
                                        <TableCell className={tableHeading}>Juice Name</TableCell>
                                        <TableCell className={tableHeading} align="center">Ingredient</TableCell>
                                        <TableCell className={tableHeading} align="center">Quantity</TableCell>
                                        <TableCell className={tableHeading} align="right">Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        orders.map(order =>
                                            <TableRow key={order._id}>
                                                <TableCell className={tableBody}>{order.name}</TableCell>
                                                <TableCell className={tableBody} align="center">{order.ingredient}</TableCell>
                                                <TableCell className={tableBody} align="center">{order.quantity}</TableCell>
                                                <TableCell className={tableBody} align="right">${order.price}</TableCell>
                                            </TableRow>)
                                    }
                                    <TableRow>
                                        <TableCell colSpan="2" className={tableHeading} align="center">Total</TableCell>
                                        <TableCell className={tableHeading} align="center">{orders.length}</TableCell>
                                        <TableCell className={tableHeading} align="right">${totalOrderPrice}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer> :
                        <Typography variant="h5" align="center">You didn't place any order yet.</Typography>}
                </>}
        </Container>
    );
};

export default Orders;
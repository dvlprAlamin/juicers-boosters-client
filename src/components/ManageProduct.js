import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { Container, Typography } from '@material-ui/core';
import Loader from './Loader';
const useStyles = makeStyles((theme) => ({
    tableHeading: {
        fontSize: 'calc(1vmax + 10px)',
        color: theme.palette.primary.main,
    },
    tableBody: {
        fontSize: 'calc(1vmax + 5px)'
    },
    editBtn: {
        background: theme.palette.primary.main,
        color: '#fff',
        borderRadius: 3,
        marginRight: 5,
        cursor: 'pointer',
        padding: 1,
        fontSize: 'calc(1vmax + 16px)',
    },
    deleteBtn: {
        background: theme.palette.secondary.main,
        color: '#fff',
        borderRadius: 3,
        cursor: 'pointer',
        padding: 1,
        fontSize: 'calc(1vmax + 16px)',
    },
    tableContainer: {
        padding: '0 1rem 1rem 1rem',
        '@media(min-width:960px)': {
            paddingLeft: 216
        }
    },
    title: {
        marginBottom: 20,
        marginTop: 0,
        fontSize: 'calc(1vmax + 20px)',
        '@media(max-width:960px)': {
            margin: '2rem 0',
        }
    }
}));
const ManageProduct = () => {
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false)
    const { tableHeading, editBtn, deleteBtn, tableContainer, title, tableBody } = useStyles();
    const [juices, setJuices] = useState([]);
    useEffect(() => {
        axios.get('https://banana-tart-95567.herokuapp.com/juices')
            .then(res => {
                setJuices(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    const deleteJuice = (id, e) => {
        setProcessing(true)
        axios.delete(`https://banana-tart-95567.herokuapp.com/delete/${id}`)
            .then(res => {
                if (res.data) {
                    if (e.target.tagName === 'svg') {
                        e.target.parentElement.parentElement.style.display = "none";
                    }
                    if (e.target.tagName === 'path') {
                        e.target.parentElement.parentElement.parentElement.style.display = "none";
                    }
                }
                setProcessing(false)
            })
    }
    return (
        <div>
            <Sidebar />
            {loading ? <Loader /> :
                <Container className={tableContainer}>
                    <Typography variant="h4" className={title}>Manage Product</Typography>
                    <TableContainer component={Paper}>
                        <Table aria-label="Juice data">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={tableHeading}>Juice Name</TableCell>
                                    <TableCell className={tableHeading} align="center">Ingredient</TableCell>
                                    <TableCell className={tableHeading} align="center">Price</TableCell>
                                    <TableCell className={tableHeading} align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    juices.map(juice =>
                                        <TableRow key={juice._id}>
                                            <TableCell className={tableBody}>{juice.name}</TableCell>
                                            <TableCell className={tableBody} align="center">{juice.ingredient}</TableCell>
                                            <TableCell className={tableBody} align="center">{juice.price}</TableCell>
                                            <TableCell className={tableBody} align="right">
                                                <CreateIcon className={editBtn} />
                                                <DeleteIcon onClick={(e) => deleteJuice(juice._id, e)} className={deleteBtn} />
                                                {processing && <Loader />}
                                            </TableCell>
                                        </TableRow>)
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>}
        </div>
    );
};

export default ManageProduct;
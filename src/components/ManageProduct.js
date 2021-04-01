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
const useStyles = makeStyles((theme) => ({
    tableHeading: {
        fontWeight:700,
        fontSize:20,
        color:theme.palette.primary.main
    },
    editBtn: {
        background: theme.palette.primary.main,
        color: '#fff',
        borderRadius:3,
        marginRight:5,
        cursor:'pointer',
        padding:1
    },
    deleteBtn: {
        background: theme.palette.secondary.main,
        color: '#fff',
        borderRadius:3,
        cursor:'pointer',
        padding:1
    },
    tableContainer:{
        padding:'0 1rem 1rem 1rem',
        '@media(min-width:960px)' : {
            paddingLeft:216
        }
    },
    title:{
        marginBottom:20,
        marginTop:0,
        '@media(max-width:960px)' : {
            margin:'2rem 0',
        }
    }
}));
const ManageProduct = () => {

    const { tableHeading, editBtn, deleteBtn,tableContainer,title } = useStyles();
    const [juices, setJuices] = useState([]);
    useEffect(() => {
        axios.get('https://banana-tart-95567.herokuapp.com/juices')
            .then(res => {
                // console.log(res.data);
                setJuices(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    const deleteJuice = (id, e) => {
        axios.delete(`https://banana-tart-95567.herokuapp.com/delete/${id}`)
        .then(res => {
            if(res.data){
                if(e.target.tagName === 'svg'){
                    e.target.parentElement.parentElement.style.display = "none";
                }
                if(e.target.tagName === 'path'){
                    e.target.parentElement.parentElement.parentElement.style.display = "none";
                }
            }
                
        })
    }
    return (
        <div>
            <Sidebar />
            <Container className={tableContainer}>
            <Typography variant="h4" className={title}>Manage Product</Typography>
            <TableContainer component={Paper}>
                <Table aria-label="Juice data">
                    <TableHead>
                        <TableRow>
                            <TableCell className={tableHeading}>Juice Name</TableCell>
                            <TableCell className={tableHeading} align="right">Price</TableCell>
                            <TableCell className={tableHeading} align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            juices.map(juice => 
                            <TableRow key={juice._id}>
                                <TableCell component="th" scope="row">
                                    {juice.name}
                                </TableCell>
                                <TableCell align="right">{juice.price}</TableCell>
                                <TableCell align="right">
                                    <CreateIcon className={editBtn} />
                                    <DeleteIcon onClick={(e)=> deleteJuice(juice._id,e)} className={deleteBtn} />
                                </TableCell>
                            </TableRow>)
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            </Container>
        </div>
    );
};

export default ManageProduct;
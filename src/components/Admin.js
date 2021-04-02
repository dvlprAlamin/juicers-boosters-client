import React from 'react';
import Sidebar from './Sidebar';
import { Route } from "react-router-dom";
import AddProduct from './AddProduct';
import ManageProduct from './ManageProduct';
const Admin = () => {
    return (
        <>
            <Sidebar />
            <div style={{ paddingLeft: 200 }}>
                <Route path='/addProduct' component={AddProduct} />
                <Route path='/manageProduct' component={ManageProduct} />
            </div>
        </>
    );
};

export default Admin;
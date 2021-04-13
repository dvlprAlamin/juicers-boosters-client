import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

const NotFound = () => {
    const history = useHistory()
    return (
        <div style={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <Typography variant="h1" color="textPrimary">404</Typography>
            <Typography variant="h1" color="textPrimary">Page not found!</Typography>
            <Button onClick={() => history.push('/')} variant="contained" color="primary">Go Back</Button>
        </div>
    );
};

export default NotFound;
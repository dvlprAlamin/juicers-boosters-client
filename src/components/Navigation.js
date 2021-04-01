// import { faBars } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuIcon from '@material-ui/icons/Menu';
import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    IconButton,
    Drawer,
    Link,
    MenuItem,
    Avatar,
} from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { GetContext } from '../context';

const headersData = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Orders",
        href: "/orders",
    },
    {
        label: "Admin",
        href: "/addProduct",
    },
    {
        label: "Deals",
        href: "#",
    },
];

const useStyles = makeStyles(() => ({
    menuButton: {
        marginRight:30
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    drawerContainer: {
        padding: "20px 30px",
    },
    loginBtn:{
        textDecoration:'none',
        color:'inherit'
    },
    logoutBtn:{
        textDecoration:'none',
        color:'inherit',
        marginRight:40
    },
    userAvatar:{
        position:'absolute',
        top:12,
        right:12
    }
}));

export default function Navigation() {
    const {loggedInUser , logOut} = GetContext();
    const logOutHandler = async e => {
        try {
            await logOut();
        }catch(err){
            console.log(err);
        }
    }
    // console.log(loggedInUser);
    const { menuButton, toolbar, drawerContainer,loginBtn,logoutBtn,userAvatar } = useStyles();

    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
    });

    const { mobileView, drawerOpen } = state;

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 960
                ? setState((prevState) => ({ ...prevState, mobileView: true }))
                : setState((prevState) => ({ ...prevState, mobileView: false }));
        };
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
    }, []);

    const displayDesktop = () => {
        return (
            <Toolbar className={toolbar}>
                {juicersBoosters}
                <div>
                    {getMenuButtons()}
                </div>
            </Toolbar>
        );
    };

    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: true }));
        const handleDrawerClose = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: false }));

        return (
            <Toolbar>
                <IconButton
                    {...{
                        edge: "start",
                        color: "inherit",
                        "aria-label": "menu",
                        "aria-haspopup": "true",
                        onClick: handleDrawerOpen,
                    }}
                >
                    <MenuIcon />
          </IconButton>

                <Drawer
                    {...{
                        anchor: "left",
                        open: drawerOpen,
                        onClose: handleDrawerClose,
                    }}
                >
                    <div className={drawerContainer}>
                        {getDrawerChoices()}
                    </div>
                </Drawer>
                <div>{juicersBoosters}</div>
            </Toolbar>
        );
    };
    const getDrawerChoices = () => {
        return (
            <>
                {
                    headersData.map(({ label, href }) =>
                        <Link
                            {...{
                                component: RouterLink,
                                to: href,
                                color: "inherit",
                                style: { textDecoration: "none" },
                                key: label,
                            }}
                        >
                            <MenuItem>{label}</MenuItem>
                        </Link>)}
                        
                {loggedInUser && 
                <Avatar alt={loggedInUser.displayName} src={loggedInUser.photoURL} />}
                {loggedInUser ? 
                <RouterLink 
                onClick={logOutHandler}
                className={logoutBtn} 
                to="/login">
              <Button variant="outlined" color="inherit">
                Logout</Button></RouterLink> :
            <RouterLink className={loginBtn} to="/login">
              <Button variant="outlined" color="inherit">
                Login</Button></RouterLink>}
            </>
        )
    };

    const juicersBoosters = (
        <Typography variant="h6" component="h1">
            Juicers Boosters
        </Typography>
    );

    const getMenuButtons = () => {
        return (
            <>
                {headersData.map(({ label, href }) => (
                    <Button
                        {...{
                            key: label,
                            color: "inherit",
                            to: href,
                            component: RouterLink,
                            className: menuButton,
                        }}
                    >
                        {label}
                    </Button>
                ))}
                {loggedInUser && 
                <Avatar className={userAvatar} alt={loggedInUser.displayName} src={loggedInUser.photoURL} />}
                {loggedInUser ? 
                <RouterLink 
                onClick={logOutHandler}
                className={logoutBtn} to="/login">
              <Button variant="outlined" color="inherit">
                Logout</Button></RouterLink> :
            <RouterLink className={loginBtn} to="/login">
              <Button variant="outlined" color="inherit">
                Login</Button></RouterLink>}
            </>
        );
    };
    return (
        <header>
            <AppBar>
                {mobileView ? displayMobile() : displayDesktop()}
            </AppBar>
        </header>
    );
}
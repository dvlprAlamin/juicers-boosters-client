import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import CreateIcon from '@material-ui/icons/Create';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {  useState } from 'react';
import { Link } from "react-router-dom";

const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '.8rem 0',
    paddingLeft:'10%',
    opacity: '.8',
    transition: '.3s linear',
    borderRight: '4px solid transparent',
    '&:hover': {
      opacity: '1',
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
    },

  },
  active: {
    borderColor: theme.palette.primary.main,
  },
  navIcon: {
    color: theme.palette.primary.main,
    marginRight:10,
  },
  navLogoText: {
    color: theme.palette.primary.main,
    textAlign: 'center',
    margin:'1rem .3rem'
  },
  logoImg: {
    padding:'1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawer: {
    [theme.breakpoints.down('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
      display: 'none'
    },
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: '100%',
      display: 'none',
    },
    background:theme.palette.primary.main,
    top:48,
    boxShadow:'none'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Sidebar = props => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Typography variant="h6"
        className={classes.navLogoText}>
        Juicers Boosters
          </Typography>
      <Divider />
      <Link to='/manageProduct' className={classes.link}>
        <ListItem button className={classes.navItem} >
          <ViewModuleIcon className={classes.navIcon} />
          <ListItemText primary={'Manage Product'} />
        </ListItem>
      </Link>
      <Divider />
      <Link to='/addProduct' className={classes.link}>
        <ListItem button className={classes.navItem}>
          <AddIcon className={classes.navIcon} />
          <ListItemText primary={'Add Product'} />
        </ListItem>
      </Link>
      <Divider />
      <Link to='#' className={classes.link}>
        <ListItem button className={classes.navItem}>
          <CreateIcon className={classes.navIcon} />
          <ListItemText primary={'Edit Product'} />
        </ListItem>
      </Link>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <AppBar
        className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Typography variant="h6">
            Admin Panel
        </Typography>
        {/* <MenuIcon /> */}
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}


export default Sidebar;
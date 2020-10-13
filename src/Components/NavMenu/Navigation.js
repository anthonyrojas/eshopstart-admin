import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import LogoutButton from './LogoutButton';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    // width: drawerWidth,
    // flexShrink: 0,
    [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    background: '#1B2430'
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Nav = (props) => {
    const classes = useStyles();
    return (
        <Drawer
            className={classes.drawer}
            variant='permanent'
            classes={{
                paper: classes.drawerPaper
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List>
                    <ListItem>
                        <ListItemText>Products</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText>Categories</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText>Users</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <LogoutButton />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    )
}
export default Nav;
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import LogoutButton from './LogoutButton';
import {Link, withRouter} from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

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
    const [productsOpen, setProductsOpen] = React.useState(false);
    const handleProductClick = () => {
      setProductsOpen(!productsOpen);
    }
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
                    <ListItem 
                      button 
                      onClick={handleProductClick}
                      // component={Link} 
                      // selected={props.history.location.pathname === 'products'}
                      // to='/products'
                    >
                        <ListItemText>Products</ListItemText>
                        {productsOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse 
                      in={productsOpen}
                      timeout='auto'
                      unmountOnExit
                    >
                      <List component='div' disablePadding>
                        <ListItem
                          button
                          component={Link}
                          selected={props.location.pathname.toLowerCase() === '/products'}
                          to='/products'
                        >
                          <ListItemText>Product List</ListItemText>
                        </ListItem>
                        <ListItem 
                          button
                          component={Link}
                          selected={props.location.pathname.toLowerCase() === '/product'}
                          to='/product'
                        >
                          <ListItemText>Add Product</ListItemText>
                        </ListItem>
                      </List>
                    </Collapse>
                    <Divider />
                    <ListItem button component={Link} to='/'>
                        <ListItemText>Categories</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to='/users'>
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
export default withRouter(Nav);
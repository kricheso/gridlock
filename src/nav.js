import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Authentication from './services/authentication.js';

// Variables
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  toolbar: {
    backgroundColor: 'darkorange',
    color: 'white',
  },
  profilePhoto: {
    width: '27px',
    height: '27px',
    borderRadius: '50%',
    border: '2px solid #fff',
  },
  profileLink: {
    color: 'inherit',
    textDecoration: 'inherit',
    display: 'flex',
    alignItems: 'center',

  },
}));

// Function
export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [user, setUser] = useState(null);

  async function loginPress(){
    const user = await Authentication.logIn();
    if (!user) { console.log("Couldn't login."); }
    setUser(user);
  } // End of loginPress

  async function getCurrentUser() {
    // Wait half a second for auth dependencies to load.
    setTimeout(async () => {
      const _user = await Authentication.currentUser();
      if (!_user) { console.log("The user is not logged in."); return; }
      setUser(_user);
      console.log(_user);
    }, 500);
  }
  useEffect(getCurrentUser, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar color="white"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <Grid
          justify="space-between" // Add it here :)
          container
          spacing={24}
          >
            <Grid item>
              <div style={{display:'flex', alignItems:'center'}}>
              <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Gridlock
              </Typography>
              </div>
            </Grid>
            <Grid item>
              <div style={{display:'flex', alignItems:'center', height: '100%'}}>
                {user == null ? (
                  <div>
                    <Button color="inherit" onClick={() => {loginPress()}}>Login</Button>
                  </div>) :
                  <div>
                    {user != null &&<a className={classes.profileLink} href="/Profile">
                      <img className={classes.profilePhoto} src={user.photoUrl} alt={user.photoUrl.alt} />
                      &nbsp; &nbsp;
                      <p>
                        {user.displayName}
                      </p></a>
                    }
                  </div>
                }
              </div>
            </Grid>
          </Grid>


        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Home', 'Play', 'Create', 'Explore'].map((text, index) => (
            <ListItem key={text}>
              <Button href={"/"+text.toLowerCase()}>
                <ListItemText primary={text} />
              </Button>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}

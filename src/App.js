import logo from "./logo.svg";
import "./App.css";
import Login from "./login/Login";
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from "react-router-dom";
import React, { useState } from 'react';
import useIsLoggedIn from './login/useIsLoggedIn';
import PersistentDrawerLeft from './navigation/PersistentDrawerLeft'
import SimpleCard from './card/SimpleCard'
import TaskForm from './task-form/TaskForm';
import useListTask from './useListTask';
import Fab from '@material-ui/core/Fab'; 
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Profile from "./profile/Profile";
import SingUp from "./singup/SingUp"

function App() {
  // const LoginView = () => <Login success={loginSuccess} failed={loginFailed} />;
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(3),
      right: theme.spacing(6),
    }
  }));
  const { listTask, setListTask } = useListTask([]);
  const classes = useStyles();
  console.log(listTask, "$$$$$$$$$")
  const todoAppView = () => (
    <div> 
      {listTask.map((task, index) => <div key={index}><SimpleCard  prueba={task} /><br /></div>)}
      <Fab color="primary" aria-label="add" className={classes.fab} href="/newtask">
        <AddIcon />
      </Fab>
    </div>
  );

  const newTaskView = () => (
    <TaskForm setListTask={setListTask} />
  );

  const profileView = () => (
    <Profile />
  );

  const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();

  if (!isLoggedIn) {
    return (
    <Router>
      <Route exact path="/">
        {isLoggedIn ? <Redirect to="/todo" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
      </Route>
      <Route path="/singup">
        <SingUp />
      </Route>
      
      <Switch>
        <Route path="/todo">
        {!isLoggedIn ? <Redirect to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        </Route>
        <Route path="/newtask">
        {!isLoggedIn ? <Redirect to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        </Route>
        <Route path="/profile">
        {!isLoggedIn ? <Redirect to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        </Route>
      </Switch>
    </Router> 
    )
  }

  return (
    <div className="wrapper">
      <Router>
      <Route exact path="/">
        {isLoggedIn ? <Redirect to="/todo" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
      </Route>
      <Switch>
        <Route path="/todo">
        <PersistentDrawerLeft prueba={todoAppView}  />
        </Route>
        <Route path="/newtask" >
        <PersistentDrawerLeft prueba={newTaskView} />
        </Route>
        <Route path="/profile">
        <PersistentDrawerLeft prueba={profileView} />
      </Route>
      </Switch>
    </Router>

    </div>
  );
}

export default App;

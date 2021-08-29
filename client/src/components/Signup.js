import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import { Alert } from 'react-bootstrap';
import Preloader from "./Preloader";

//redux
import { userRegistration } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Your Keeper
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [preloader, setPreloader] = useState(false);


  const dispatch = useDispatch();
  const history = useHistory();

  const classes = useStyles();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { emailCheck, serverError } = useSelector((state) => state.userRegistration);
  // console.log(serverError);


    

  useEffect(() => {
    if (userInfo) {
      history.push("/")
    }

  }, [userInfo, history])

  useEffect(() => {
    if(emailCheck){
      setPreloader(true)
      setTimeout(function(){
      setPreloader(false)
      history.push("/")
      },2000)
      }
  }, [emailCheck, history])

  useEffect(() => {
    if(serverError !== null){
      setError(true)
      setErrorMsg("User with this email address already exist!")
      }
  }, [serverError, history])


  const submitHandler = (event) => {
    event.preventDefault();
    if (name && email && password) {
      if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
        if(password.match(/^[A-Za-z]\w{7,14}$/)){
          dispatch(userRegistration(name, email, password))

        }
        else{
          setError(true)
          setErrorMsg("password must be between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter")
        }

      }
      else{
        setError(true)
        setErrorMsg("This is not the right email")
      }

    } else {
      setError(true)
      setErrorMsg("Please fill all the fields")
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="h1" variant="h4" style={{ color: "#04009A" }}>
        Welcome To Your Keeper
      </Typography>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {error ? <Alert variant="danger">
          {errorMsg}
        </Alert> : ""}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Full Name"
                name="name"
                autoComplete="lname"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitHandler}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      {preloader? <Preloader/> : ""}
    </Container>
  );
}
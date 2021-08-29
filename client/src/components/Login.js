import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Alert} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Preloader from "./Preloader";


//redux
import {userLogin} from "../redux/actions/userAction";
import {useDispatch, useSelector} from "react-redux";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [preloader, setPreloader] = useState(false);
  // console.log(email);
  // console.log(password);

 

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const {userInfo, serverError, isAuthenticate} = useSelector((state)=> state.userLogin);
  // console.log(serverError);
  useEffect(() => {
    if(userInfo){
      setPreloader(true)
      setTimeout(function(){
      setPreloader(false)
      history.push("/")
      },2000)
    }

  }, [userInfo, history])

  useEffect(() => {
    if(serverError){
      setError(true);
      setErrorMsg("Invalid email or password");
    }

  }, [serverError])

  // console.log(error);

  const submitHandler = (event) =>{
    event.preventDefault();
    if(email && password){
      dispatch(userLogin(email, password));
      if(isAuthenticate){
            history.push("/")
      }
    }
    else{
      setError(true)
      setErrorMsg("Please fill all the fields")
    }
};
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="h1" variant="h4" style={{color:"#04009A"}}>
          Welcome To Your Keeper
        </Typography>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {error ? <Alert variant="danger">
          {errorMsg}
        </Alert> : ""}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            href={"/"}
            onClick={submitHandler}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                "Don't have an account? Sign Up"
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      {preloader? <Preloader/> : ""}
    </Container>
  );
}
import React, { useState } from 'react';
import {
  Typography,
  makeStyles,
  Button,
  OutlinedInput,
  Grid,
  Box,
} from '@material-ui/core';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Textfield from '../components/partials/FormUI/Textfield';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: '100vh',
    display: 'flex',
    '@media (max-width: 900px)': {
      paddingLeft: 0,
    },
    '@media (max-width: 667px)': {
      flexDirection: 'column',
      height: 'auto',
      maxHeight: '100000000px',
    },
  },
  root_logo: {
    fontSize: '1.2rem',
    fontWeight: '500',
    fontFamily: 'Mulish',
    marginLeft: '5px',
  },
  root_left: {
    minWidth: '40%',
    minHeight: '100%',
    padding: '50px 100px',
    '@media (max-width: 1050px)': {
      minWidth: '40%',
      padding: '50px 50px',
    },
    '@media (max-width: 830px)': {
      padding: '50px 20px',
    },
  },
  root_right: {
    minWidth: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: theme.palette.green,
    '& :nth-child(1)': {
      height: '60%',
      width: '70%',
    },
    '& > :nth-child(2)': {
      fontFamily: 'Mulish',
      fontSize: '2rem',
      width: '50%',
      color: 'white',
    },
    '@media (max-width: 900px)': {
      '& :nth-child(1)': {
        width: '90%',
      },
      '& > :nth-child(2)': {
        width: '65%',
      },
    },
    '@media (max-width: 667px)': {
      display: 'none',
    },
  },
  root_left_upper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '100px',
    '& > :nth-child(2)': {
      textTransform: 'capitalize',
      display: 'flex',
      alignItems: 'center',
      height: '30px',
      color: theme.palette.secondary.main,
    },
  },
  root_left_lower: {
    //border: '1px solid red',
    '& > :nth-child(1)': {
      fontFamily: 'Mulish',
      fontSize: '.9rem',
    },
    '& > :nth-child(2)': {
      fontFamily: 'Mulish',
      fontSize: '1.8rem',
      fontWeight: '700',
    },
  },
  log_input: {
    height: '43px',
    width: '100%',
    marginTop: '10px',
  },
  login_button: {
    width: '100%',
    marginTop: '20px',
    background: theme.palette.green,
    color: 'white',
    '& :hover': {
      color: 'black',
      //  background: 'lightgreen',
    },
  },
  sign_up_google: {
    cursor: 'pointer',
    display: 'flex',
    border: '1px solid rgba(0,0,0,0.2)',
    borderRadius: '5px',
    padding: '10px 10px',
    justifyContent: 'center',
    marginTop: '10px',
    '& > :nth-child(2)': {
      fontFamily: 'Mulish',
      fontSize: '1rem',
      marginLeft: '7px',
      color: theme.palette.secondary.main,
    },
  },
  root_logo_wrapper: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  recommendation: {
    fontFamily: 'Mulish',
    fontSize: '.9rem',
  },
  recommendation_link: {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: '.9rem',
    cursor: 'pointer',
    marginLeft: '5px',
  },
}));

export default function Login() {
  let location = useLocation();
  let from = location.state?.from;
  let show = location.state?.show;
  const [state, setstate] = useState(show || 'login');
  const {
    root,
    root_logo,
    root_left,
    root_right,
    root_left_upper,
    root_left_lower,
    log_input,
    login_button,
    sign_up_google,
    root_logo_wrapper,
    recommendation,
    recommendation_link,
  } = useStyles();
  let navigate = useNavigate();

  const signUp = () => {
    return (
      <div className={root_left_lower}>
        <Typography>get your food</Typography>
        <Typography variant="h1" component="h1">
          Create an Account
        </Typography>
        {/* third */}
        <Box marginTop="20px">
          <Formik
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={async (values) => {
              console.log('values', values);
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Invalid email format')
                .required('Required'),
              password: Yup.string()
                .min(6, 'password must be atleast 6 characters')
                .required('Password is required'),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'password must match')
                .required('Please confirm password 😱'),
            })}
          >
            {({ isSubmitting }) => (
              <Form autoComplete="off">
                <Grid container>
                  <Grid xs={12} item>
                    <Box marginTop="10px">
                      <Textfield name="email" helpertext="Email Address" />
                    </Box>

                    <Box marginTop="10px">
                      <Textfield
                        type="password"
                        name="password"
                        helpertext="Password"
                      />
                    </Box>
                    <Box marginTop="10px">
                      <Textfield
                        type="password"
                        name="confirmPassword"
                        helpertext="Confirm Password"
                      />
                    </Box>
                    <Box>
                      <Button
                        className={login_button}
                        disableElevation
                        variant="contained"
                        type="submit"
                      >
                        Sign Up
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>

        {/* <div className={sign_up_google}>
      <img src="./social-google.svg" />
      <Typography>Sign up with Google</Typography>
    </div> */}
        <Box alignItems="center" display="flex" marginTop="10px">
          <Typography className={recommendation}>
            Already have an account?
          </Typography>
          <Typography
            onClick={() => setstate('login')}
            color="secondary"
            className={recommendation_link}
          >
            Log In
          </Typography>
        </Box>
      </div>
    );
  };

  const signIn = () => {
    return (
      <div className={root_left_lower}>
        <Typography>get your food</Typography>
        <Typography variant="h1" component="h1">
          Login to Your Account
        </Typography>
        {/* third */}
        <Box marginTop="20px">
          <Formik
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={async (values) => {
              console.log('values', values);
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Invalid email format')
                .required('Required'),
              password: Yup.string()
                .min(6, 'password must be atleast 6 characters')
                .required('Password is required'),
            })}
          >
            {({ isSubmitting }) => (
              <Form autoComplete="off">
                <Grid container>
                  <Grid xs={12} item>
                    <Box marginTop="10px">
                      <Textfield name="email" helpertext="Email Address" />
                    </Box>

                    <Box marginTop="10px">
                      <Textfield
                        type="password"
                        name="password"
                        helpertext="Password"
                      />
                    </Box>

                    <Box>
                      <Button
                        className={login_button}
                        disableElevation
                        variant="contained"
                        type="submit"
                      >
                        Sign In
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>

        {/* <div className={sign_up_google}>
        <img src="./social-google.svg" />
        <Typography>Sign up with Google</Typography>
      </div> */}
        <Box alignItems="center" display="flex" marginTop="10px">
          <Typography className={recommendation}>
            Dont have an account?
          </Typography>
          <Typography
            onClick={() => setstate('signup')}
            color="secondary"
            className={recommendation_link}
          >
            Sign Up
          </Typography>
        </Box>
      </div>
    );
  };

  return (
    <div className={root}>
      <div className={root_left}>
        <div className={root_left_upper}>
          <div
            onClick={() => {
              navigate(`${from || '/'}`);
            }}
            className={root_logo_wrapper}
          >
            <BsArrowLeft />
            <Typography className={root_logo} variant="h1">
              Go Back
            </Typography>
          </div>

          {state === 'login' ? (
            <Button onClick={() => setstate('signup')} variant="outlined">
              Sign Up
            </Button>
          ) : (
            <Button onClick={() => setstate('login')} variant="outlined">
              Sign In
            </Button>
          )}
        </div>

        {/* show either login or signup based on state variable */}
        {state === 'login' ? signIn() : signUp()}
      </div>
      <div className={root_right}>
        <img src="./macaroni-1469.png" />
        <Typography variant="h1">
          With a free Account getting food has never been easier
        </Typography>
      </div>
    </div>
  );
}

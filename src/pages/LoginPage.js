import React, { useState, useEffect } from "react";
import { useHistory } from "../helpers/history";
import { makeStyles } from "@material-ui/styles";
import { Button, Box, Grid, Paper, LinearProgress } from "@material-ui/core";
import TextInput from "../components/inputs/TextInput";
import { useTranslations } from "../helpers/i18n";
import { useModulesManager } from "../helpers/modules";
import Helmet from "../helpers/Helmet";
import { useAuthentication } from "../helpers/hooks";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: theme.paper.paper,
  logo: {
    maxHeight: 100,
    width: 100
  },
}));

const LoginPage = ({ logo }) => {
  const classes = useStyles();
  const history = useHistory();
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations("core.LoginPage", modulesManager);
  const [credentials, setCredentials] = useState({});
  const [hasError, setError] = useState(false);
  const auth = useAuthentication();
  const [isAuthenticating, setAuthenticating] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/");
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setAuthenticating(true);
    if (await auth.login(credentials)) {
      history.push("/");
    } else {
      setError(true);
      setAuthenticating(false);
    }
  };

  const redirectToForgotPassword = (e) => {
    e.preventDefault();
    history.push("/forgot_password");
  };

  return (
    <>
      {isAuthenticating && (
        <Box position="absolute" top={0} left={0} right={0}>
          <LinearProgress className="bootstrap" />
        </Box>
      )}
      <div className={classes.container}>
        <Helmet title={formatMessage("pageTitle")} />
        <style>
         {
          `
   
.mponicsLogo {
  width: auto; 
  max-height: 42px;
  margin: 0 auto 32px; 
}


.MuiAutocomplete-inputRoot[class*="MuiInput-root"] .MuiAutocomplete-input:first-child {
    padding: 19px 9px;
}

.MuiFormControl-root .MuiInput-underline:before {
  display:none;
}

.MuiFormControl-root .MuiInput-underline:after {
  display:none;
}

.MuiInputBase-inputMultiline {
  height: auto;
  resize: none;
  padding: 0;
  margin-top: -10px;
}

input[type=file] {
  display: block;
  margin-left: 20px;
}


svg:not(:root) {
  overflow: hidden;
  height: 34px;
  font-size: 22px;
}


.makeStyles-paper-5 {
  margin: 10px;
  background-color: white !important;
  padding: 18px !important;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px !important;
}

.makeStyles-paper-25 {
  margin: 10px;
  background-color: white !important;
  padding: 18px !important;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px !important;


}
.MuiPaper-elevation2 {
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(25,39,52,0.06),0px 0px 4px rgba(25,39,52,0.12);
  border-radius: 8px;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='153' height='198'%3E%3Cpath d='M153 1.188A76.967 76.967 0 00139.5 0C97.25 0 63 34.25 63 76.5S97.25 153 139.5 153c4.606 0 9.118-.407 13.5-1.188V1.187z' fill='%23F48943' fill-opacity='.4'/%3E%3Cpath d='M153 152.2V198H0c.2-43.3 31.9-79.1 73.4-85.9 4.6-.8 9.3-1.1 14.1-1.1 26.1 0 49.5 11.4 65.5 29.5' fill='%23F48943' fill-opacity='.2'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: 100% 100%;
  background-size: 50%;
  max-width: 1290px;
  margin: 0 auto;
}

.MuiBox-root-7 {
  width: 620px;
  padding: 48px;
  margin: 0 auto;
}

.MuiPaper-root .MuiGrid-container {
  background: none;
}

          `
         }
        </style>
        <Paper  elevation={2}>
          <form onSubmit={onSubmit}>
            <Box p={6} width={580}>
              <Grid container spacing={2} direction="column" alignItems="stretch">
                <Grid item container direction="row" alignItems="center">
                    <img className="mponicsLogo" src={logo} />
                </Grid>
                <Grid item>
                  <TextInput
                    required
                    readOnly={isAuthenticating}
                    label={formatMessage("username.label")}
                    fullWidth
                    defaultValue={credentials.username}
                    onChange={(username) => setCredentials({ ...credentials, username })}
                  />
                </Grid>
                <Grid item>
                  <TextInput
                    required
                    readOnly={isAuthenticating}
                    type="password"
                    label={formatMessage("password.label")}
                    fullWidth
                    onChange={(password) => setCredentials({ ...credentials, password })}
                  />
                </Grid>
                {hasError && (
                  <Grid item>
                    <Box color="error.main">{formatMessage("authError")}</Box>
                  </Grid>
                )}
                <Grid item>
                  <Button
                    fullWidth
                    type="submit"
                    disabled={isAuthenticating || !(credentials.username && credentials.password)}
                    color="primary"
                    variant="contained"
                  >
                    {formatMessage("loginBtn")}
                  </Button>
                </Grid>
                <Grid item>
                  <Button onClick={redirectToForgotPassword}>{formatMessage("forgotPassword")}</Button>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default LoginPage;

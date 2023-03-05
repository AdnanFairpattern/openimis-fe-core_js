import React, { useState } from "react";

import { makeStyles } from "@material-ui/styles";
import { Button, Box, Grid, Paper, Typography } from "@material-ui/core";
import TextInput from "../components/inputs/TextInput";
import { useTranslations } from "../helpers/i18n";
import { useModulesManager } from "../helpers/modules";
import Helmet from "../helpers/Helmet";
import { useGraphqlMutation } from "../helpers/hooks";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: "30%",
    left: 0,
    right: 0,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
  },
  paper: theme.paper.paper,
  logo: {
    maxHeight: 100,
  },
}));

const ForgotPasswordPage = (props) => {
  const classes = useStyles();
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations("core.ForgotPasswordPage", modulesManager);
  const [username, setUsername] = useState();
  const [isDone, setDone] = useState(false);
  const { isLoading, mutate } = useGraphqlMutation(
    `
    mutation resetPassword($input: ResetPasswordMutationInput!) {
      resetPassword(input: $input) {
        clientMutationId
        success
        error
      }
    }
  `,
    {
      wait: false,
    },
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    await mutate({ username });
    await setDone(true);
  };

  return (
    <>
      <div className={classes.container}>
      <style>
         {
          `
      

        .MuiFormControl-root .MuiInputLabel-formControl {
          font-size: 14px;
          color: #1f272e;
          margin-top: 12px;
          margin-left: 27px;
      }

   

 
     .MuiInputLabel-shrink {
        transform: translate(0, -19px) scale(0.75);
        transform-origin: top left;
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
label + .MuiInput-formControl {
  margin-top: 16px;
  margin-bottom: 18px;
}
.MuiButton-label {
  width: 100%;
  display: inherit;
  font-size: 15px;
  padding: 6px 0px;
  font-weight: bold;
  align-items: inherit;
  justify-content: inherit;
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
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px !important;
}
          `
         }
        </style>
        <Helmet title={formatMessage("pageTitle")} />
        <Paper elevation={2}>
          <form onSubmit={onSubmit}>
            <Box p={3} width={580}>
              {!isDone && (
                <Grid container spacing={2} direction="column" alignItems="stretch">
                  <Grid item>
                    <h1>{formatMessage("recoverTitle")}</h1>
                  </Grid>
                  <Grid item>
                    <Typography>{formatMessage("explanationMessage")}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{formatMessage("contactAdministrator")}</Typography>
                  </Grid>
                  <Grid item>
                    <TextInput
                      required
                      readOnly={isLoading}
                      label={formatMessage("username.label")}
                      fullWidth
                      onChange={(username) => setUsername(username)}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      fullWidth
                      type="submit"
                      disabled={!username || isLoading}
                      color="primary"
                      variant="contained"
                    >
                      {formatMessage("submitBtn")}
                    </Button>
                  </Grid>
                </Grid>
              )}

              {isDone && <h1>{formatMessage("done")}</h1>}
            </Box>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default ForgotPasswordPage;

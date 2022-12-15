import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Container, Drawer, IconButton, List, ListItem, ListItemText, Link, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { RoundedButton } from "../roundedButton";

const NavBar: React.FC = () => {
  const router = useRouter();

  const loginButton = () => {
    return (
      <RoundedButton
        component="a"
        href="/login"
        color="primary"
        variant="contained"
        disableElevation
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          router.push("/login");
        }}
      >
        Login
      </RoundedButton>
    );
  };

  const signUpButton = () => {
    return (
      <RoundedButton
        component="a"
        href="/signUp"
        color="primary"
        disableElevation
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          router.push("/signUp");
        }}
      >
        Sign Up
      </RoundedButton>
    );
  };

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{
        backgroundColor: "white",
      }}
    >
      <Toolbar disableGutters>
        <Container>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
            }}
          >
            <RoundedButton
              component="a"
              href="/"
              color="primary"
              disableElevation
              size="large"
              sx={{
                color: "black",
                fontSize: "15px",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push("/");
              }}
            >
              RefnWrite
            </RoundedButton>
            <RoundedButton
              component="a"
              href="/subscription"
              color="primary"
              disableElevation
              size="large"
              sx={{
                color: "black",
                fontSize: "15px",
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push("/subscription");
              }}
            >
              Subscriptions
            </RoundedButton>
            <Stack direction="row">
              {signUpButton()}
              {loginButton()}
            </Stack>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

import React, { Component } from 'react';
import "./Header.css";
import { withStyles, ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import FastfoodIcon from "@material-ui/icons/Fastfood";
import SearchIcon from "@material-ui/icons/Search";
import Snackbar from "@material-ui/core/Snackbar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";

//Header Styles to make the header responsive
const styles = (theme) => ({
    grow: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: "#263238",
        boxShadow: "none",
    },
    headerTools: {
        [theme.breakpoints.only("xs")]: {
            flexDirection: "column",
            alignItems: "flex-start",
        },
    },
    logo: {
        "&:hover": {
            backgroundColor: "transparent !important",
        },
        cursor: "default",
    },
    searchBox: {
        [theme.breakpoints.only("xs")]: {
            marginBottom: theme.spacing(1.5),
        },
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        width: "30ch",
    },
    headerLoginBtn: {
        [theme.breakpoints.only("xs")]: {
            marginBottom: theme.spacing(1.5),
        },
    },
    customerProifleBtn: {
        color: "white",
        [theme.breakpoints.only("xs")]: {
            marginBottom: theme.spacing(1.5),
        },
    },
});
// To change bottom color of search to white when search is clicked
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#ffffff",
        },
    },
});

class Header extends Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            value: 0,
            loginContactNoRequired: "dispNone",
            loginContactNo: "",
            loginContactNoRequiredMessage: "required",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            loginPasswordRequiredMessage: "required",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            openLoginSnackBar: false,
            loginErroMessage: "",
            loginErroMessageRequired: "dispNone",
            signupFirstname: "",
            signupFirstnameRequired: "dispNone",
            singupLastname: "",
            signupEmail: "",
            signupEmailRequired: "",
            signupPassword: "",
            signupPasswordRequired: "dispNone",
            signupContactNo: "",
            signupContactNoRequired: "dispNone",
            signupEmailRequiredMessage: "required",
            signupPasswordRequiredMessage: "required",
            signupContactNoRequiredMessage: "required",
            openSignupSnackBar: false,
            signupErrorMessage: "",
            signupErrorMessageRequired: "dispNone",
            menuState: false,
            anchorEl: null,
        };
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar className={classes.headerTools}>
                        <IconButton disableRipple={true} className={classes.logo} edge="start" color="inherit" aria-label="app logo" >
                            <FastfoodIcon />
                        </IconButton>
                        <div className={classes.grow} />
                        {this.props.showSearchBox ? (
                            <div className={classes.searchBox}>
                                <ThemeProvider theme={theme}>
                                    <InputLabel htmlFor="search-box-input" />
                                    <Input id="search-box-input"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        }
                                        placeholder="Search by Restaurant Name"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }} onChange={this.props.searchHandler} />
                                </ThemeProvider>
                            </div>
                        ) : null}
                        <div className={classes.grow} />
                        {!this.state.loggedIn ? (
                            <div className={classes.headerLoginBtn}>
                                <Button variant="contained" color="default" startIcon={<AccountCircle />} onClick={this.openModalHandler}>
                                    Login
                                </Button>
                            </div> ) : (
                            <div className={classes.customerProifleBtn}>
                                <Button id="customer-profile" startIcon={<AccountCircle />} onClick={this.onProfileIconClick} >
                                    {sessionStorage.getItem("first-name")}
                                </Button>
                                <Menu id="profile-menu" open={this.state.menuState} onClose={this.onMenuClose} anchorEl={this.state.anchorEl}             getContentAnchorEl={null} anchorOrigin={{ vertical: "bottom", horizontal: "left" }} keepMounted>
                                    <MenuItem style={{ minHeight: 48 }} onClick={this.onMyProfile}>
                                        <Typography>
                                            <Link to={"/profile"} style={{ textDecoration: "none", color: "black" }} >
                                                My Profile
                                            </Link>
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem style={{ minHeight: 48 }} onClick={this.onLogout}>
                                        <Link to={"/"} style={{textDecoration: "none", color: "black"}}>
                                            <Typography>Logout</Typography>
                                        </Link>
                                    </MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>

            </div>
        );
    }

    openModalHandler = () => {
        this.setState({
          modalIsOpen: true,
          value: 0,
          loginContactNoRequired: "dispNone",
          loginContactNo: "",
          loginPasswordRequired: "dispNone",
          loginPassword: "",
          loginErroMessage: "",
          loginErroMessageRequired: "dispNone",
          signupFirstname: "",
          signupFirstnameRequired: "dispNone",
          singupLastname: "",
          signupEmail: "",
          signupEmailRequired: "dispNone",
          signupPassword: "",
          signupPasswordRequired: "dispNone",
          signupContactNo: "",
          signupContactNoRequired: "dispNone",
          signupErrorMessage: "",
          signupErrorMessageRequired: "dispNone",
        });
      };

    onProfileIconClick = (e) => {
        this.setState({
          menuState: !this.state.menuState,
          anchorEl: e.currentTarget,
        });
      };
    
      onMyProfile = () => {
        this.setState({
          loggedIn: true,
        });
      };
    
      onLogout = () => {
        sessionStorage.removeItem("access-token");
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("first-name");
        this.setState({
          loggedIn: false,
        });
        this.onMenuClose();
      };
}

export default Header;
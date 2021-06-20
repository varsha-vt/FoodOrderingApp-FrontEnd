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


class Header extends Component {

    render() {
        return (
            <div>
                <AppBar position="static" className="AppBar">
                    <Toolbar>
                        <IconButton className="icon" edge="start" color="inherit" aria-label="app logo" >
                            <FastfoodIcon />
                        </IconButton>
                        <div className="SearchBox">
                            <ThemeProvider>
                                <InputLabel htmlFor="search-box-input" />
                                <Input
                                    id="search-box-input"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    }
                                    placeholder="Search by Restaurant Name"
                                />
                            </ThemeProvider>
                        </div>
                        <div className="LoginButton">
                            <Button variant="contained" color="default" >
                                Login
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Header;
import React, { Component, Fragment } from 'react';
import "./Details.css"
import Header from '../../common/header/Header'
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import AddIcon from "@material-ui/icons/Add";
import Card from "@material-ui/core/Card";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import RemoveIcon from "@material-ui/icons/Remove";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
class Details extends Component {

    constructor() {
        super();
        this.state = {
            id: null,
            restaurant_name: null,
            photo_URL: null,
            customer_rating: null,
            average_price: null,
            number_customers_rated: null,
            locality: null,
            categories: [],
            open: false,
            totalAmount: 0,
            totalItems: 0,
            cartEmpty: false,
            orderItems: { id: null, items: [], total: 0 },
            cartItems: [],
            cartItem: {},
            itemQuantityDecreased: false,
            nonloggedIn: false,
            itemRemovedFromCart: false,
            itemQuantityIncreased: false,
            itemAddedFromCart: false,
        };
    }

    render() {
        return (
            <div>
                <Header baseUrl={this.props.baseUrl} />
                {this.state.text}
                <div className="main-container-body">
                    <div className="restaurant-details-container">
                        <div className="restaurant-left-container">
                            <img src={this.state.photo_URL} alt="none" className="restaurant-image" />
                        </div>
                        <div className="restaurant-right-container">
                            <div style={{ fontWeight: "medium", fontSize: "30px", paddingTop: "10px", paddingBottom: "10px"}}> {this.state.restaurant_name}</div>
                            <div style={{ fontWeight: "medium", fontSize: "16px", paddingBottom: "10px" }}> {this.state.locality}</div>
                            <div style={{ fontSize: "14px", paddingBottom: "20px" }}>
                                {this.state.categories.map((category, index) => (
                                    <span key={category.id + "category"}>
                                        {category.category_name}
                                        {index < this.state.categories.length - 1 ? ", " : " "}{" "}
                                    </span>))} 
                            </div>
                            <div className="rating-section">
                                <div className="rating-section-left">
                                    <i className="fa fa-star" aria-hidden="true"
                                        style={{
                                            paddingRight: "3px",
                                            paddingBottom: "3px",
                                            paddingLeft: "2px",
                                        }}>
                                    </i>
                                    {this.state.customer_rating}
                                    <div style={{ color: "gray", fontSize: "12px" }}>AVERAGE RATING BY</div>
                                    <div style={{ color: "gray", fontSize: "12px"}}> {this.state.number_customers_rated} CUTOMERS</div>
                                </div>
                                <div className="rating-section-right">
                                    <i className="fa fa-inr" aria-hidden="true" style={{ paddingRight: "4px",  paddingBottom: "3px", paddingLeft: "2px" }}>
                                    </i>
                                    {this.state.average_price}
                                    <div style={{ color: "gray", fontSize: "12px" }}>AVERAGE COST FOR</div>
                                    <div style={{ color: "gray", fontSize: "12px" }}>TWO PEOPLE</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="category-items-cart-container">
                        <div className="category-items-container">
                            {this.state.categories.map((category) => (
                                <div className="category" key={"category" + category.id}>
                                    <span style={{color: "grey",fontWeight: "bolder"}} >
                                        {category.category_name.toUpperCase()}
                                    </span>{" "}
                                    <Divider style={{ marginTop: "10px", marginBottom: "10px", width: "90%"}}/>
                                    {category.item_list.map((item) => (
                                        <Grid container key={item.id} style={{ marginBottom: 5 }}>
                                            <Grid item xs={1} lg={1}>
                                                {item.item_type === "VEG" ? (
                                                    <span className="fa fa-circle" aria-hidden="true" style={{ fontSize: "12px", color: "green" }}/>) : (
                                                    <span className="fa fa-circle" ria-hidden="true" style={{ fontSize: "12px", color: "red" }} />
                                                )}
                                            </Grid>
                                            <Grid item xs={5} lg={6}>
                                                <Typography>
                                                    <span className="item-name">
                                                        {" "}
                                                        {this.Capitalize(item.item_name)}{" "}</span>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={3} lg={2}>
                                                <div className="pricePerItem">
                                                    <span>
                                                        <i className="fa fa-inr" aria-hidden="true"></i>
                                                        <span style={{ paddingLeft: "2px" }}> {item.price.toFixed(2)} </span>
                                                    </span>
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} lg={1}></Grid>
                                            <Grid item xs={2} lg={2}>
                                                <IconButton style={{ padding: 0, float: "left" }}>
                                                    <AddIcon style={{ padding: 0 }} fontSize="small" />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="cart-container">
                            <Card>
                                <CardContent>
                                    <div style={{ fontWeight: "bold" }}>
                                        <i style={{ paddingRight: "20px" }}>
                                            <Badge className="badge" badgeContent={this.state.totalItems} color="primary" showZero>
                                                <ShoppingCartIcon />
                                            </Badge>
                                        </i> My Cart
                                    </div>
                                    <div className="cart-item-list">
                                        <Grid container>
                                            {this.state.orderItems.items !== undefined
                                                ? this.state.orderItems.items.map((item, index) => (
                                                    <Fragment key={item.id}>
                                                        <Grid item xs={2} lg={2}>
                                                            {item.type === "VEG" ? (
                                                                <span className="fa fa-stop-circle-o" aria-hidden="true"
                                                                    style={{
                                                                        fontSize: "12px",
                                                                        color: "green",
                                                                        paddingRight: "12px",
                                                                    }}/>
                                                            ) : (
                                                                <span className="fa fa-stop-circle-o" aria-hidden="true"
                                                                    style={{
                                                                        fontSize: "12px",
                                                                        color: "red",
                                                                        paddingRight: "12px",
                                                                    }}/>
                                                            )}
                                                        </Grid>
                                                        <Grid item xs={3} lg={4}>
                                                            <Typography>
                                                                {this.Capitalize(item.name)}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={3} lg={3} style={{ flexWrap: "wrap" }}>
                                                            <div className="add-remove-icon">
                                                                <IconButton className="add-remove-button-hover" style={{ display: "flex", padding: 0 }}>
                                                                    <RemoveIcon
                                                                        fontSize="default" style={{
                                                                            color: "black",
                                                                            fontWeight: "bolder",
                                                                        }}/>
                                                                </IconButton>
                                                                <Typography style={{ fontWeight: "bold" }}>
                                                                    {item.quantity}
                                                                </Typography>
                                                                <IconButton
                                                                    className="add-remove-button-hover"
                                                                    style={{ display: "flex", padding: 0 }}
                                                                    >
                                                                    <AddIcon
                                                                        fontSize="default"
                                                                        style={{
                                                                            color: "black",
                                                                            fontWeight: "bolder",
                                                                        }}/>
                                                                </IconButton>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={4} lg={3}>
                                                            <span style={{ float: "right" }}>
                                                                <i
                                                                    className="fa fa-inr"
                                                                    aria-hidden="true"
                                                                ></i>
                                                                <span style={{ paddingLeft: "2px" }}>
                                                                    {item.priceForAll.toFixed(2)}
                                                                </span>
                                                            </span>
                                                        </Grid>
                                                    </Fragment>
                                                ))
                                                : null}
                                            <Grid item xs={8} lg={9}>
                                                <div style={{ marginTop: 15, marginBottom: 15 }}>
                                                    <span style={{ fontWeight: "bold" }}>
                                                        TOTAL AMOUNT
                                                    </span>
                                                </div>
                                            </Grid>
                                            <Grid item xs={4} lg={3}>
                                                <div style={{ marginTop: 15, marginBottom: 15 }}>
                                                    <span style={{ fontWeight: "bold", float: "right" }}>
                                                        <i className="fa fa-inr" aria-hidden="true" style={{ paddingRight: "2px" }}></i>
                                                        {this.state.totalAmount.toFixed(2)}
                                                    </span>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button className="checkout" variant="contained" color="primary" >
                                                    <Typography>CHECKOUT</Typography>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Details;
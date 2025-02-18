  import { Container, PaginationItem } from "@mui/material";
  import React, { useEffect, useState, useContext } from "react";
  import { useNavigate } from "react-router-dom";
  import Card from "@mui/material/Card";
  import CardActions from "@mui/material/CardActions";
  import CardContent from "@mui/material/CardContent";
  import CardMedia from "@mui/material/CardMedia";
  import Button from "@mui/material/Button";
  import Typography from "@mui/material/Typography";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import CircularProgress from "@mui/material/CircularProgress";
  import { db } from "../firebase";
  import { Link } from "react-router-dom";
  import "../App.css";
  import { ShoppingBag } from "@mui/icons-material";
  import { Cartcontext } from "./CartComponents/contexts/cartcontext";
  import { useMoodboard } from "./CartComponents/contexts/MoodboardContext";
  import Filters from "./Filters";

  const Products = ({ data }) => {
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const { updatecart } = useContext(Cartcontext);
    const [filteredData, setFilteredData] = useState([]);
    const [brandsBar, setBrandsBar] = useState([]);
    const navigate = useNavigate();
    const { addToMoodboard } = useMoodboard();

     const handleAddToMoodboard = (product) => {
       const category = prompt(
         "Enter the category (party,sport, wanderlust ,sanskari ,casual ,formal)"
       );
       addToMoodboard(product, category);
       
     };

    useEffect(() => {
        Fetchdata();
    }, [data]);

    useEffect(() => {
        setBrands();
    }, [loading]);

    const Fetchdata = async () => {
        setInfo([]);
        setLoading(true);
        setBrandsBar([]);
        setFilteredData([]);
        db.collection(data)
          .get()
          .then((querySnapshot) => {
              querySnapshot.forEach((element) => {
                let data = element.data();
                setInfo((arr) => [...arr, data]);
                setLoading(false);
                setFilteredData((arr) => [...arr, data]);
              });
          });
    };

    const setBrands = () => {
        let arr = [];
        info.map((e) => {
          arr.push(e.brand);
        });
        let set = [...new Set(arr)];
        setBrandsBar(set);
    };

    const handleFilter = (e) => {
        let filtered = info.filter((item) => item.brand === e);
        setFilteredData(filtered);
    };

    const handleSort = () => {
        const by = document.querySelector(".sortBy").value;
        if (by === "Price: Low To High") {
          const sorted = [...filteredData].sort((a, b) => a.price - b.price);
          setFilteredData(sorted);
        } else if (by === "Price: High To Low") {
          const sorted = [...filteredData].sort((a, b) => b.price - a.price);
          setFilteredData(sorted);
        } else if (by === "Rating: High To Low") {
          const sorted = [...filteredData].sort(
              (a, b) => b.rating.length - a.rating.length
          );
          setFilteredData(sorted);
        } else if (by === "Rating: Low To High") {
          const sorted = [...filteredData].sort(
              (a, b) => a.rating.length - b.rating.length
          );
          setFilteredData(sorted);
        }
    };

    return (
        <>
          <div
              style={{
                marginLeft: "78.5%",
                marginBottom: "1%",
                fontSize: "16px",
              }}
          >
              <label
                style={{
                    marginRight: "4px",
                    background: "rgb(244,28,178)",
                    padding: "1%",
                    borderRadius: "5%",
                    color: "white",
                    fontWeight: "600",
                }}
              >
                Sort by:
              </label>
              <select
                onChange={handleSort}
                className="sortBy"
                style={{
                    marginRight: "4px",
                    background: "rgb(238,236,234)",
                    padding: "1%",
                    borderRadius: "5%",
                    color: "grey",
                    fontWeight: "600",
                }}
              >
                <option name="">Price</option>
                <option name="high2low">Price: High To Low</option>
                <option name="low2high">Price: Low To High</option>
                <option>Rating: High To Low</option>
                <option>Rating: Low To High</option>
              </select>
          </div>

          <Container style={{ display: "flex" }}>
              {/* Left Sidebar */}

              {loading ? (
                <CircularProgress
                    sx={{
                      textAlign: "center",
                      width: "400px",
                      fontSize: "15rem",
                      margin: "auto",
                      marginTop : "2%",
                      marginBottom : "5%",
                      color: "#FF3E6B"
                    }}
                />
              ) : (
                <>
                {/* <Filtering /> */}

                <Filters brandsBar={brandsBar} handleFilter={handleFilter} />
                {/* Right side container */}

                <div className="productContainer">
                    {filteredData.map((e, i) => {
                      return (
                        <Card
                          key={i}
                          sx={{ maxWidth: 275 }}
                          className="card"
                        >
                          <CardMedia
                            component="img"
                            // height="140"
                            image={e.link}
                            alt={e.title}
                            loading="lazy"
                            onClick={() =>
                              navigate(`/product/${e.id}`, {
                                state: { product: e },
                              })
                            }
                          />
                          <CardContent
                            sx={{
                              paddingTop: 0,
                              paddingBottom: 0,
                              marginTop: "4px",
                            }}
                          >
                            <Typography
                              gutterBottom
                              // variant="h6"
                              component="div"
                              sx={{
                                marginBottom: 0,
                                fontWeight: "bold",
                                fontSize: "14px",
                                textTransform: "uppercase",
                              }}
                            >
                              {e.brand}
                            </Typography>
                            <div style={{ height: "4.5rem" }}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                size="small"
                              >
                                {e.title}
                              </Typography>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                size="medium"
                              >
                                Rating: {e.rating}
                              </Typography>
                              <Link
                                style={{
                                  marginLeft: "2%",
                                  fontSize: "15px",
                                  textDecoration: "none",
                                  color: "#282C3F",
                                }}
                                to="/moodboard"
                              >
                                {" "}
                                <button
                                  onClick={() => handleAddToMoodboard(e)}
                                  style={{ border: "none", background: "none" }}
                                >
                                  <img
                                    style={{
                                      marginLeft: "3%",
                                    }}
                                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjAgMjAiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTYgM2EzIDMgMCAwIDAtMyAzdjhhMyAzIDAgMCAwIDMgM2g0LjkybC0uODc5LS44ODVMOS45MzIgMTZINmEyIDIgMCAwIDEtMi0yVjguMDU4bDUuNS0uMDUzdjMuNzQ2YTMuNiAzLjYgMCAwIDEgMS0xLjA5VjRIMTRhMiAyIDAgMCAxIDIgMnY0LjAyN2MuMzMyLS4wNDEuNjctLjAzNSAxIC4wMThWNmEzIDMgMCAwIDAtMy0zek00IDZhMiAyIDAgMCAxIDItMmgzLjV2My4wMDVMNCA3LjA1OHptMTMgNS4wNjNhMi41NCAyLjU0IDAgMCAxIDEuMjQ5LjY5NGEyLjYgMi42IDAgMCAxIDAgMy42NTNsLTMuNDMxIDMuNDU3YS40NS40NSAwIDAgMS0uNjM2IDBMMTAuNzUgMTUuNDFhMi42IDIuNiAwIDAgMSAwLTMuNjU0YTIuNTUgMi41NSAwIDAgMSAzLjYyNiAwbC4xMjMuMTI0bC4xMjMtLjEyM0EyLjU1IDIuNTUgMCAwIDEgMTcgMTEuMDYzIi8+PC9zdmc+"
                                    alt=""
                                  />
                                </button>
                              </Link>
                            </div>
                            <div style={{ display: "flex" }}>
                              <Typography
                                sx={{ fontSize: 14, fontWeight: "bold" }}
                                color="text.primary"
                                gutterBottom
                              >
                                Rs. {e.price}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: 14,
                                  //   fontWeight: "bold",
                                  textDecoration: "line-through",
                                  marginLeft: 2,
                                }}
                                color="text.secondary"
                                gutterBottom
                              >
                                {e.strikedOff}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  fontWeight: "light",
                                  marginLeft: 2,
                                  color: "orange",
                                }}
                                color="text.secondary"
                                gutterBottom
                              >
                                ({e.discount}% OFF)
                              </Typography>
                            </div>
                          </CardContent>
                          <CardActions
                            sx={{
                              justifyContent: "space-around",
                            }}
                          >
                            <Button
                              variant="outlined"
                              size="small"
                              sx={{
                                backgroundColor: "#ff3e6b",
                                color: "white",
                                // fontWeight: "bold",
                                borderColor: "#ff3e6b",
                                textTransform: "capitalize",
                                ":hover": {
                                  color: "black",
                                },
                              }}
                              onClick={() => {
                                updatecart(e);
                              }}
                            >
                              <ShoppingBag
                                sx={{
                                  fontSize: 15,
                                  margin: 0,
                                  marginRight: "4px",
                                }}
                              ></ShoppingBag>
                              Add to cart
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              sx={{
                                textTransform: "capitalize",
                                color: "black",
                                borderColor: "#ff3e6b",
                              }}
                            >
                              <FavoriteIcon
                                sx={{
                                  marginRight: "4px",
                                  fontSize: 15,
                                  textTransform: "capitalize",
                                }}
                              />
                              Wishlist
                            </Button>
                          </CardActions>
                        </Card>
                      );
                    })}
                </div>
              </>
          )}
          </Container>
        </>
    );
  };

  export default Products;

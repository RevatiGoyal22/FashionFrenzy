import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Grid, Typography, Button, CardMedia } from "@mui/material";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MoodboardContext, useMoodboard } from "./CartComponents/contexts/MoodboardContext";
import Moodboard from "./Moodboard";
const ProductDetail = () => {
  const location = useLocation();
  const { product } = location.state;
  const navigate = useNavigate();
  const { addToMoodboard } = useMoodboard(MoodboardContext);
    const handleAddToMoodboard = (product) => {
      const category = prompt(
        "Enter the category (party,sport, wanderlust,sanskari,casual,formal)"
      );
      addToMoodboard(product, category);
     
    };
  return (
    <Container style={{ marginTop: "2rem" }}>
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            image={product.link}
            alt={product.title}
            style={{ maxWidth: "100%", borderRadius: "8px" }}
          />
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom style={{fontSize:"20px" }}>
            {product.title}
          </Typography>
          <Typography variant="h5" color="textSecondary">
            {product.brand}
          </Typography>
          <Typography
            variant="h6"
            color="textPrimary"
            style={{ margin: "1rem 0" }}
          >
            Rs. {product.price}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ textDecoration: "line-through" }}
          >
            {product.strikedOff}
          </Typography>
          <Typography
            variant="body2"
            style={{ color: "orange", marginBottom: "1rem" }}
          >
            {product.discount}% OFF
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Rating: {product.rating}
          </Typography>

          {/* Action Buttons */}
          <div style={{ margin: "2rem 0" }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingBag />}
              style={{ marginRight: "1rem" }}
            >
              Add to Cart
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<FavoriteIcon />}
            >
              Wishlist
            </Button>
          </div>

          {/* Moodboard Button */}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              handleAddToMoodboard(product); // Add product to moodboard
               navigate("/moodboard"); // Navigate to moodboard
            }}
          >
            Add to Moodboard
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;

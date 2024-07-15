import React, { useState } from "react";
import { useMoodboard } from "./CartComponents/contexts/MoodboardContext";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Tabs,
  Tab,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PartyIcon from "./moodboardIcons/party.jpg";
import SportIcon from "./moodboardIcons/sport.jpg";
import SanskariIcon from "./moodboardIcons/Sanskari.jpg";
import WanderlustIcon from "./moodboardIcons/Wanderlust.jpg";
import CasualIcon from "./moodboardIcons/Casual.jpg";
import FormalIcon from "./moodboardIcons/Formal.jpg";

const Moodboard = () => {
  const { moodboardItems, removeFromMoodboard } = useMoodboard();
  const [selectedCategory, setSelectedCategory] = useState("party");

  const categories = Object.keys(moodboardItems);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "party":
        return (
          <img
            src={PartyIcon}
            alt="Party Icon"
            style={{ width: 60, height: 60, marginRight: 8 }}
          />
        );
      case "sport":
        return (
          <img
            src={SportIcon}
            alt="Sport Icon"
            style={{ width: 60, height: 60, marginRight: 8 }}
          />
        );
      case "wanderlust":
        return (
          <img
            src={WanderlustIcon}
            alt="Wanderlust Icon"
            style={{ width: 60, height: 60, marginRight: 8 }}
          />
        );
      case "sanskari":
        return (
          <img
            src={SanskariIcon}
            alt="Sanskari Icon"
            style={{ width: 60, height: 60, marginRight: 8 }}
          />
        );
      case "formal":
        return (
          <img
            src={FormalIcon}
            alt="Formal Icon"
            style={{ width: 60, height: 60, marginRight: 8 }}
          />
        );
      case "casual":
        return (
          <img
            src={CasualIcon}
            alt="Casual Icon"
            style={{ width: 60, height: 60, marginRight: 8 }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Typography variant="h2" gutterBottom>
        Your Wardrobe
      </Typography>
      <Tabs
        value={selectedCategory}
        onChange={handleCategoryChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        style={{
          display: "flex",
          justifyContent: "space-between",
          textTransform: "capitalize",
        }}
      >
        {categories.map((category) => (
          <Tab
            key={category}
            icon={getCategoryIcon(category)}
            label={category}
            value={category}
          />
        ))}
      </Tabs>

      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}{" "}
          Look
        </Typography>
        {moodboardItems[selectedCategory].length === 0 ? (
          <Typography variant="h6">No items in your moodboard.</Typography>
        ) : (
          <Grid container spacing={3}>
            {moodboardItems[selectedCategory].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    image={item.link}
                    alt={item.title}
                    loading="lazy"
                    sx={{ height: "100%", objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      component="div"
                      sx={{
                        marginBottom: 0,
                        fontWeight: "bold",
                        fontSize: "14px",
                        textTransform: "capitalize",
                      }}
                    >
                      {item.brand}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      size="small"
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      size="medium"
                    >
                      Rating: {item.rating}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14, fontWeight: "bold" }}
                      color="text.primary"
                      gutterBottom
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>Rs. {item.price}</span>
                        <span>
                          <IconButton
                            color="secondary"
                            onClick={() =>
                              removeFromMoodboard(item, selectedCategory)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </span>
                      </div>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Moodboard;

import React from "react";
import { useMoodboard } from "./CartComponents/contexts/MoodboardContext";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";

const Moodboard = () => {
  const { moodboardItems, removeFromMoodboard } = useMoodboard();

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Moodboard
      </Typography>
      {moodboardItems.length === 0 ? (
        <Typography variant="h6">No items in your moodboard.</Typography>
      ) : (
        <Grid container spacing={3}>
          {moodboardItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  image={item.link}
                  alt={item.title}
                  loading="lazy"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    component="div"
                    sx={{
                      marginBottom: 0,
                      fontWeight: "bold",
                      fontSize: "14px",
                      textTransform: "uppercase",
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
                    Rs. {item.price}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      textTransform: "capitalize",
                      color: "black",
                      borderColor: "#ff3e6b",
                    }}
                    onClick={() => removeFromMoodboard(item)}
                  >
                    Remove from Moodboard
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Moodboard;

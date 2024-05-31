import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  useTheme,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function App() {
  const theme = useTheme();
  const URL = "https://sensores-20n9.onrender.com";
  const [allMetrics, setAllMetrics] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [activeSensor, setActiveSensor] = useState(null);

  const sensorImages = [
    "/images/DIAGRAMA1.png",
    "/images/DIAGRAMA2.png",
    "/images/DIAGRAMA3.png",
  ];

  useEffect(() => {
    fetch(`${URL}/mediciones`).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setAllMetrics(data.metrics); // Asumiendo que el servidor envía los datos con una clave 'metrics'
      });
    });
  }, []);

  const handleSensorClick = (sensorIndex) => {
    setActiveSensor(allMetrics[sensorIndex]);
  };

  const handleHomeClick = () => {
    setActiveSensor(null); // Restablece la vista a la página principal
  };

  const styles = {
    card: {
      backgroundColor: "#e8f5e9",
      boxShadow: theme.shadows[3],
      padding: theme.spacing(2),
      textAlign: "center",
      border: `1px solid #a5d6a7`,
    },
    container: {
      padding: theme.spacing(3),
    },
    title: {
      color: "#1b5e20",
      textAlign: "center",
    },
    value: {
      color: "#4caf50",
    },
    imageContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      padding: theme.spacing(2),
    },
  };

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
        }}
      >
        <List>
          <ListItem button onClick={handleHomeClick}>
            <ListItemText primary="Página Principal" />
          </ListItem>
          {allMetrics.map((_, index) => (
            <ListItem
              button
              key={`Sensor ${index + 1}`}
              onClick={() => handleSensorClick(index)}
            >
              <ListItemText primary={`Sensor ${index + 1}`} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Grid container spacing={2} sx={styles.container}>
        <Grid item xs={12}>
          <Stack direction={"row"} gap={1} alignItems="center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon sx={{ color: "#1b5e20", height: 30, width: 30 }} />
            </IconButton>
            <Typography variant="h4" sx={styles.title}>
              {activeSensor
                ? `Datos de Sensor ${allMetrics.indexOf(activeSensor) + 1}`
                : "HUERTA FENICIA"}
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} sx={styles.imageContainer}>
          <img
            src={
              activeSensor
                ? sensorImages[allMetrics.indexOf(activeSensor)]
                : "/images/DIAGRAMAPPAL.png"
            }
            alt="Imagen descriptiva"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Grid>

        {(activeSensor ? activeSensor : []).map((metric, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card variant="outlined" sx={styles.card}>
              <CardContent>
                <Typography variant="h6" sx={styles.title} gutterBottom>
                  {metric.title}
                </Typography>
                <Typography variant="body1" sx={styles.value}>
                  {metric.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default App;

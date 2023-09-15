import React from "react";
import { Box, Typography, Container } from "@mui/material";
import "./App.css";
import NumberBox from "./components/NumberBox";

const NumberPickerApp = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: { lg: "100%", md: "75%", xs: "100%" },
          margin: "10px auto",
          padding: "10px",
        }}
      >
        <Typography
          fontWeight={700}
          sx={{ fontSize: { lg: "44px", sm: "30px", xs: "28px" } }}
          marginBottom={2}
        >
          Lucky Number
        </Typography>
        <NumberBox />
      </Box>
    </Container>
  );
};
export default NumberPickerApp;

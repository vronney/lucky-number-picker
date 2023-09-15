import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

const NumberBox = () => {
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(100);
  const [pickedNumber, setPickedNumber] = useState(null);
  const [isPickingNumber, setIsPickingNumber] = useState(false);
  const [displayNumber, setDisplayNumber] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  const pickNumber = () => {
    setIsPickingNumber(true);

    let intervalId = setInterval(() => {
      const randomDisplayNumber =
        Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      setDisplayNumber(randomDisplayNumber);
    }, 100);

    const randomDelay = Math.floor(Math.random() * 2000) + 1000; // Random delay between 1-3 seconds
    setTimeout(() => {
      clearInterval(intervalId);
      const number =
        Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      setPickedNumber(number);
      setIsPickingNumber(false);
      setDisplayNumber(null);
    }, randomDelay);
  };

  useEffect(() => {
    const stopConfetti = () => {
      setPickedNumber(null); // Stop the confetti
    };

    if (isMobile) {
      // Listen for tap events on mobile
      window.addEventListener("touchstart", stopConfetti);
    } else {
      // Listen for keydown events on desktop
      window.addEventListener("keydown", stopConfetti);
    }

    return () => {
      if (isMobile) {
        window.removeEventListener("touchstart", stopConfetti);
      } else {
        window.removeEventListener("keydown", stopConfetti);
      }
    };
  }, [isMobile]);

  useEffect(() => {
    if (pickedNumber !== null) {
      setIsMobile(isMobileDevice());
      const confettiTimer = setTimeout(() => {
        setPickedNumber(null);
      }, 50000); // Confetti lasts for 5 seconds
      return () => clearTimeout(confettiTimer);
    }
  }, [pickedNumber]);
  return (
    <>
      <Stack spacing={4} direction="column">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextField
            sx={{ marginBottom: "20px" }}
            id="outlined-controlled"
            label="Min Value"
            variant="outlined"
            type="number"
            value={minValue}
            size="small"
            onChange={(e) => setMinValue(parseInt(e.target.value))}
          />
          <TextField
            sx={{ marginBottom: "20px" }}
            id="outlined-controlled"
            label="Max Value"
            variant="outlined"
            type="number"
            value={maxValue}
            size="small"
            onChange={(e) => setMaxValue(parseInt(e.target.value))}
          />
          <Button
            sx={{ marginBottom: "20px" }}
            variant="contained"
            onClick={pickNumber}
            disabled={isPickingNumber}
          >
            {isPickingNumber ? "Picking number..." : "Pick Number"}
          </Button>
          {pickedNumber !== null && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                fontWeight={700}
                sx={{ fontSize: { lg: "44px", sm: "30px", xs: "28px" } }}
                marginBottom={2}
              >
                The lucky number is:
              </Typography>
              <Typography
                fontWeight={700}
                sx={{ fontSize: { lg: "44px", sm: "30px", xs: "28px" } }}
                marginBottom={2}
              >
                {pickedNumber}
              </Typography>
              <Confetti width={window.innerWidth} height={window.innerHeight} />
            </Box>
          )}
          {isPickingNumber && (
            <Typography
              fontWeight={700}
              sx={{ fontSize: { lg: "24px", sm: "18px", xs: "16px" } }}
              marginBottom={2}
            >
              Picking: {displayNumber}
            </Typography>
          )}
        </Box>
      </Stack>
    </>
  );
};

export default NumberBox;

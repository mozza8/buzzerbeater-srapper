import { Box, Button } from "@mui/material";
import { useState } from "react";
import { callScraper } from "../api/Services";

import ListOfPlayers from "./ListOfPlayers";
import Timing from "./Timing";

const API_ENDPOINT = "/api/start-timer"; // Mock endpoint

export default function TimerApp() {
  const [isRunning, setIsRunning] = useState(false);

  const handleClick = async () => {
    try {
      setIsRunning(true);

      // Calculate 4 days in seconds
      const fourDaysInSeconds = 4 * 24 * 60 * 60;
      //setCountdown(fourDaysInSeconds);

      // Simulate API call
      await fetch(API_ENDPOINT, { method: "POST" });

      // Stop timer after 4 days for demo purposes
      setTimeout(() => {
        setIsRunning(false);
      }, fourDaysInSeconds * 1000);
    } catch (error) {
      console.error("API call failed", error);
      setIsRunning(false);
    }
  };

  const handleButtonClick = async () => {
    if (await callScraper()) {
      handleClick();
    } else {
      return;
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center text-gray-800">
        <Timing />
        <Button
          onClick={handleButtonClick}
          disabled={isRunning}
          className="px-4 py-2 text-lg"
        >
          {isRunning ? "Running..." : "Scrape players"}
        </Button>
      </div>
      <Box justifyContent={"center"} mt={2} height={"20%"} overflow={"hidden"}>
        <ListOfPlayers />
      </Box>
    </>
  );
}

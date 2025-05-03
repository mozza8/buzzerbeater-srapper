import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const API_ENDPOINT = "/api/start-timer"; // Mock endpoint

export default function TimerApp() {
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<any | null>(null);
  const [currentUTC, setCurrentUTC] = useState<string>("");
  const [lastPressedTime, setLastPressedTime] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    const updateUTC = () => {
      const now = new Date();
      setCurrentUTC(now.toUTCString());
    };

    updateUTC();
    const utcInterval = setInterval(updateUTC, 1000);
    return () => clearInterval(utcInterval);
  }, []);

  useEffect(() => {
    if (isRunning && countdown > 0) {
      const id = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [isRunning, countdown]);

  const handleClick = async () => {
    try {
      setIsRunning(true);
      const nowUTC = new Date().toUTCString();
      setLastPressedTime(nowUTC);

      // Calculate 4 days in seconds
      const fourDaysInSeconds = 4 * 24 * 60 * 60;
      setCountdown(fourDaysInSeconds);

      // Simulate API call
      await fetch(API_ENDPOINT, { method: "POST" });

      // Stop timer after 4 days for demo purposes
      setTimeout(() => {
        setIsRunning(false);
        if (intervalId) clearInterval(intervalId);
      }, fourDaysInSeconds * 1000);
    } catch (error) {
      console.error("API call failed", error);
      setIsRunning(false);
      if (intervalId) clearInterval(intervalId);
    }
  };

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center text-gray-800">
      <h1 className="text-3xl mb-2">Countdown: {formatTime(countdown)}</h1>
      <h2 className="text-lg mb-2">Current UTC Time: {currentUTC}</h2>
      <h3 className="text-md mb-6">
        Last Button Pressed: {lastPressedTime || "N/A"}
      </h3>
      <Button
        onClick={handleClick}
        disabled={isRunning}
        className="px-4 py-2 text-lg"
      >
        {isRunning ? "Running..." : "Start Countdown"}
      </Button>
    </div>
  );
}

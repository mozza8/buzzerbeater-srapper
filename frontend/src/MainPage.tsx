import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { callScraper, getLastCallScraper } from "./api/Services";
import { formatTime } from "./utils/formatTime";

const API_ENDPOINT = "/api/start-timer"; // Mock endpoint

export default function TimerApp() {
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<any | null>(null);
  const [currentUTC, setCurrentUTC] = useState<string>("");
  const [lastPressedTime, setLastPressedTime] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(0);
  const [lastTime, setLastTime] = useState<string>("");

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
    const getLastTime = async () => {
      const lastTime = await handleGetLastCalledTime();
      console.log("lastTime", lastTime);
      setLastTime(lastTime);
    };

    getLastTime();
  }, []);

  const handleGetLastCalledTime = async () => {
    try {
      const res: any = await getLastCallScraper();
      console.log("res", res);
      return res.lastCall;
    } catch (error) {
      console.log(error);
      return "N/A";
    }
  };

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

  const handleButtonClick = async () => {
    if (await callScraper()) {
      handleClick();
    } else {
      return;
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center text-gray-800">
      <h1 className="text-3xl mb-2">Countdown: {formatTime(countdown)}</h1>
      <h2 className="text-lg mb-2">Current UTC Time: {currentUTC}</h2>
      <h3 className="text-md mb-6">
        Last Button Pressed: {lastPressedTime || "N/A"}
      </h3>

      <h3 className="text-md mb-6">Last Time: {lastTime || "N/A"}</h3>
      <Button
        onClick={handleButtonClick}
        disabled={isRunning}
        className="px-4 py-2 text-lg"
      >
        {isRunning ? "Running..." : "Start Countdown"}
      </Button>
    </div>
  );
}

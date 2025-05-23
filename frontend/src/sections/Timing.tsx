import { useEffect, useState } from "react";
import CountDown from "../CountDown";
import { countdownFromDate } from "../utils/formatTime";
import { getLastCallScraper } from "../api/Services";

type TimingProps = {
  setIsCountdownActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const Timing = ({ setIsCountdownActive }: TimingProps) => {
  const [currentUTC, setCurrentUTC] = useState<string>("");
  const [countdown, setCountdown] = useState<number[]>([]);
  const [lastTime, setLastTime] = useState<string>("");
  const [lastTimeDate, setLastTimeDate] = useState<string | null>(null);

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
    setInterval(() => {
      setCountdown(countdownFromDate(lastTime, setIsCountdownActive));
    }, 1000);
  }, [countdown]);

  useEffect(() => {
    const updateUTC = () => {
      const now = new Date();
      setCurrentUTC(now.toUTCString());
    };

    const handleInterval = () => {
      updateUTC();
    };

    updateUTC();
    const utcInterval = setInterval(handleInterval, 1000);
    return () => clearInterval(utcInterval);
  }, []);

  useEffect(() => {
    const getLastTime = async () => {
      const lastTime = await handleGetLastCalledTime();
      setLastTime(lastTime);
      const dateTime = new Date(lastTime).toUTCString();
      setLastTimeDate(dateTime);
    };

    getLastTime();
  }, []);

  return (
    <>
      <CountDown countdown={countdown} />
      <h2 className="text-lg mb-2">Current UTC Time: {currentUTC}</h2>
      <h3 className="text-md mb-6">Last Time: {lastTimeDate || "N/A"}</h3>
    </>
  );
};

export default Timing;

import { useState, useEffect } from "react";

interface IOtpTimerProps {
  otpLimitExpiry: string;
}

type TimeUnit = "Minutes" | "Seconds";

const timeUnits: TimeUnit[] = ["Minutes", "Seconds"];

const OtpTimer = ({ otpLimitExpiry }: IOtpTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    Minutes: "00",
    Seconds: "00",
  });

  useEffect(() => {
    if (!otpLimitExpiry) {
      setTimeLeft({
        Minutes: "00",
        Seconds: "00",
      });
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const expiry = new Date(otpLimitExpiry).getTime();
      const diff = expiry - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({
          Minutes: "00",
          Seconds: "00",
        });
        return;
      }
      const Minutes = Math.floor((diff / (1000 * 60)) % 60);
      const Seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        Minutes: Minutes.toString().padStart(2, "0"),
        Seconds: Seconds.toString().padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [otpLimitExpiry]);

  return (
    <div className="flex w-full items-center gap-6 mb-5">
      {timeUnits.map((unit) => (
        <div key={unit}>
          <div className="before:contents-[''] relative w-max bg-indigo-50 px-[8px] before:absolute before:left-1/2 before:top-0 before:z-10 before:h-full before:w-0.5 before:-translate-x-1/2 before:bg-white">
            <h3
              className={`${unit} font-manrope relative z-20 max-w-[44px] text-center text-2xl font-semibold tracking-[15.36px] text-[#3880FF]`}
            >
              {timeLeft[unit]}
            </h3>
          </div>
          <p className="mt-1 w-full text-center text-sm font-normal text-gray-900">
            {unit}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OtpTimer;

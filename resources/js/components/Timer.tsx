import React, { useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { IPageProps } from "../lib/types";
import { compareAsc } from "date-fns";

interface ICountdown {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

function countdownTo(dt: string): ICountdown {
  const fmt = (n: number) => String(Math.abs(Math.floor(n))).padStart(2, "0");
  const diff = (Date.parse(dt) - Date.now()) / 1000;
  const days = fmt(diff / (60 * 60 * 24));
  const hours = fmt((diff / (60 * 60)) % 24);
  const minutes = fmt((diff / 60) % 60);
  const seconds = fmt(diff % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

const Timer: React.FC = () => {
  const {
    props: { startDate, endDate },
  } = usePage<IPageProps>();
  const [started, setStarted] = React.useState<boolean>(
    compareAsc(new Date(), new Date(startDate)) == 1
  );
  const [ended, setEnded] = React.useState<boolean>(
    compareAsc(new Date(), new Date(endDate)) == 1
  );
  const [countdown, setCountdown] = React.useState<ICountdown>(
    countdownTo(started ? endDate : startDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setStarted(compareAsc(new Date(), new Date(startDate)) == 1);
      setEnded(compareAsc(new Date(), new Date(endDate)) == 1);
      setCountdown(countdownTo(started ? endDate : startDate));

      if (ended) clearInterval(interval);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center">
        {!ended ? (
          Object.entries(countdown).map(([label, n], i) => (
            <div key={i}>
              <div className="text-2xl font-mono py-1 px-2 m-1 mb-1 rounded-lg bg-goethe bg-opacity-30 flex justify-center items-center font-bold">
                {n}
              </div>
              <div
                className="uppercase font-light text-center"
                style={{ fontSize: "0.6rem" }}
              >
                {label}
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm font-bold">DPS Goethe Quiz has ended</div>
        )}
      </div>
    </div>
  );
};

export default Timer;

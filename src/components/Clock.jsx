import { useEffect, useState } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <div>
        {time.toLocaleDateString([], {
          // weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
      <span className="block w-1 h-1 bg-white rounded-4xl"></span>
      <div>
        {time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          
        })}
      </div>

    </div>
  );
}

export default Clock;
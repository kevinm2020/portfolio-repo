import { useEffect, useState } from "react";

function HealthCheck() 
{

  const [status, setStatus] = useState("Checking...");
  const [isOnline, setIsOnline] = useState(null);
  const [serviceName, setServiceName] = useState("");

  const checkHealth = async () => {

    try 
    {
        const start = performance.now();

        const response = await fetch("https://kevin-martinez-portfolio-backend.onrender.com/pong");

        console.log("Response status:", response.status);

        if (!response.ok) 
        {
            throw new Error("Server not responding");
        }

        const data = await response.json();
        console.log("Response status:", response.status);
        const end = performance.now();
        const responseTime = Math.round(end - start);

        if (data.status === "UP") {
            setStatus(`Online (${responseTime}ms)`);
            setIsOnline(true);
            setServiceName(data.service);
        } 
        else {
            throw new Error("Service not UP - Contact support");
        }

    } 
    catch (error) 
    {
      setStatus("Offline");
      setIsOnline(false);
      setServiceName("");
    }
  };

  useEffect(() => 
{
    checkHealth();

    const interval = setInterval(checkHealth, 10000);
    return () => clearInterval(interval);
    
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
      <span
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor:
            isOnline === null
              ? "gray"
              : isOnline
              ? "green"
              : "red",
        }}
      />

      <p style={{ margin: 0 }}>
        STATUS: {status}
        {serviceName && ` — ${serviceName}`}
      </p>
    </div>
  );
}

export default HealthCheck;
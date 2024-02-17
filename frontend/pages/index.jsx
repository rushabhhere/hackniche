import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Box, Power, PowerOff, Cpu, MemoryStick } from "lucide-react";
import Link from "next/link";
import { FaDocker } from "react-icons/fa";

export default function Page() {
  const [data, setData] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading,setLoading]=useState(false);

useEffect(() => {
  setLoading(true);
  fetch("/api/agent/agents")
    .then((res) => res.json())
    .then((data) => {
      setAgents(data);
      setLoading(false); 
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      setLoading(false); 
    });
}, []);



  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <p className="text-white">Loading...</p>
        </div>
      )}
      <h1 className="text-gray-200 text-4xl text-center mt-4 font-bold">
        DockerSensei
      </h1>

      <div className="container mx-auto py-10">
        <h1 className="text-gray-200 text-2xl font-bold">Agents</h1>
        <div className="flex flex-col justify-center gap-4 mt-10">
          {agents.map((agent) => (
            <Link href={`/containers?agent=${agent.id}`} key={agent.id}>
              <Alert className="hover:border-blue-500">
                <AlertTitle className="font-bold flex items-center gap-4 text-xl">
                  <FaDocker className="h-8 w-8 text-blue-400 " />

                  {agent.name}
                </AlertTitle>
                <AlertDescription>
                  {agent.ip + ":" + agent.port}
                  <div className="flex justify-around mt-4 text-lg">
                    <div className="flex gap-2 ">
                      <Box />
                      {agent.info.totalContainers}
                    </div>
                    <div className="flex gap-2">
                      <Power className="text-green-500" />
                      {agent.info.runningContainers}
                    </div>
                    <div className="flex gap-2">
                      <PowerOff className="text-red-500" />
                      {agent.info.stoppedContainers}
                    </div>
                    <div className="flex gap-2">
                      <Cpu />
                      {agent.info.cpus}
                    </div>
                    <div className="flex gap-2">
                      <MemoryStick />
                      {agent.info.ram.toFixed(3)}GB
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

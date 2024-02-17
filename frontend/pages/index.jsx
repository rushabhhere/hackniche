import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const [data, setData] = useState([]);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetch("/api/agent/agents")
      .then((res) => res.json())
      .then((data) => setAgents(data));
  }, []);

  console.log(agents);

  return (
    <>
      <h1 className="text-gray-200 text-4xl text-center mt-4 font-bold">
        DockerSensei
      </h1>

      <div className="container mx-auto py-10">
        <h1 className="text-gray-200 text-2xl font-bold">Agents</h1>
        <div className="flex flex-col justify-center gap-4 mt-10">
          {agents.map((agent) => (
            <Link href={`/containers?agent=${agent.id}`}>
              <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>{agent.name}</AlertTitle>
                <AlertDescription>
                  {agent.ip + ":" + agent.port}
                  {console.log(agent.containers)}
                </AlertDescription>
              </Alert>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

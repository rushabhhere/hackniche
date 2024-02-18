import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cpu, MemoryStick } from "lucide-react";

function ContainerDetail() {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [rxb, setRxb] = useState(null);
  const [rxp, setRxp] = useState(null);
  const [txb, setTxb] = useState(null);
  const [txp, setTxp] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;

    const { id, agent } = router.query;

    const interval = setInterval(() => {
      fetch(`/api/agent/detail?agent=${agent}&containerId=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setRxb(data.networkStats.eth0.rx_bytes);
          setRxp(data.networkStats.eth0.rx_packets);
          setTxb(data.networkStats.eth0.tx_bytes);
          setTxp(data.networkStats.eth0.tx_packets);
          setLoading(false);
        });
    }, 1000);

    return () => clearInterval(interval);
  }, [router.isReady]);

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <p className="text-white">Loading...</p>
        </div>
      )}
      <Link href="/">
        <h1 className="mt-4 text-4xl font-bold text-center text-gray-200">
          DockerSensei
        </h1>
      </Link>
      {data ? (
        <>
          <div className="grid grid-cols-4 gap-2 mt-10 max-w-4xl mx-auto">
            <Card className="col-span-2">
              <CardHeader>
                <Cpu className="h-10" />
                <CardTitle>CPU Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl">
                  {parseFloat(data.cpuPercent).toFixed(2)}%
                </p>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <MemoryStick className="h-10" />
                <CardTitle>Memory Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl">
                  {parseFloat(data.memoryPercent).toFixed(2)}%
                </p>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader>
                <MemoryStick className="h-10" />
                <CardTitle>Received Bytes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl">{rxb}</p>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader>
                <MemoryStick className="h-10" />
                <CardTitle>Recieved Packets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl">{rxp}</p>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader>
                <MemoryStick className="h-10" />
                <CardTitle>Transferred Bytes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl">{txb}</p>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader>
                <MemoryStick className="h-10" />
                <CardTitle>Transferred Packets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl">{txp} </p>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      {/* <Link href="/">
        <h1 className="mt-4 text-4xl font-bold text-center text-gray-200">
          DockerSensei
        </h1>
      </Link>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <div className="flex  justify-center m-8 gap-2 ">
        <Card className="w-1/4">
          <CardHeader>
            <Cpu className="h-10" />
            <CardTitle>CPU Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">
              {parseFloat(data.cpuPercent).toFixed(2)}%
            </p>
          </CardContent>
        </Card>
        <Card className="w-1/4">
          <CardHeader>
            <MemoryStick className="h-10" />
            <CardTitle>Memory Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">
              {parseFloat(data.memoryPercent).toFixed(2)}%
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center m-8 gap-2">
        <Card className="w-1/8">
          <CardHeader>
            <MemoryStick className="h-10" />
            <CardTitle>Received Bytes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">
              {data["networkStats"]["eth0"]["rx_bytes"]}
            </p>
          </CardContent>
        </Card>
        <Card className="w-1/8">
          <CardHeader>
            <MemoryStick className="h-10" />
            <CardTitle>Memory Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">
              {parseFloat(data.memoryPercent).toFixed(2)}%
            </p>
          </CardContent>
        </Card>
        <Card className="w-1/8">
          <CardHeader>
            <MemoryStick className="h-10" />
            <CardTitle>Memory Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">
              {parseFloat(data.memoryPercent).toFixed(2)}%
            </p>
          </CardContent>
        </Card>
        <Card className="w-1/8">
          <CardHeader>
            <MemoryStick className="h-10" />
            <CardTitle>Memory Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">
              {parseFloat(data.memoryPercent).toFixed(2)}%
            </p>
          </CardContent>
        </Card>
      </div> */}
    </>
  );
}

export default ContainerDetail;

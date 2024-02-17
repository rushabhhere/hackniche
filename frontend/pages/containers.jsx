import { containerColumns } from "@/components/columns";
import DataTable from "@/components/data-table";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DemoPage() {
  //   const data = fetch('/api/container');
  //   console.log(data)
  const router = useRouter();

  const [data, setData] = useState([]);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;

    const { agent } = router.query;

    fetch(`/api/agent/containers?agent=${agent}`)
      .then((res) => res.json())
      .then((data) => setData(data));
    // fetch('/api/agents').then(res => res.json()).then(data => setAgents(data))
    // fetch("/api/agents").then(console.log);
  }, [router.isReady]);
  

  return (
    <>
      <h1 className="text-gray-200 text-4xl text-center my-4 font-bold">
        DockerSensei
      </h1>
      <div className="container mx-auto py-10">
        <h1 className="text-gray-200 text-2xl font-bold">Containers</h1>
        <DataTable columns={containerColumns} data={data} />
      </div>
    </>
  );
}

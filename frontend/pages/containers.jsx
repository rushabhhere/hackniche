import { columns } from "@/components/columns";
import DataTable from "@/components/data-table";
import { useEffect, useState } from "react";

async function getData() {
  return
}

export default function DemoPage() {
  //   const data = fetch('/api/container');
  //   console.log(data)

  const [data, setData] = useState([])
  const [agents, setAgents] = useState([])

  useEffect(() => {
    fetch('/api/container').then(res => res.json()).then(data => setData(data.message))
    // fetch('/api/agents').then(res => res.json()).then(data => setAgents(data))
    fetch('/api/agents').then(console.log)
  }, [])

  console.log(data);
  console.log(agents);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

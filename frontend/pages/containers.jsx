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

  useEffect(() => {
    fetch('/api/container').then(res => res.json()).then(data => setData(data.message))
  })
console.log(data);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

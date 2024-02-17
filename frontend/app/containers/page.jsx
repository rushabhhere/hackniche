import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "docker",
      state: "exited",
      image: "nginx:latest",
      ram: "4 GB",
      cpu: "90%",
      created: "2024-02-17",
    },
    {
      id: "728ed52f",
      name: "aocker",
      state: "running",
      image: "nginx:latest",
      ram: "4 GB",
      cpu: "90%",
      created: "2024-02-17",
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

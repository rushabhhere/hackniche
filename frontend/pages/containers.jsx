import { containerColumns } from '@/components/columns';
import DataTable from '@/components/data-table';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DemoPage() {
  //   const data = fetch('/api/container');
  //   console.log(data)
  const router = useRouter();

  const [data, setData] = useState([]);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;

    const { agent } = router.query;

    const interval = setInterval(() => {
      fetch(`/api/agent/containers?agent=${agent}`)
        .then(res => res.json())
        .then(data => setData(data));
    }, 1000);

    return () => clearInterval(interval);
  }, [router.isReady]);

  return (
    <>
      <Link href="/">
        <h1 className="mt-4 text-4xl font-bold text-center text-gray-200">
          DockerSensei
        </h1>
      </Link>
      <div className="container py-10 mx-auto">
        <h1 className="text-2xl font-bold text-gray-200">Containers</h1>
        <DataTable columns={containerColumns} data={data} />
      </div>
    </>
  );
}

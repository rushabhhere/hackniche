import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function ContainerDetail() {
  const router = useRouter();

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;

    const { id, agent } = router.query;

    const interval = setInterval(() => {
      fetch(`/api/agent/detail?agent=${agent}&containerId=${id}`)
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
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default ContainerDetail;

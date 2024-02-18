import { prisma } from '@/lib/db';

export default async function handler(req, res) {
  const { agent } = req.query;

  const { ip, port } = await prisma.agent.findUnique({
    where: {
      id: agent,
    },
  });

  const detail = await fetch(`http://${ip}:${port}/containers/status`);

  const status = await detail.json();

  res.send(status);
}

import { prisma } from '@/lib/db';

export default async function handler(req, res) {
  const { agent, containerId } = req.query;

  const { name, ip, port } = await prisma.agent.findUnique({
    where: {
      id: parseInt(agent),
    },
  });

  const detail = await fetch(
    `http://${ip}:${port}/containers/stats/${containerId}`
  );

  const stats = await detail.json();

  res.send(stats);
}

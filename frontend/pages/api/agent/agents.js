import { prisma } from "@/lib/db";

export default async function handler(req, res) {
  const agents = await prisma.agent.findMany();

  const promises = [];

  for (let i = 0; i < agents.length; i++) {
    const a = agents[i];
    promises.push(
      fetch(`http://${a.ip}:${a.port}/containers/status`)
        .then((res) => res.json())
        .then((data) => (agents[i].containers = data))
    );
    promises.push(
      fetch(`http://${a.ip}:${a.port}/basic-info`)
        .then((res) => res.json())
        .then((data) => (agents[i].info = data))
    );
  }

  await Promise.all(promises);

  res.send(agents);
}

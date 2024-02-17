import { prisma } from "@/lib/db";

export default async function handler(req, res) {
  const { name, ip, port } = JSON.parse(req.body);
  const intPort = parseInt(port);
  const agent = await prisma.agent.create({
    data: {
      name, ip, port: intPort 
    }
  })
  res.send(agent);
}

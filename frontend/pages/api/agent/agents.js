import { prisma } from "@/lib/db";

export default async function handler(req, res) {
  const agents = await prisma.agents.findMany();

  res.send(agents);
}

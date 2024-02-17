import { prisma } from "@/lib/db";

export default async function handler(req, res) {
  const { agent } = req.query;

  const { ip, port } = await prisma.agents.findUnique({
    where: {
      id: parseInt(agent),
    },
  });

  const detail = await fetch(
    `http://${ip}:${port}/containers/status`
  );

  const status = await detail.json();

//   console.log(status)

//   const parsedStatus = {
//     ...status,
//     port: status.port.length > 0 ? `${status.port.PublicPort}:${status.port.PrivatePort}` : ''
//     // id: status.id.substring(1, 12),
//     // created: convert to locale string
//   }

//   console.log(parsedStatus)

  res.send(status);
}

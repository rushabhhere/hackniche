import Docker from 'dockerode';
const docker = new Docker();
import Pusher from "pusher";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
const pusher = new Pusher({
  useTLS: true,
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,

});

async function getContainerStats(containerId) {

  const container = docker.getContainer(containerId);
  const stats = await container.stats({ stream: false });

  const cpuUsage =
    stats.cpu_stats.cpu_usage.usage_in_usermode +
    stats.cpu_stats.cpu_usage.usage_in_kernelmode;
  const systemUsage = stats.cpu_stats.system_cpu_usage;
  const cpuPercent = (cpuUsage / systemUsage) * 100;

  const memoryUsage = stats.memory_stats.usage;
  const memoryLimit = stats.memory_stats.limit;
  const memoryPercent = (memoryUsage / memoryLimit) * 100;

  return {
    cpuPercent,
    memoryPercent,
  }
}

async function logStats() {
  const containers = await docker.listContainers({ all: true });

  const runningContainers = containers.filter(
    container => container.State === 'running'
  );

  const promises = [];

  const data = {};

  runningContainers.forEach(container => {
    promises.push(getContainerStats(container.Id).then(result => data[container.Id] = result));
  })

  await Promise.all(promises);

  const dataToAdd = Object.keys(data).map(key => ({
    containerId: key,
    cpu: data[key].cpuPercent,
    ram: data[key].memoryPercent,
  }))

  console.log(dataToAdd);

  await prisma.resourceUsage.createMany({
    data: dataToAdd
  })

  setTimeout(logStats, 2000)
}

export async function startLogStream(containerId) {
  const container = docker.getContainer(containerId);

  const logStream = await container.logs({
    follow: true,
    stdout: true,
    stderr: true,
  });

  logStream.on("data", function(chunk) {
    pusher.trigger(containerId, "logs", chunk.toString('utf8'));
  })
}

export async function sendStats(containerId) {
  const container = getContainerStats(containerId);

  pusher.trigger(containerId, "utilization", JSON.stringify(container));

  setTimeout(() => sendStats(containerId), 1000);
}

export function startStatsStream(containerId) {
  setTimeout(() => sendStats(containerId), 1000);
}



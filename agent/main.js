import express from 'express';
import Docker from 'dockerode';
import cors from 'cors';
import { totalmem } from 'os';
import { startLogStream, startStatsStream } from './src/events.js';
import "dotenv/config"

const app = express();
const port = 5500;

app.use(cors());

const docker = new Docker();

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

app.get('/basic-info', async (req, res) => {
  // return total number of containers, number of running containers, number of stopped containers
  // return total system ram and cpu cores
  try {
    const containers = await docker.listContainers({ all: true });
    const info = await docker.info();

    const runningContainers = containers.filter(
      container => container.State === 'running'
    );
    const stoppedContainers = containers.filter(
      container => container.State === 'exited'
    );

    res.json({
      totalContainers: containers.length,
      runningContainers: runningContainers.length,
      stoppedContainers: stoppedContainers.length,
      ram: totalmem() / 1024 / 1024 / 1024,
      cpus: info.NCPU,
    });
  } catch (err) {
    console.error('Error fetching basic info:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/containers/status', async (req, res) => {
  try {
    const containers = await docker.listContainers({ all: true });

    const containerStatus = containers.map(container => {
      return {
        id: container.Id,
        name: container.Names[0],
        image: container.Image,
        state: container.State,
        status: container.Status,
        ports: container.Ports,
        created: container.Created,
      };
    });

    res.json(containerStatus); // Send container status as JSON response
  } catch (err) {
    console.error('Error fetching container status:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/containers/stats/:containerId', async (req, res) => {
  const { containerId } = req.params;

  try {
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

    const networkStats = stats.networks;

    res.json({
      cpuPercent,
      memoryPercent,
      networkStats,
    });
  } catch (err) {
    console.error('Error fetching container stats:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/containers/logs/:containerId', async (req, res) => {
  const { containerId } = req.params;

  try {
    startLogStream(containerId);
    res.send(200);
  } catch (err) {
    console.error('Error fetching container logs:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.get('/containers/stats/:containerId', async (req, res) => {
  const { containerId } = req.params;

  try {
    startStatsStream(containerId);
    res.send(200);
  } catch (err) {
    console.error('Error fetching container stats:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.post('/containers/start/:containerId', async (req, res) => {
  const { containerId } = req.params;

  try {
    const container = docker.getContainer(containerId);
    container.start();
  } catch (err) {
    console.error('Error fetching container stats:', err);
    res.status(500).json({ error: 'Internal server error' });
  }

})


app.post('/containers/stop/:containerId', async (req, res) => {
  const { containerId } = req.params;

  try {
    const container = docker.getContainer(containerId);
    container.start();
  } catch (err) {
    console.error('Error fetching container stats:', err);
    res.status(500).json({ error: 'Internal server error' });
  }

})

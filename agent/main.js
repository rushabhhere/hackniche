const express = require('express');
const Docker = require('dockerode');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const docker = new Docker();

app.get('/containers/status', async (req, res) => {
  try {
    const containers = await docker.listContainers({ all: true }); // Fetch all containers

    const containerStatus = containers.map(container => {
      docker
        .getContainer(container.Id)
        .stats({ stream: false })
        .then(data => {
          console.log(data);
        });

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

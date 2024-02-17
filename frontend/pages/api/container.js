export default function handler(req, res) {
  res.status(200).json({
    message: [
      {
        id: "728ed52f",
        name: "docker",
        state: "exited",
        image: "nginx:latest",
        ram: "4 GB",
        cpu: "90%",
        status: "Upto 2 hrs",
        created: "2024-02-17",
      },
      {
        id: "728ed52f",
        name: "aocker",
        state: "running",
        status: "Upto 2 hrs",
        image: "nginx:latest",
        ram: "4 GB",
        cpu: "90%",
        created: "2024-02-17",
      },
      // ...
    ],
  });
}

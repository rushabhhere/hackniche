import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:hackniche_container_management/models/container_model.dart';
import 'package:provider/provider.dart';
import 'package:simple_icons/simple_icons.dart';

import '../enums/container_state_enum.dart';
import '../models/agent_model.dart';
import '../providers/agent_provider.dart';

class ContainerDetailsPage extends StatefulWidget {
  const ContainerDetailsPage(
      {super.key, required this.container, required this.agent});

  final ContainerModel container;
  final AgentModel agent;

  @override
  State<ContainerDetailsPage> createState() => _ContainerDetailsPageState();
}

class _ContainerDetailsPageState extends State<ContainerDetailsPage> {
  ContainerModel? container;
  late AgentModel agent;

  void getContainerStats() {
    debugPrint('Getting container stats');
    Future.delayed(const Duration(seconds: 2), () {
      if(!mounted) return;
      Provider.of<AgentProvider>(context, listen: false)
          .getContainerStats(agent, container!.id);
      if (mounted) {
        getContainerStats();
      }
    });
  }

  @override
  void initState() {
    setState(() {
      container = widget.container;
      agent = widget.agent;
    });
    getContainerStats();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    agent = Provider.of<AgentProvider>(context)
        .agents
        .firstWhere((element) => element.id == widget.agent.id);
    container = Provider.of<AgentProvider>(context)
        .agents
        .firstWhere((element) => element.id == agent.id)
        .containers!
        .firstWhere((element) => element.id == container!.id);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Container Details'),
        centerTitle: true,
        actions: [
          IconButton(
            onPressed: () {
              if (container?.state != ContainerStateEnum.running) {
                Provider.of<AgentProvider>(context, listen: false)
                    .startContainer(agent, container!.id);
              }
              Provider.of<AgentProvider>(context, listen: false)
                  .getContainersForAgent(agent);
              setState(() {
                container = Provider.of<AgentProvider>(context, listen: false)
                    .agents
                    .firstWhere((element) => element.id == agent.id)
                    .containers!
                    .firstWhere((element) => element.id == container!.id);
              });
            },
            icon: Icon(
              Icons.play_arrow,
              color: container?.state == ContainerStateEnum.running
                  ? Colors.grey
                  : Colors.green,
            ),
          ),
          IconButton(
            onPressed: () {
              if (container?.state == ContainerStateEnum.running) {
                Provider.of<AgentProvider>(context, listen: false)
                    .stopContainer(agent, container!.id);
              }
              Provider.of<AgentProvider>(context, listen: false)
                  .getContainersForAgent(agent);
              setState(() {
                container = Provider.of<AgentProvider>(context, listen: false)
                    .agents
                    .firstWhere((element) => element.id == agent.id)
                    .containers!
                    .firstWhere((element) => element.id == container!.id);
              });
            },
            icon: Icon(
              Icons.stop,
              color: container?.state == ContainerStateEnum.running
                  ? Colors.red
                  : Colors.grey,
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: CircleAvatar(
                radius: 50.0,
                child: Icon(
                  SimpleIcons.docker,
                  size: 75.0,
                  color: container!.state == ContainerStateEnum.running
                      ? Colors.green
                      : Colors.red,
                ),
              ),
            ),
            ListTile(
              title: const Text('Name'),
              subtitle: Text(container!.name),
            ),
            ListTile(
              onTap: () {
                Clipboard.setData(
                  ClipboardData(text: container!.id),
                );
              },
              trailing: const Icon(Icons.copy),
              title: const Text('ID'),
              subtitle: Text(
                container!.id,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ),
            ListTile(
              title: const Text('Status'),
              subtitle: Text(container!.status),
            ),
            ListTile(
              title: const Text('State'),
              subtitle: Text(container!.state.name),
            ),
            ListTile(
              title: const Text('Image'),
              subtitle: Text(container!.image),
            ),
            ListTile(
              title: const Text('Ports'),
              subtitle: Text(container!.ports),
            ),
            ListTile(
              title: const Text('CPU Usage'),
              subtitle: Text(
                container!.stats['cpuPercent'] != null
                    ? '${container!.stats['cpuPercent'].toStringAsFixed(2)}%'
                    : 'N/A',
              ),
            ),
            ListTile(
              title: const Text('Memory Usage'),
              subtitle: Text(
                container!.stats['memoryPercent'] != null
                    ? '${container!.stats['memoryPercent'].toStringAsFixed(2)} MB'
                    : 'N/A',
              ),
            ),
            ListTile(
              title: const Text('Network Usage'),
              subtitle: Text(
                container!.stats['networkStats'] != null
                    ? '${container!.stats['networkStats']['eth0']['rx_bytes'].toStringAsFixed(2)} received, ${container!.stats['networkStats']['eth0']['tx_bytes'].toStringAsFixed(2)} transmitted'
                    : 'N/A',
              ),
            ),
          ],
        ),
      ),
    );
  }
}

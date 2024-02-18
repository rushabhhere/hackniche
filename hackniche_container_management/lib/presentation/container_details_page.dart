import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:hackniche_container_management/models/container_model.dart';
import 'package:provider/provider.dart';

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

  @override
  void initState() {
    setState(() {
      container = widget.container;
      agent = widget.agent;
    });
    // Provider.of<AgentProvider>(context, listen: false)
    //     .getLogsForContainer(widget.agent, container!.id);
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
      body: Column(
        children: [
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
            subtitle: Column(
              children: container!.ports.isEmpty
                  ? [const Text('No ports found')]
                  : container!.ports
                      .map(
                        (port) => ListTile(
                          title: Text('Public Port: ${port.publicPort}'),
                          subtitle: Text('Private Port: ${port.privatePort}'),
                        ),
                      )
                      .toList(),
            ),
          ),
        ],
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:hackniche_container_management/models/container_model.dart';

class ContainerDetailsPage extends StatefulWidget {
  const ContainerDetailsPage({super.key, required this.container});

  final ContainerModel container;

  @override
  State<ContainerDetailsPage> createState() => _ContainerDetailsPageState();
}

class _ContainerDetailsPageState extends State<ContainerDetailsPage> {
  ContainerModel? container;

  @override
  void initState() {
    setState(() {
      container = widget.container;
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Container Details'),
      ),
      body: Column(
        children: [
          ListTile(
            title: const Text('Name'),
            subtitle: Text(container!.name),
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

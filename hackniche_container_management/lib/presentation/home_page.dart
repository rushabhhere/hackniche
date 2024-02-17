import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:hackniche_container_management/providers/logs_provider.dart';
import 'package:provider/provider.dart';
import 'package:simple_icons/simple_icons.dart';

import '../enums/container_state_enum.dart';
import '../models/container_model.dart';
import 'container_details_page.dart';
import '../providers/container_provider.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<ContainerModel> containers = [];

  @override
  Widget build(BuildContext context) {
    containers = Provider.of<ContainerProvider>(context).containers;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Container Management System'),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Padding(
              padding: EdgeInsets.fromLTRB(16, 8, 0, 8),
              child: Text(
                'Your Containers',
                style: TextStyle(
                  fontSize: 24.0,
                ),
              ),
            ),
            containers.isEmpty
                ? const Center(
                    child: Text('No containers found'),
                  )
                : ListView.builder(
                    physics: const NeverScrollableScrollPhysics(),
                    shrinkWrap: true,
                    itemCount: Provider.of<ContainerProvider>(context)
                        .containers
                        .length,
                    itemBuilder: (context, index) {
                      return ListTile(
                        leading: Icon(
                          SimpleIcons.linuxcontainers,
                          size: 30.0,
                          color: containers[index].state ==
                                  ContainerStateEnum.running
                              ? Colors.green
                              : Colors.red,
                        ),
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) {
                                return ContainerDetailsPage(
                                  container: containers[index],
                                );
                              },
                            ),
                          );
                        },
                        title: Text(
                          containers[index].name,
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        subtitle: Row(
                          children: [
                            Text(
                              containers[index].status,
                              style: const TextStyle(fontSize: 12.0),
                            ),
                          ],
                        ),
                        trailing: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Container(
                              decoration: BoxDecoration(
                                color: containers[index].state ==
                                        ContainerStateEnum.running
                                    ? Colors.green
                                    : Colors.red,
                                borderRadius: BorderRadius.circular(20.0),
                              ),
                              padding: const EdgeInsets.all(8.0),
                              child: Text(
                                containers[index].state.name,
                                style: const TextStyle(
                                  fontSize: 12.0,
                                  color: Colors.white,
                                ),
                              ),
                            ),
                            const Gap(4.0),
                            const Icon(
                              Icons.arrow_forward,
                              size: 20.0,
                            ),
                          ],
                        ),
                      );
                    },
                  ),
          ],
        ),
      ),
    );
  }
}

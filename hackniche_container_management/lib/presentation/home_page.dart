import 'package:flutter/material.dart';
import '../providers/agent_provider.dart';
import 'package:provider/provider.dart';
import 'package:simple_icons/simple_icons.dart';

import '../models/agent_model.dart';
import 'containers_page.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<AgentModel> agents = [];

  @override
  Widget build(BuildContext context) {
    agents = Provider.of<AgentProvider>(context).agents;
    debugPrint('Agents: $agents');
    return Scaffold(
      appBar: AppBar(
        title: const Text('DockerSensei'),
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          Provider.of<AgentProvider>(context, listen: false).getAllAgents();
        },
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Padding(
                padding: EdgeInsets.fromLTRB(16, 8, 0, 8),
                child: Text(
                  'Your Agents',
                  style: TextStyle(
                    fontSize: 24.0,
                  ),
                ),
              ),
              ListView.builder(
                itemCount: agents.length,
                shrinkWrap: true,
                itemBuilder: (context, index) {
                  return Card(
                    child: ListTile(
                      leading: const Icon(SimpleIcons.docker),
                      title: Text(agents[index].name),
                      subtitle: Text("${agents[index].ip}:${agents[index].port}"),
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => ContainersPage(
                              agent: agents[index],
                            ),
                          ),
                        );
                      },
                    ),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}

import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:hackniche_container_management/controllers/container_controller.dart';
import 'package:pusher_channels_flutter/pusher_channels_flutter.dart';

import '../controllers/agent_controller.dart';
import '../controllers/logs_controller.dart';
import '../models/agent_model.dart';

class AgentProvider extends ChangeNotifier {
  List<AgentModel> _agents = [];

  final AgentController _agentController = AgentController();
  final ContainerController _containerController = ContainerController();

  List<AgentModel> get agents => _agents;

  AgentProvider() {
    getAllAgents();
  }

  void getAllAgents() {
    _agentController.getAllAgents().then((agents) {
      _agents = agents;
      notifyListeners();
    });
    notifyListeners();
  }

  Future<void> getContainersForAgent(AgentModel agent) async {
    var containers = await _containerController.getAllContainers(agent.ip, agent.port);
    _agents.firstWhere((element) => element.id == agent.id).containers = containers;
    notifyListeners();
  }

  void getLogsForContainer(AgentModel agent, String containerId) async {
    await _containerController.activateLogs(agent.ip, agent.port, containerId);
    Utf8Decoder decoder = const Utf8Decoder();
    PusherChannel channel = await LogsController().getLogsChannel(containerId);
    channel.onEvent = (event) {
      var eventData = event.data;
      debugPrint(eventData.toString());
      var message = decoder.convert(eventData['data']);
      debugPrint(message);
      _agents.firstWhere((element) => element.id == agent.id).containers
          ?.firstWhere((element) => element.id == containerId)
          .logs.add(message);
      notifyListeners();
    };
  }

  void startContainer(AgentModel agent, String containerId) async {
    _containerController.startContainer(agent.ip, agent.port, containerId);
    getContainersForAgent(agent);
    notifyListeners();
  }

  void stopContainer(AgentModel agent, String containerId) async {
    _containerController.stopContainer(agent.ip, agent.port, containerId);
    await getContainersForAgent(agent);
    notifyListeners();
  }

  void getContainerStats(AgentModel agent, String containerId) async {
    Map<String, dynamic> stats = await _containerController.getContainerStats(agent.ip, agent.port, containerId);
    _agents.firstWhere((element) => element.id == agent.id).containers
        ?.firstWhere((element) => element.id == containerId)
        .stats = stats;
    notifyListeners();
  }
}

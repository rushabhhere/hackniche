import 'package:hackniche_container_management/models/container_model.dart';
import 'package:hackniche_container_management/repositories/container_repository.dart';

class ContainerController {
  ContainerRepository containerRepository = ContainerRepository();

  Future<List<ContainerModel>> getAllContainers(String ip, int port) async {
    return await containerRepository.getAllContainers(ip, port);
  }

  Future<void> activateLogs(String ip, int port, String containerId) async {
    await containerRepository.activateLogs(ip, port, containerId);
  }

  void startContainer(String ip, int port, String containerId) {
    containerRepository.startContainer(ip, port, containerId);
  }

  void stopContainer(String ip, int port, String containerId) {
    containerRepository.stopContainer(ip, port, containerId);
  }

  Future<Map<String, dynamic>> getContainerStats(String ip, int port, String containerId) async {
    return await containerRepository.getContainerStats(ip, port, containerId);
  }
}
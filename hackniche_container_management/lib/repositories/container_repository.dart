import '../constants/urls.dart';
import '../services/dio_service.dart';

import '../models/container_model.dart';

class ContainerRepository {
  DioService dioService = DioService();

  Future<List<ContainerModel>> getAllContainers(String ip, int port) async {
    try {
      final response =
          await dioService.get("http://$ip:$port/containers/status", {});
      List<ContainerModel> containers = [];
      for (var container in response.data) {
        containers.add(ContainerModel.fromJson(container));
      }
      return containers;
    } catch (e) {
      rethrow;
    }
  }

  Future<void> activateLogs(String ip, int port, String containerId) async {
    try {
      await dioService.get("http://$ip:$port/containers/logs/$containerId", {});
    } catch (e) {
      rethrow;
    }
  }

  void startContainer(String ip, int port, String containerId) {
    dioService.post("http://$ip:$port/containers/start/$containerId", {});
  }

  void stopContainer(String ip, int port, String containerId) {
    dioService.post("http://$ip:$port/containers/stop/$containerId", {});
  }
}

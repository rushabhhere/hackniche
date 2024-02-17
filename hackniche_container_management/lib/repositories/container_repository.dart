import 'package:hackniche_container_management/services/dio_service.dart';

import '../models/container_model.dart';

class ContainerRepository {
  DioService dioService = DioService();
  final String url = 'http://10.120.116.119:5000/containers/status';

  Future<List<ContainerModel>> getAllContainers() async {
    try {
      final response = await dioService.get(url, {});
      List<ContainerModel> containers = [];
      for (var container in response.data) {
        containers.add(ContainerModel.fromJson(container));
      }
      return containers;
    } catch (e) {
      rethrow;
    }
  }
}

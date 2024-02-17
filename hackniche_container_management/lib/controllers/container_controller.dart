import 'package:hackniche_container_management/models/container_model.dart';
import 'package:hackniche_container_management/repositories/container_repository.dart';

class ContainerController {
  ContainerRepository containerRepository = ContainerRepository();

  Future<List<ContainerModel>> getAllContainers() async {
    return await containerRepository.getAllContainers();
  }
}
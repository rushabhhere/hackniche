import 'package:flutter/foundation.dart';
import 'package:hackniche_container_management/controllers/container_controller.dart';
import 'package:hackniche_container_management/enums/container_state_enum.dart';

import '../models/container_model.dart';
class ContainerProvider extends ChangeNotifier {
  List<ContainerModel> _containers = [];
  final ContainerController _containerController = ContainerController();

  List<ContainerModel> get containers => _containers;

  ContainerProvider() {
    getAllContainers();
  }

  void getAllContainers() {
    _containerController.getAllContainers().then((containers) {
      _containers = containers;
      notifyListeners();
    });
    notifyListeners();
  }
}

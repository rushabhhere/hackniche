import 'package:hackniche_container_management/enums/container_state_enum.dart';

import 'port_model.dart';

class ContainerModel {
  late String id;
  late String name;
  late ContainerStateEnum state;
  late String status;
  late DateTime createdAt;
  late String image;
  late String ports;
  late List<String> logs = [];
  late Map<String, dynamic> stats = {};

  ContainerModel({
    required this.id,
    required this.name,
    required this.state,
    required this.status,
    required this.createdAt,
    required this.image,
    required this.ports,
  });

  ContainerModel.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
    state = ContainerStateEnum.values.firstWhere(
        (e) => e.toString() == 'ContainerStateEnum.${json['state']}');
    status = json['status'];
    createdAt = DateTime.fromMillisecondsSinceEpoch(json['created'] ~/ 1000);
    image = json['image'];
    ports = json['ports'];
  }

  Map toJson() {
    return {
      'id': id,
      'name': name,
      'state': state,
      'status': status,
      'created': createdAt.toIso8601String(),
      'image': image,
      'ports': ports,
    };
  }
}

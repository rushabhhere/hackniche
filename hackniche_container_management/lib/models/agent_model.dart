import 'container_model.dart';

class AgentModel {
  late String id;
  late String name;
  late String ip;
  late int port;
  late List<ContainerModel>? containers;

  AgentModel({
    required this.id,
    required this.name,
    required this.ip,
    required this.port,
    this.containers,
  });

  AgentModel.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
    ip = json['ip'];
    port = json['port'];
    if (json['containers'] == null) {
      containers = [];
    } else {
      containers = (json['containers'] as List)
          .map((container) => ContainerModel.fromJson(container))
          .toList();
    }
  }

  Map toJson() {
    return {
      'id': id,
      'name': name,
      'ip': ip,
      'port': port,
      'containers': containers?.map((container) => container.toJson()).toList(),
    };
  }
}

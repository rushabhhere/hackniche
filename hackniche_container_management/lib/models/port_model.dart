class PortModel {
  late int privatePort;
  late int publicPort;
  late String type;

  PortModel({
    required this.privatePort,
    required this.publicPort,
    required this.type,
  });

  PortModel.fromJson(Map<String, dynamic> json) {
    privatePort = json['PrivatePort'] ?? 0;
    publicPort = json['PublicPort'] ?? 0;
    type = json['Type'] ?? '';
  }

  Map toJson() {
    return {
      'PrivatePort': privatePort,
      'PublicPort': publicPort,
      'Type': type,
    };
  }
}

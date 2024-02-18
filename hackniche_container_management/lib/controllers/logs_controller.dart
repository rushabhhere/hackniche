import 'package:pusher_channels_flutter/pusher_channels_flutter.dart';

import '../repositories/logs_repository.dart';

class LogsController {
  Future<PusherChannel> getLogsChannel(String containerId) async {
    return await LogsRepository().subscribeToLogs(containerId);
  }
}
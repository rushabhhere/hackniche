import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:pusher_channels_flutter/pusher_channels_flutter.dart';

import '../controllers/logs_controller.dart';

class LogsProvider extends ChangeNotifier {
  List<Map> _logs = [];

  List<Map> get logs => _logs;

  LogsProvider() {
    debugPrint('LogsProvider constructor');
    getAllLogs();
  }

  void getAllLogs() async {
    debugPrint('Getting all logs');
    PusherChannel channel = await LogsController().getLogsChannel();
    channel.onEvent = (event) {
      Map data = jsonDecode(event.data);
      if(data['Type']!="container"){
        return;
      }
      debugPrint(data.toString());
      _logs.add(data);
      notifyListeners();
    };
  }
}
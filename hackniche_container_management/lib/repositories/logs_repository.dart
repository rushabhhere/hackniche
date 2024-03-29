import 'package:flutter/foundation.dart';
import 'package:pusher_channels_flutter/pusher_channels_flutter.dart';

class LogsRepository {
  Future<PusherChannel> subscribeToLogs(String containerId) async {
    PusherChannelsFlutter pusher = PusherChannelsFlutter.getInstance();
    await pusher.init(
      apiKey: '6abe7a1cf2bdf9b4ce9c',
      cluster: 'ap2',
    );
    PusherChannel channel = await pusher.subscribe(
      channelName: containerId,
    );
    pusher.connect();
    return channel;
  }
}

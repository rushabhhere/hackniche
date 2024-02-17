import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:hackniche_container_management/presentation/splash_page.dart';
import 'package:provider/provider.dart';
import 'package:pusher_channels_flutter/pusher_channels_flutter.dart';

import 'providers/container_provider.dart';
import 'providers/logs_provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  PusherChannelsFlutter pusher = PusherChannelsFlutter();
  runApp(const RootApp());
}

class RootApp extends StatelessWidget {
  const RootApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (context) => LogsProvider(),
        ),
        ChangeNotifierProvider(
          create: (context) => ContainerProvider(),
        ),
      ],
      child: MaterialApp(
        title: 'Container Management System',
        theme: ThemeData(
          brightness: Brightness.dark,
          textTheme: GoogleFonts.interTextTheme().apply(
            bodyColor: Colors.white,
            displayColor: Colors.white,
            decorationColor: Colors.white,
          ),
        ),
        home: const SplashPage(),
      ),
    );
  }
}

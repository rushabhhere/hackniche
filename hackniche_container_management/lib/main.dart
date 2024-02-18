import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:hackniche_container_management/presentation/splash_page.dart';
import 'package:hackniche_container_management/providers/agent_provider.dart';
import 'package:provider/provider.dart';
import 'package:pusher_channels_flutter/pusher_channels_flutter.dart';

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
          create: (context) => AgentProvider(),
        ),
      ],
      child: MaterialApp(
        title: 'DockerSensei',
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

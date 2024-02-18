import '../constants/urls.dart';
import '../services/dio_service.dart';

import '../models/agent_model.dart';

class AgentRepository {
  final DioService _dioService = DioService();

  Future<List<AgentModel>> getAllAgents() async {
    try {
      final response = await _dioService.get("${Urls.baseUrl}/api/agent/agents", {});
      List<AgentModel> agents = [];
      for (var agent in response.data) {
        agents.add(AgentModel.fromJson(agent));
      }
      return agents;
    } catch (e) {
      rethrow;
    }
  }
}

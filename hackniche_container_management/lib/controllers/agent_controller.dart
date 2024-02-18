import '../models/agent_model.dart';
import '../repositories/agent_repository.dart';

class AgentController {
  AgentRepository _agentRepository = AgentRepository();

  Future<List<AgentModel>> getAllAgents() async {
    return await _agentRepository.getAllAgents();
  }
}

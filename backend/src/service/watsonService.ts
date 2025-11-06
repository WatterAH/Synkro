import AssistantV2 from 'ibm-watson/assistant/v2';
import { IamAuthenticator } from 'ibm-watson/auth';


class WatsonService {
  private assistant: AssistantV2;
  private assistantId: string;

  constructor() {
    this.assistant = new AssistantV2({
      version: '2023-06-15',
      authenticator: new IamAuthenticator({
        apikey: process.env.IBM_WATSON_API_KEY!,
      }),
      serviceUrl: process.env.IBM_WATSON_URL!,
    });
    this.assistantId = process.env.IBM_ASSISTANT_ID!;
  }

  async createSession(): Promise<string> {
    try {
      const response = await this.assistant.createSession({
          assistantId: this.assistantId,
          environmentId: ''
      });
      return response.result.session_id;
    } catch (error) {
      console.error('Error creating Watson session:', error);
      throw error;
    }
  }

  async sendMessage(sessionId: string, message: string) {
    try {
      const response = await this.assistant.message({
          assistantId: this.assistantId,
          sessionId: sessionId,
          input: {
              message_type: 'text',
              text: message,
          },
          environmentId: ''
      });
      return response.result;
    } catch (error) {
      console.error('Error sending message to Watson:', error);
      throw error;
    }
  }

  async deleteSession(sessionId: string) {
    try {
      await this.assistant.deleteSession({
          assistantId: this.assistantId,
          sessionId: sessionId,
          environmentId: ''
      });
    } catch (error) {
      console.error('Error deleting Watson session:', error);
      throw error;
    }
  }
}

export default new WatsonService();
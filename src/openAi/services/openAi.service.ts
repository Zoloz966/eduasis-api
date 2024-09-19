import { Injectable, NotFoundException } from '@nestjs/common';
import { UserContextService } from 'src/userContext/service/userContext.service';
import OpenAI from 'openai'; // Asegúrate de tener la librería instalada

@Injectable()
export class OpenAIService {
  private client: OpenAI;

  constructor(private readonly userContextAuth: UserContextService) {
    // Inicializa el cliente con la API Key obtenida de las variables de entorno
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Aquí accedes a la variable de entorno
    });
  }

  // Método básico para interactuar con la API de OpenAI
  public async getBasicPrompt(prompt: string): Promise<string> {
    try {
      const propetPromt = `
        
      `
      const response = await this.client.chat.completions.create({
        model: 'gpt-4', // Especifica el modelo a usar (puedes usar 'gpt-3.5-turbo' o 'gpt-4')
        messages: [{ role: 'user', content: prompt }],
      });

      // Devuelve la respuesta de la IA
      return response.choices[0]?.message?.content || 'No response';
    } catch (error) {
      // Maneja el error apropiadamente
      console.error('Error interacting with OpenAI:', error);
      throw new NotFoundException('Error in OpenAI response');
    }
  }
}

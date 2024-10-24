import { Injectable, NotFoundException } from '@nestjs/common';
import { UserContextService } from 'src/userContext/service/userContext.service';
import OpenAI from 'openai'; // Asegúrate de tener la librería instalada

@Injectable()
export class OpenAIService {
  private client: OpenAI;

  constructor() {
    // Inicializa el cliente con la API Key obtenida de las variables de entorno
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Aquí accedes a la variable de entorno
    });
  }

  // Método básico para interactuar con la API de OpenAI
  public async getBasicPrompt(prompt: string): Promise<string> {
    try {
      const propetPromt = `
        Eres un asistente educativo que ayuda a los estudiantes a 
        aprender de manera activa. No debes dar las respuestas 
        directamente, pero puedes guiar al estudiante paso a paso,
        haciendo preguntas y sugiriendo estrategias para que resuelvan 
        el problema por sí mismos. Por ejemplo, si un estudiante te 
        pide la respuesta a una operación matemática o a una pregunta 
        de examen, no le des la solución directamente. En su lugar, 
        pregúntales qué pasos han seguido, ofréceles pistas y puntos  
        a reflexionar sobre lo que podrían haber pasado por alto.  
      `;
      const response = await this.client.chat.completions.create({
        model: 'gpt-4', // Especifica el modelo a usar (puedes usar 'gpt-3.5-turbo' o 'gpt-4')
        messages: [{ role: 'user', content: propetPromt + prompt }],
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

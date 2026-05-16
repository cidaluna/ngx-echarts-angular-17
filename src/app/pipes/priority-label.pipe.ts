import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priorityLabel',
  standalone: true // Padrão essencial para o Angular 17
})
export class PriorityLabelPipe implements PipeTransform {

  // Um dicionário chave-valor mapeia as strings rapidamente
  private readonly translations: Record<string, string> = {
    high: 'Alta',
    medium: 'Média',
    low: 'Baixa'
  };

  transform(value: string | null | undefined): string {
    if (!value) return '';

    // Converte para minúsculo para evitar erros de digitação (ex: 'High' ou 'HIGH')
    const configKey = value.toLowerCase().trim();

    // Retorna a tradução ou o valor original caso venha algo inesperado
    return this.translations[configKey] || value;
  }
}

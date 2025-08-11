import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tarefa } from "./tarefas";
import { Item } from "./item/item";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, Item],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('TODOapp');
  arrayDeTarefas: Tarefa[] = [];
  dataHoraAtual = signal('');
  private intervalId: any;
  
  constructor() {
    this.READ_tarefas();
  }

  ngOnInit() {
    this.atualizarDataHora();
    // Atualiza a cada segundo
    this.intervalId = setInterval(() => {
      this.atualizarDataHora();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private atualizarDataHora() {
    const agora = new Date();
    
    // Configurar para o fuso horário de Brasília (UTC-3)
    const opcoesData: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'America/Sao_Paulo'
    };
    
    const opcoesHora: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo'
    };

    const data = agora.toLocaleDateString('pt-BR', opcoesData);
    const hora = agora.toLocaleTimeString('pt-BR', opcoesHora);
    
    this.dataHoraAtual.set(`${data} • ${hora}`);
  }

  CREATE_tarefa(descricaoNovaTarefa: string){
    if (descricaoNovaTarefa.trim() !== '') {
      var novaTarefa = new Tarefa(descricaoNovaTarefa.trim(), false);
      this.arrayDeTarefas.unshift(novaTarefa);
    }
  }

  READ_tarefas() {
    this.arrayDeTarefas = [
      new Tarefa("Estudar Frameworks", false),
      new Tarefa("Almossar", false),
      new Tarefa("Fazer exercícios", false)
    ];
  }

  removerTarefa(index: number) {
    this.arrayDeTarefas.splice(index, 1);
  }

  getProgressPercentage(): number {
    if (this.arrayDeTarefas.length === 0) return 0;
    const completedTasks = this.arrayDeTarefas.filter(tarefa => tarefa.statusRealizada).length;
    return Math.round((completedTasks / this.arrayDeTarefas.length) * 100);
  }
}


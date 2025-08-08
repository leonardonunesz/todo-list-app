import { Component, signal } from '@angular/core';
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
export class App {
  protected readonly title = signal('TODOapp');
  arrayDeTarefas: Tarefa[] = [];
  
  constructor() {
    this.READ_tarefas();
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


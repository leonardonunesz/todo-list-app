import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tarefa } from '../tarefas';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item.html',
  styleUrl: './item.css'
})
export class Item {
  @Input() tarefa!: Tarefa;
  @Output() removerTarefa = new EventEmitter<void>();
  emEdicao: boolean = false;
}

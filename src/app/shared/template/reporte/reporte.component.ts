import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'template-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {
  @Input() title: string;
  @Input() backRoute: string;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.router.navigate([this.backRoute]);
  }
}
import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-confirm',
  templateUrl: './snack-confirm.component.html',
  styleUrls: ['./snack-confirm.component.scss']
})
export class SnackConfirmComponent implements OnInit {
  @Input() msg = '¡Guardado exitosamente!';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {
  }

  ngOnInit(): void {
    if (this.data) {
      this.msg = this.data;
    }
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CreSaguapacDebt } from '../../../../Services/service-payments/models/cre-saguapac-debt';
import { DelapazDebt } from '../../../../Services/service-payments/models/delapaz-debt';
import { GlobalService } from '../../../../Services/shared/global.service';
import { CreSaguapacPayment } from '../../../../Services/service-payments/models/service-payment';

@Component({
  selector: 'app-debt-detail',
  templateUrl: './debt-detail.component.html',
  styleUrls: ['./debt-detail.component.css']
})
export class DebtDetailComponent implements OnInit {

  isPayment = false;
  lastChecked: number;
  creSaguapacPayments: CreSaguapacPayment[] = [];
  @Input() creSaguapacDebt: CreSaguapacDebt;
  @Input() delapazDebt: DelapazDebt;
  @Input() service: string;
  @Input() disabled: boolean;
  @Output() onChange: EventEmitter<any>;

  constructor(private messageService: GlobalService) {
    this.onChange = new EventEmitter();
    this.lastChecked = -1;
  }

  ngOnInit() {
  }

  handleCreSaguapacAmountChecked(debt) {
    if ((debt.selected && debt.id == this.lastChecked + 1) || (!debt.selected && debt.id == this.lastChecked)) {
      if(!debt.selected){
        this.lastChecked--;
        this.creSaguapacPayments.pop();
      }
      else{
        this.lastChecked++;
        this.creSaguapacPayments.push(new CreSaguapacPayment({
          code: this.creSaguapacDebt.code,
          name: this.creSaguapacDebt.name,
          serviceTypeId: this.service,
          period: debt.period,
          amount: debt.amount,
          documentNumber: debt.documentNumber
        }));
      }
    }
    else {
      this.messageService.warning("Selección incorrecta de deuda", "Debe seleccionar las deudas pasadas.")
      setTimeout(() => { debt.selected = !debt.selected; }, 70);
    }
    this.onChange.emit(this.creSaguapacPayments);
  }

  handleDelapazAmountChecked() {
    this.onChange.emit(this.isPayment ? this.delapazDebt : undefined);
  }
}

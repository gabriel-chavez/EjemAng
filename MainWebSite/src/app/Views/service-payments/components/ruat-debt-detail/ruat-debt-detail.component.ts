import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VehicleDebtResult } from '../../../../Services/ruat/models/vehicle-debt-result';
import { PropertyDebtResult } from '../../../../Services/ruat/models/property-debt-result';
import { GlobalService } from '../../../../Services/shared/global.service';
import { DebtDetail } from '../../../../Services/ruat/models/debt-detail';
import { Payment } from '../../../../Services/ruat/models/payment';
import { RuatDto } from '../../../../Services/ruat/models/ruat-dto';

@Component({
  selector: 'app-ruat-debt-detail',
  templateUrl: './ruat-debt-detail.component.html',
  styleUrls: ['./ruat-debt-detail.component.css']
})
export class RuatDebtDetailComponent implements OnInit {

  lastChecked: number = -1;
  debts: DebtDetail[] = [];
  payment: Payment;
  @Input() vehicleDebt: VehicleDebtResult;
  @Input() propertyDebt: PropertyDebtResult;
  @Input() propertyDto: RuatDto;
  @Input() disabled: boolean;
  @Output() onChange: EventEmitter<any>;

  constructor(private globalService: GlobalService) {
    this.onChange = new EventEmitter();
    this.payment = new Payment();
  }

  ngOnInit() {
  }

  addOrRemoveDebts(debt: any, debtDetail: any) {
    let debtIndex = debt.debtDetail.filter(x => x.isPaymentPossible).findIndex(x => x == debtDetail);
    if ((debtDetail.selected && debtIndex == this.lastChecked + 1) || (!debtDetail.selected && debtIndex == this.lastChecked)) {
      if (!debtDetail.selected) {
        this.lastChecked--;
        this.debts.pop();
      }
      else {
        this.lastChecked++;
        this.debts.push(debtDetail);
      }
    }
    else {
      this.globalService.warning("Selección incorrecta de deuda", "Debe seleccionar las deudas pasadas.")
      setTimeout(() => { debtDetail.selected = !debtDetail.selected; }, 70);
    }
    this.payment.debtDetails = this.debts
    this.onChange.emit(this.payment);
  }

  handleVehicleDebtChecked(debtDetail: any) {
    this.payment.serviceTypeInformation = this.vehicleDebt.vehicle;
    this.addOrRemoveDebts(this.vehicleDebt, debtDetail);
  }

  handlePropertyDebtChecked(debtDetail: any) {
    this.payment.serviceTypeInformation = this.propertyDebt.property;
    this.payment.serviceTypeInformation.criteria = this.propertyDto.criteria;
    this.payment.serviceTypeInformation.documentExtension = this.propertyDto.documentExtension;
    this.payment.serviceTypeInformation.documentNumber = this.propertyDto.documentNumber;
    this.payment.serviceTypeInformation.documentType = this.propertyDto.documentType;
    this.addOrRemoveDebts(this.propertyDebt, debtDetail);
  }

}

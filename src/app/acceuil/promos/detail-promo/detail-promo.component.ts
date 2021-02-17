import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PromosService} from '../../../services/promos.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-detail-promo',
  templateUrl: './detail-promo.component.html',
  styleUrls: ['./detail-promo.component.css']
})
export class DetailPromoComponent implements OnInit {
  fileName = 'ExcelSheet.xlsx';
  promo: any;

  constructor(private promoService: PromosService, private route: ActivatedRoute) {
    const idp = this.route.snapshot.params.id;
    this.promoService.getPromoById(idp).subscribe(data => {
      this.promo = data ;
      console.log(this.promo);
    }) ;
  }

  ngOnInit(): void {
  }

  exportExcel(): any {
    // passer l'id de la table
    const element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    // generate workBook and add the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // save to file
    XLSX.writeFile(wb, this.fileName);
  }
}

import { Component, OnInit } from '@angular/core';
import {ReferentielService} from '../../../services/referentiel.service';
import {PromosService} from '../../../services/promos.service';

@Component({
  selector: 'app-list-promo',
  templateUrl: './list-promo.component.html',
  styleUrls: ['./list-promo.component.css']
})
export class ListPromoComponent implements OnInit {
  promos: any;

  constructor(private promoService: PromosService) {
    this.promoService.getPromo().subscribe(data => {
      this.promos = data ;
      // console.log(this.promos);
    }) ;
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import {GrpComprtenceService} from '../../../services/grp-comprtence.service';
import {ActivatedRoute} from '@angular/router';
import {ReferentielService} from '../../../services/referentiel.service';

@Component({
  selector: 'app-detail-referentiel',
  templateUrl: './detail-referentiel.component.html',
  styleUrls: ['./detail-referentiel.component.css']
})
export class DetailReferentielComponent implements OnInit {
  referentiel: any;

  constructor(private referentielService: ReferentielService, private route: ActivatedRoute) {
    const idp = this.route.snapshot.params.id;
    this.referentielService.getReferentielById(idp).subscribe(data => {
      this.referentiel = data ;
      console.log(this.referentiel);
    }) ;
  }

  ngOnInit(): void {
  }

  b64toBlob(b64Data: any, contentType = 'application/pdf'): any {
    contentType = contentType || '';
    const sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, '');
    b64Data = b64Data.replace(/\s/g, '');
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  openProgramme(): any {
    const file = this.b64toBlob(this.referentiel.programme);
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank');
  }

}

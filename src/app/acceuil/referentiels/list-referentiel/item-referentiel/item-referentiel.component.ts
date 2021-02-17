import {Component, Input, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {ReferentielService} from '../../../../services/referentiel.service';

@Component({
  selector: 'app-item-referentiel',
  templateUrl: './item-referentiel.component.html',
  styleUrls: ['./item-referentiel.component.css']
})
export class ItemReferentielComponent implements OnInit {
  // @ts-ignore
  @Input() referentiel: any;


  constructor(private referentielService: ReferentielService) { }

  ngOnInit(): void {}
  // tslint:disable-next-line:typedef
  removeGrpCompetence(id: number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.referentielService.deleteReferentiel(id).subscribe(reponse => {
          console.log(reponse);
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
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

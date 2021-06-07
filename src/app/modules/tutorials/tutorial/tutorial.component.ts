import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { FirestoreService } from '../../../core/firestore.service';
@Component({
  selector: 'app-tutorial',
  template: `
  <div class="modal-header">
    <h4 class="modal-title">{{video?.title}}</h4>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <iframe class="e2e-iframe-trusted-src" width="100%" height="480px"
    [src]="videoUrl" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
`,
})

export class NgbdModalContent {
  @Input() video: any;
  @Input() videoUrl: any;

  constructor(public activeModal: NgbActiveModal) { }
}
@Component({
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css'],
})
export class TutorialComponent implements OnInit {
  closeResult: string;
  tutorials: any = [{
    title: 'Tecnologies',
    desc: 'Tecnologies Video',
    videos: [
      {
        title: 'Internet of Things (IoT) | What is IoT | How it Works | IoT Explained | Edureka',
        videoUrl: 'https://www.youtube.com/embed/-paSOoGCaN0?autoplay=1&modestbranding=1',
        desc: 'This Edureka video on "Internet of Things (IoT)" will explain all the basic concepts of IoT you need to know.',
        imageUrl: 'https://qph.fs.quoracdn.net/main-qimg-79e9aef53ee8087604e4f0038aedf639',
      }, {
        title: 'HOW IT WORKS - Episode 13 - Mobile Phones, Bamboo Scaffolding, Rice, Stove ',
        videoUrl: 'https://www.youtube.com/embed/-paSOoGCaN0?autoplay=1&modestbranding=1',
        desc: 'Mobile Phones-Bamboo Scaffolding-Rice- Wood Burning Stove',
        imageUrl: 'http://whitecode.legal/assets/images/how_it_works.jpg',
      }, {
        title: 'Clutch, How does it work ?',
        videoUrl: 'https://www.youtube.com/embed/-paSOoGCaN0?autoplay=1&modestbranding=1',
        desc: 'Have you ever wondered what is happening inside a car when you press the clutch pedal? Or why do you need to press the clutch pedal before you shift gears',
        imageUrl: 'http://siamagazin.com/wp-content/uploads/2018/02/qwfqwf2w-min.jpg',
      },
    ],
  }, {
    title: 'Google',
    desc: 'Google of videos',
    videos: [
      {
        title: 'Internet of Things (IoT) | What is IoT | How it Works | IoT Explained | Edureka',
        videoUrl: 'https://www.youtube.com/embed/-paSOoGCaN0?autoplay=1&modestbranding=1',
        desc: 'This Edureka video on "Internet of Things (IoT)" will explain all the basic concepts of IoT you need to know.',
        imageUrl: 'https://qph.fs.quoracdn.net/main-qimg-79e9aef53ee8087604e4f0038aedf639',
      }, {
        title: 'HOW IT WORKS - Episode 13 - Mobile Phones, Bamboo Scaffolding, Rice, Stove ',
        videoUrl: 'https://www.youtube.com/embed/-paSOoGCaN0?autoplay=1&modestbranding=1',
        desc: 'Mobile Phones-Bamboo Scaffolding-Rice- Wood Burning Stove',
        imageUrl: 'http://whitecode.legal/assets/images/how_it_works.jpg',
      }, {
        title: 'Clutch, How does it work ?',
        videoUrl: 'https://www.youtube.com/embed/-paSOoGCaN0?autoplay=1&modestbranding=1',
        desc: 'Have you ever wondered what is happening inside a car when you press the clutch pedal? Or why do you need to press the clutch pedal before you shift gears',
        imageUrl: 'http://siamagazin.com/wp-content/uploads/2018/02/qwfqwf2w-min.jpg',
      },
    ],
  }];

  constructor(private modalService: NgbModal, private sanitizer: DomSanitizer,
    public fireDB: FirestoreService) { }
  ngOnInit() {
    // this.fireDB.docRoot(`global/help`).set({tutorial: this.tutorials});
    const FbDbSubscribe = this.fireDB.docRoot$(`global/help`).subscribe((tutorialData: any) => {
       this.tutorials = tutorialData.tutorial;
      FbDbSubscribe.unsubscribe();
    });
  }
  open(video: any) {
    const modalRef = this.modalService.open(NgbdModalContent, { windowClass: 'dark-modal', size: 'lg', centered: true });
    modalRef.componentInstance.video = video;
    modalRef.componentInstance.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(video.videoUrl);
  }

  // openWindowCustomClass(content: any) {
  //   this.modalService.open(content, { windowClass: 'dark-modal' });
  // }

  // openSm(content: any) {
  //   this.modalService.open(content, { size: 'sm' });
  // }

  // openLg(content: any) {
  //   this.modalService.open(content, { size: 'lg' });
  // }

  // openVerticallyCentered(content: any) {
  //   this.modalService.open(content, { centered: true });
  // }

}

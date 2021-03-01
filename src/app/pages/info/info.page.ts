import { BackgroundLocationService } from 'src/app/services/background-location.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController, ModalController, IonContent } from '@ionic/angular';
import { NavigationOptions } from '@ionic/angular/providers/nav-controller';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  @ViewChild(IonSlides, { static: true }) slider: IonSlides;
  @ViewChild(IonContent, { static: true }) content: IonContent;
  currentIndex: number;

  options: NavigationOptions;

  sliderOptions: any;
  constructor(
    private navController: NavController,
    private backgroundLocationService: BackgroundLocationService,
    private modalController: ModalController
  ) {
    this.sliderOptions = { allowTouchMove: false };
  }

  ngOnInit() {
    this.currentIndex = 0;
  }

  handleSlide(currentSlideIndex: number): void {
    this.currentIndex = currentSlideIndex;
    this.content.scrollToTop();
  }

  startWizzard(): void {
    this.slideNext();
  }

  startBackgroundLocation(): void {
    this.backgroundLocationService.initialize();
    setTimeout(() => {
      this.slideNext();
    }, 1000);
  }

  openSettings(): void {
    this.modalController.dismiss();
    this.navController.navigateForward('settings');
  }

  slideNext(): void {
    this.slider.slideNext();
    this.slider
      .getActiveIndex()
      .then((value: number) => this.handleSlide(value));
  }

  close(): void {
    this.modalController.dismiss();
  }
}

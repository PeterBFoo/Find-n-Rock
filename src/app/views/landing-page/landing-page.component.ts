import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements AfterViewInit {
  renderedVideo: boolean = false;
  landingVideo: string = "assets/videos/landing-video.mp4";

  ngAfterViewInit(): void {
    this.renderedVideo = true;
  }
}

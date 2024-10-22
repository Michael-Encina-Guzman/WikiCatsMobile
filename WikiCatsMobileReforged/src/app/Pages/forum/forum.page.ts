import { Component, OnInit } from '@angular/core';
import { CatService } from 'src/app/Services/cat.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {
  catImages: string[] = [];
  fetchedImages: Set<string> = new Set();

  constructor(private catService: CatService) { }

  ngOnInit() {
    this.fetchCatImages();
  }

  fetchCatImages() {
    this.catService.getCatImages().subscribe((data) => {
      data.forEach(cat => {
        // Ensure we only add new images
        if (!this.fetchedImages.has(cat.url)) {
          this.fetchedImages.add(cat.url);
          this.catImages.push(cat.url);
        }
      });

      // If we still don't have 5 unique images, fetch more
      if (this.catImages.length < 3) {
        this.fetchCatImages();
      }
    });
  }
}

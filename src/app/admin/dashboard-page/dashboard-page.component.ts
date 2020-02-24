import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../shared/services/post.service';
import { Post } from '../../shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  pSub: Subscription;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.pSub = this.postService.getAll().subscribe(res => this.posts = res);
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }

  remove(id: string) {

  }
}

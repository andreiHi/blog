import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FbCreateResponse, Post } from '../../../shared/interfaces';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {
  }

  create(post: Post): Observable<Post> {
    return  this.http.post<FbCreateResponse>(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(
        map((response: FbCreateResponse) => {
          post.id = response.name;
          post.date = new Date(post.date);
          return post;
        })
      );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Post } from '../interfaces/PostInterface';
import { environment } from '../../../environments/environment.prod';
import { SearchData } from 'src/app/components/searcher/interfaces/SearchEventInterface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = environment.apiUrl;

  private apiUrl = this.baseUrl + '/auth/posts';
  private onePost = this.baseUrl + '/auth/post';
  private createPostUrl = this.baseUrl + '/auth/posts/create';
  private suscribeToPostUrl = this.baseUrl + '/auth/posts/suscribe';
  private unsuscribeToPostUrl = this.baseUrl + '/auth/posts/unsuscribe';
  private suscribedPostsUrl = this.baseUrl + '/auth/suscribed/posts';
  private historyPostsUrl = this.baseUrl + '/auth/history/posts';
  private deletePostUrl = this.baseUrl + '/auth/posts/delete';
  private updatePostUrl = this.baseUrl + '/auth/posts/edit';
  private chooseCandidatesUrl = this.baseUrl + '/auth/post/choose';

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl, {
      withCredentials: true
    });
  }

  getPostsByFilters(filters: SearchData | any): Observable<Post[]> {
    let url = this.apiUrl + '?';

    for (let key in filters) {
      if (filters[key]) {
        url += `${key}=${filters[key]}&`;
      }
    }
    url = url.slice(0, -1);

    return this.http.get<Post[]>(url, {
      withCredentials: true
    });
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.onePost}/${id}`, {
      withCredentials: true
    });
  }

  getSuscribedPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.suscribedPostsUrl}`, {
      withCredentials: true
    });
  }

  createPost(post: any): Observable<Post> {
    return this.http.post<Post>(this.createPostUrl, post, {
      withCredentials: true
    });
  }

  getHistoryPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.historyPostsUrl}`, {
      withCredentials: true
    });
  }

  deletePost(id: number): Observable<Post> {
    return this.http.post<Post>(`${this.deletePostUrl}/${id}`, {}, {
      withCredentials: true
    });
  }

  updatePost(post: any, id: number): Observable<Post> {
    return this.http.post<Post>(`${this.updatePostUrl}/${id}`, post, {
      withCredentials: true
    });
  }

  suscribeToPost(id: number): Observable<Post> {
    return this.http.post<any>(`${this.suscribeToPostUrl}/${id}`, {}, {
      withCredentials: true
    });
  }

  unsuscribeToPost(id: number): Observable<Post> {
    return this.http.post<any>(`${this.unsuscribeToPostUrl}/${id}`, {}, {
      withCredentials: true
    });
  }

  chooseCandidates(id: number, candidates: string[]): Observable<Post> {
    return this.http.post<any>(`${this.chooseCandidatesUrl}/${id}`, { candidates: candidates }, {
      withCredentials: true
    });
  }

}

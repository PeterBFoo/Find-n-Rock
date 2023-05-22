import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Post } from '../interfaces/PostInterface';
import { environment } from '../../../environments/environment.prod';

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

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl, {
      withCredentials: true
    });
  }

  getPostsByFilters(filters: any): Observable<Post[]> {
    let url = `${this.apiUrl}?country=${filters.country}&region=${filters.region}&city=${filters.city}&genres=${filters.genre}`;

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

}

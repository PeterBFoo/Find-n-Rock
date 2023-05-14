import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Post } from '../interfaces/PostInterface';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost:3000/api/auth/posts';
  private onePost = 'http://localhost:3000/api/auth/post';

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl, {
      headers: {
        "authorization": `Bearer ${localStorage.getItem("token")}`
      }, withCredentials: false
    });
  }

  getPostsByFilters(filters: any): Observable<Post[]> {
    let url = `${this.apiUrl}?country=${filters.country}&region=${filters.region}&city=${filters.city}&genres=${filters.genre}`;

    return this.http.get<Post[]>(url, {
      headers: {
        "authorization": `Bearer ${localStorage.getItem("token")}`
      }, withCredentials: false
    });
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.onePost}/${id}`, {
      headers: {
        "authorization": `Bearer ${localStorage.getItem("token")}`
      }, withCredentials: false
    });
  }

}

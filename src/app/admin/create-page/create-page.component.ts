import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../shared/interfaces';
import { PostService } from '../shared/services/post.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  validationErrors = {
    title: [
      {type: 'required', message: 'Введите название поста'}
    ],
    author: [
      {type: 'required', message: 'Введите автора поста'}
    ],
    text: [
      {type: 'required', message: 'Введите текст'}
    ]
  };
  form: FormGroup;
  constructor(private fb: FormBuilder, private postService: PostService) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const post: Post = {
      title : this.form.get('title').value,
      author: this.form.get('author').value,
      text:  this.form.get('text').value,
      date: new Date()
    };
    this.postService.create(post)
      .subscribe(ress => {
        console.log(ress)
        this.form.reset();
      });
  }
}

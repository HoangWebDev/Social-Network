import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PostsService } from '../../service/posts.service';
import { PostsModel } from '../../models/posts.model';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../service/user.service';
import { LikeService } from '../../service/like.service';
import { LikeModel } from '../../models/like.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ContactComponent } from '../contact/contact.component';
import { CommentService } from '../../service/comment.service';
import { CommentModel } from '../../models/comment';
import { FormBuilder, Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ContactComponent, ReactiveFormsModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {

  posts: PostsModel[] = [];
  users: { [key: number]: UserModel } = {};
  user: UserModel[] = [];
  like: LikeModel[] = [];
  userProfile: UserModel | null = null;
  comments: CommentModel[] = [];
  commentsByPost: { [key: number]: CommentModel[] } = {};
  addcomments: CommentModel | null = null;

  //Form Comment
  formComment = this.formBuilder.group({
    content: ['', Validators.required]
  });

  //Form Posts
  formPosts = this.formBuilder.group({
    content: ['', Validators.required],
    image: ['']
  })

  constructor(
    private postsService: PostsService,
    private userService: UserService,
    private likeService: LikeService,
    private commentService: CommentService,
    private formBuilder: FormBuilder
  ) { }

  /*  Các phương thức của Posts */
  getPosts() {
    this.postsService.getPosts().subscribe({
      next: (posts) => {
        if (posts) {
          this.posts = posts;
          for (const post of posts) {
            if (post.id_posts) {
              // Kiểm tra xem thông tin người dùng đã có trong 'users' hay chưa
              this.getUserById(post.id_user);
              //Lấy like bài posts     
              this.getLikePosts(post.id_posts)
              //Lấy comment
              this.loadComments(post.id_posts);
            }
          }
        }
      },
      error: (error) => {
        console.error('Get posts thất bại', error);
      }
    });
  }

  //Lấy thông tin userprofile
  getUserProfile() {
    this.userService.getUserProfile().subscribe({
      next: (user) => this.userProfile = user,
      error: (error) => console.error('Get user profile thất bại', error)
    });
  }

  //Lấy user theo id
  getUserById(id_user: number) {
    // Chỉ lấy thông tin người dùng nếu chưa có trong 'users'
    this.userService.getUserById(id_user).subscribe({
      next: (user) => this.users[id_user] = user, // Lưu trữ thông tin người dùng                
      error: (error) => console.error(`Get user theo id thất bại ${id_user}`, error)
    });
  }

  //Lấy thông tin của các user
  getUsers() {
    this.userService.getUsers().subscribe({
      next: (user) => {
        if (this.userProfile) {
          this.user = user.filter((user) => user.id_user !== this.userProfile!.id_user)
        }
      },
      error: (error) => {
        console.error('Get user thất bại', error);
      }
    })
  }

  //Lấy like bài posts
  getLikePosts(id_posts: number) {
    this.likeService.getLikePosts(id_posts).subscribe({
      next: (likes) => {
        this.like[id_posts] = {
          ...this.like[id_posts],
          like_count: likes.length
        };
      },
      error: (error) => {
        console.error('Get like thất bại', error);
      }
    });
  }

  //Add posts
  addPosts(id_user: number) {
    if (id_user && this.formPosts.valid) {
      const content = this.formPosts.value as PostsModel;
      const newPosts = new PostsModel(
        null,
        id_user,
        content.content,
        content.image,
        new Date(),
        new Date()
      )
      this.postsService.addPosts(newPosts).subscribe({
        next: (next) => {
          console.log(next);
          window.location.reload();
          this.getPosts();
        },
        error: (error) => {
          console.error('Add posts thất bị', error);
        }
      })
    }
  }

  //Remove post
  removePosts(id_posts: number) {

    if (!confirm('Bạn có muốn xóa bài viết này?')) {
      return
    }

    this.postsService.deletePosts(id_posts).subscribe({
      next: (next) => {
        console.log(next);
        window.location.reload();
      },
      error: (error) => {
        console.error('Remove post thất bị', error);
      }
    })
  }

  /* Show comment */
  showComment(event: Event) {
    // Đảm bảo rằng event.target có thể được cast thành Element
    const target = event.target as Element;

    // Closest dùng để lấy phần tử cha gần nhất
    const postItem = target.closest(".main_status--item");

    if (postItem) {
      const modelComment = postItem.querySelectorAll(".model_comment");

      modelComment.forEach(model => {
        model.classList.toggle("comment_active");
      });
    }
  }

  /* Load comments */
  loadComments(id_posts: number) {
    this.commentService.getCommentsByPostId(id_posts).subscribe({
      next: (comments) => {
        this.commentsByPost[id_posts] = comments;
      },
      error: (error) => {
        console.error(`Không load được comment ${id_posts}`, error);
      }
    });
  }

  /* Add comment */
  addComment(id_posts: number) {
    if (this.userProfile?.id_user && id_posts && this.formComment.valid) {
      const content = this.formComment.value.content ?? '';
      const newComment = new CommentModel(
        null, // id_comment sẽ được tự động tạo bởi server
        this.userProfile.id_user,
        id_posts,
        content,
        new Date(), // created_at
        new Date()  // updated_at
      );
      this.commentService.addComment(newComment).subscribe({
        next: (comment) => {
          this.commentsByPost[id_posts].push(comment);
        },
        error: (error) => {
          console.error(`Thêm comments không thành công ${id_posts}`, error);
        }
      });
    }
  }

  /* Delete comment */
  deleteComment(id_comment: number) {
    this.commentService.deleteComment(id_comment).subscribe({
      next: () => {
        this.comments = this.comments.filter(comment => comment.id_comment !== id_comment);
        console.log(`Đã xóa comment ${id_comment}`);
      },
      error: (error) => {
        console.error(`Xóa thất bại ${id_comment}`, error);
      }
    });
  }

  /* Like posts */
  likePost(id_posts: number) {
    const user = this.userProfile;
    if (user?.id_user && id_posts) {
      if (this.like[id_posts].id_posts && this.like[id_posts].id_user) {
        console.log(this.like[id_posts].id_posts, this.like[id_posts].id_user);
        // Nếu người dùng đã like bài viết, thực hiện hành động unlike
        this.likeService.unlikePosts(id_posts, user.id_user).subscribe({
          next: () => {
            // Xóa thông tin like từ đối tượng this.like
            delete this.like[id_posts];
            this.getLikePosts(id_posts); // Gọi hàm để cập nhật số like
          },
          error: (error) => {
            console.error(`Unlike thất bại ${id_posts}`, error);
          }
        });
      } else {
        // Nếu người dùng chưa like bài viết, thực hiện hành động like
        this.likeService.likePosts(id_posts, user.id_user).subscribe({
          next: (like) => {
            this.like[id_posts] = like;
            this.getLikePosts(id_posts);
          },
          error: (error) => {
            console.error(`Like thất bại ${id_posts}`, error);
          }
        });
      }
    } else {
      console.error('User không tồn tại');
    }
  }

  openModel() {
    const openModel = document.querySelector('.main_posts--model');
    const overLay = document.querySelector('.overlay');
    console.log(openModel, overLay);

    if (openModel && overLay) {
      openModel.classList.toggle('active');
      overLay.classList.toggle('active');
    }
  }

  ngOnInit() {
    this.getPosts();
    this.getUserProfile();
    this.getUsers();
  }
}



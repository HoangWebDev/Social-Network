import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../service/user.service';
import { ContactComponent } from '../contact/contact.component';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../service/posts.service';
import { PostsModel } from '../../models/posts.model';
import { FormBuilder, ReactiveFormsModule, Validators, FormControl, FormGroup } from '@angular/forms';
import { LikeService } from '../../service/like.service';
import { CommentService } from '../../service/comment.service';
import { LikeModel } from '../../models/like.model';
import { CommentModel } from '../../models/comment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ContactComponent, CommonModule, RouterLink, ReactiveFormsModule, RouterLinkActive],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  posts: PostsModel[] = [];
  postsId: PostsModel | null = null;
  user: UserModel | null = null;
  userProfile: UserModel | null = null;
  like: LikeModel[] = [];
  commentsByPost: { [key: number]: CommentModel[] } = {};

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
    private route: ActivatedRoute,
    private userService: UserService,
    private postsService: PostsService,
    private likeService: LikeService,
    private commentService: CommentService,
    private formBuilder: FormBuilder
  ) { }

  //Lấy bài posts theo đúng id_user
  getPostsByIdUser(id_user: number) {
    this.postsService.getPostsByIdUser(id_user).subscribe({
      next: (posts) => {
        this.posts = posts;
        for (const post of posts) {
          if (post.id_posts) {
            // Kiểm tra xem thông tin người dùng không có trong 'users' hay chưa
            this.getUserProfile(id_user);
            //Lấy like bài posts     
            this.getLikePosts(post.id_posts)
            //Lấy comment
            this.loadComments(post.id_posts);
          }
        }
      },
      error: (error) => {
        console.error('Get posts thất bị', error);
      }
    });
  }

  // Lấy thông tin người dùng tuong tác với 'id_user'
  getUserProfile(id_user: number) {
    try {
      this.userService.getUserById(id_user).subscribe(user => {
        // Gán thông tin người dùng vào map 'users' theo 'id_user'
        this.user = user;

      });
    } catch (error) {
      console.error(`Failed to get user with id ${id_user}`, error);
    }
  }

  //Lấy thông tin userprofile
  getUserById() {
    this.userService.getUserProfile().subscribe({
      next: (user) => this.userProfile = user,
      error: (error) => console.error('Get user profile thất bại', error)
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
        },
        error: (error) => {
          console.error('Add posts thất bị', error);
        }
      })
    }
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

  /* Like posts */
  likePost(id_posts: number) {
    const user = this.user;
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
    if (this.user?.id_user && id_posts && this.formComment.valid) {
      const content = this.formComment.value.content ?? '';
      const newComment = new CommentModel(
        null, // id_comment sẽ được tự động tạo bởi server
        this.user.id_user,
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

  updatePosts(id_user: number, id_posts: number): void {

    if (id_user !== this.userProfile?.id_user) {
      alert('Bạn không có quyền sửa bài viết');
      return
    }

    const content = this.formPosts.value as PostsModel;
    const updatePosts = new PostsModel(
      id_posts,
      content.id_user,
      content.content,
      null,
      new Date(),
      new Date()
    )

    if (id_posts && this.formPosts.valid) {
      this.postsService.updatePosts(id_posts, updatePosts).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (error) => {
          console.error('Update posts thểat bị', error);
        }
      })
    }
  }

  //Remove post
  removePosts(id_posts: number, id_user: number) {

    if (id_user !== this.userProfile?.id_user) {
      alert('Bạn không có quyền xóa bài viết');
      return
    }

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

  //Show list_action--post
  showAction(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const actionMenu = target.nextElementSibling as HTMLElement; // Giả sử .list_action--posts là phần tử tiếp theo ngay sau <i>

    // Toggle class 'active' để hiển thị hoặc ẩn menu
    actionMenu.classList.toggle('active');
  }

  //Open model
  openModel(id_posts: number): void {

    this.postsService.getPostsById(id_posts).subscribe({
      next: (posts) => {
        this.postsId = posts;
        this.formPosts.patchValue(this.postsId);
      },
      error: (error) => {
        console.error('Get posts thểat bị', error);
      }
    });

    // Hiển thị modal cập nhật bài viết
    const updatePostModal = document.querySelector('.update_posts--model') as HTMLElement;
    updatePostModal.classList.add('active');
    console.log(updatePostModal);

    // Hiển thị overlay
    const overlay = document.querySelector('.overlay') as HTMLElement;
    console.log(overlay);

    overlay.classList.add('active');
  }

  //Close model
  closeModel(): void {
    // Ẩn modal cập nhật bài viết
    const updatePostModal = document.querySelector('.update_posts--model') as HTMLElement;
    updatePostModal.classList.remove('active');

    // Ẩn overlay
    const overlay = document.querySelector('.overlay') as HTMLElement;
    overlay.classList.remove('active');
  }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.getUserProfile(id);
    this.getPostsByIdUser(id);
    this.getUserById();
  }
}

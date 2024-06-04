export class LikeModel {
    id_like: number;
    id_posts: number;
    id_comment: number;
    id_user: number;
    like_count: number;
    created_at: Date;
    constructor(id_like: number, id_posts: number, id_comment: number, id_user: number, like_count: number, created_at: Date) {
        this.id_like = id_like;
        this.id_posts = id_posts;
        this.id_comment = id_comment;
        this.id_user = id_user;
        this.like_count = like_count;
        this.created_at = created_at;
    }
}
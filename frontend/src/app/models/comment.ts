export class CommentModel {
    id_comment: number | null;
    id_user: number;
    id_posts: number;
    content: string;
    created_at: Date;
    updated_at: Date;
    constructor(id_comment: number | null, id_user: number, id_posts: number, content: string, created_at: Date, updated_at: Date) {
        this.id_comment = id_comment;
        this.id_user = id_user;
        this.id_posts = id_posts;
        this.content = content;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
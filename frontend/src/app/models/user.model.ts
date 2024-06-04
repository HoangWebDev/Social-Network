export class UserModel {
    id_user: number | null;
    username: string;
    password_hash: string;
    email: string | null;
    full_name: string | null;
    birthday: Date | null;
    gender: number | null;
    picture_url: string | null;
    created_at: Date;
    updated_at: Date;
    role: number | null;

    constructor(
        id_user: number | null,
        username: string,
        password_hash: string,
        email: string | null,
        full_name: string | null,
        birthday: Date | null,
        gender: number | null,
        picture_url: string | null,
        created_at: Date,
        updated_at: Date,
        role: number | null
    ) {
        this.id_user = id_user;
        this.username = username;
        this.password_hash = password_hash;
        this.email = email;
        this.full_name = full_name;
        this.birthday = birthday;
        this.gender = gender;
        this.picture_url = picture_url;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.role = role;
    }
}
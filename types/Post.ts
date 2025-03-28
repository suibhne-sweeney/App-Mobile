export interface Post{
    _id: string,
    userId: string,
    firstName: string,
    lastName: string,
    location: string,
    description: string,
    picturePath: string,
    userPicturePath: string,
    likes: Record<string, boolean>,
    comments: [],
    createdAt: Date,
    updateAt: Date
}
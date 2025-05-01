export interface User{
    id: {
        timeStamp: Number,
        creationTime: Date
    },
    idString: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    picturePath: string,
    friends: string[],
    location: string,
    occupation: string,
    viewedProfile: Number,
    impressions: Number,
    createdAt: Date,
    updatedAt: Date,
}
import { ScrollView, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/types/RootState";
import { setPosts } from "~/store";
import Toast from "react-native-toast-message";
import { useEffect } from "react";
import PostWidget from "./PostWidget";
import { Text } from "~/components/ui/text";

interface PostsProps {
  userId: string,
  isProfile: boolean
}

export default function PostsWidget({ userId, isProfile } : PostsProps) {
  const posts = useSelector((state: RootState) => state.auth.posts);
  const dispatch = useDispatch();
  const PUBLIC_API_URI = process.env.EXPO_PUBLIC_API_URI;
  const token = useSelector((state: RootState) => state.auth.token);

  const getPosts = async () => {
    const response = await fetch(`${PUBLIC_API_URI}/api/posts/feed`, {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`},
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data}));
}

const getUserPosts = async () => {
    const response = await fetch(`${PUBLIC_API_URI}api/posts/${userId}`, {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`},
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
}

  useEffect(() => {
    if(isProfile){
      getUserPosts();
    }else{
      getPosts();
    }
  }, [userId])

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 200 }} showsVerticalScrollIndicator={false}>
      <View>
        {posts.map(
          ({
            id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments
          }) => (
            <PostWidget key={id} postId={id} postUserId={userId} name={`${firstName} ${lastName}`} description={description} location={location} picturePath={picturePath} userPicturePath={userPicturePath} likes={likes} comments={comments}/>
          )
        )}
      </View>
    </ScrollView>
  )
}
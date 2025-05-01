import { ScrollView, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/types/RootState";
import response from '~/data/test.posts.json'
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

  const getPosts = async () => {
    try {
      const data = await response
      if(data){
        dispatch(setPosts({posts: data}))
      } 
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Posts not found",
      });
    }
  }

  const getUserPosts = async () => {
    try {
      const data = await response.filter((post) => post.userId === userId);
      if(data){
        dispatch(setPosts({posts: data}))
      } 
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Posts not found",
      });
    }
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
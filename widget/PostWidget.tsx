import { useState } from "react";
import { Image, useColorScheme, View } from "react-native";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";
import { P } from "~/components/ui/typography";
import { Ellipsis } from "~/lib/icons/Ellipsis";
import { Heart } from "~/lib/icons/Heart";
import { MessageCircle } from "~/lib/icons/MessageCircle";
import { Share2 } from "~/lib/icons/Share2";
import { RootState } from "~/types/RootState";
import * as Animatable from 'react-native-animatable';
import { useTranslation } from "react-i18next";

interface PostProps {
  postId: string,
  postUserId: string, 
  name: string,
  description: string, 
  location: string,
  picturePath: string, 
  userPicturePath: string, 
  likes: Record<string, boolean>, 
  comments: [], 
}

export default function PostWidget({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes, 
  comments
} : PostProps){
  const { t } = useTranslation();
  const PUBLIC_API_URI = process.env.EXPO_PUBLIC_API_URI;
  const [isComments, setIsComments] = useState(false);
  const loggedInUserId = useSelector((state: RootState) => state.auth.user?.idString)
  const isLiked = Boolean(likes[loggedInUserId!]);
  const colorScheme = useColorScheme();

  return (
    <View>
      <View className="flex-row justify-between">
        <View className="flex-row">
          <Avatar className="w-10 h-10" alt="Profile Avatar">
            <AvatarImage source={{ uri: `${PUBLIC_API_URI}/Public/${userPicturePath}` }} />
            <AvatarFallback>
              <Text>{name[0]}</Text>
            </AvatarFallback>
          </Avatar>
          <View style={{marginLeft: 16}}>
            <Text>{name}</Text>
            <P className="text-wrap">{description}</P>
          </View>
        </View>
        {loggedInUserId === postUserId && (
          <Button size="icon" variant="ghost">
            <Text>
              <Ellipsis className="text-foreground" />
            </Text>
          </Button>
        )}
      </View>
      <View style={{marginTop: 20, marginBottom: 10}}>
        {picturePath && (
          <Image
            source={{ uri: `${PUBLIC_API_URI}/Public/${picturePath}` }}
            style={{
              width: 280,
              height: 280,
              borderRadius: 12,
              resizeMode: "cover",
              alignSelf: "flex-end",
              marginHorizontal: 30
            }}
          />
        )}
      </View>
      <View className="flex-row justify-center items-center">
        <Button className="w-6 h-6 flex-row items-center" style={{marginHorizontal: 8}} variant={"ghost"} size={"icon"}>
          <Text style={{marginHorizontal: 2}}>
            <Heart stroke={colorScheme === "dark" ? "white" : "black"} fill={isLiked ? "currentColor" : "none"}/>
          </Text>
          <Text>{Object.keys(likes).length}</Text>
        </Button>
        <Button className="w-6 h-6 flex-row items-center" style={{marginHorizontal: 8}} variant={"ghost"}  size={"icon"} onPress={() => setIsComments(!isComments)}>
          <Text style={{marginHorizontal: 2}}><MessageCircle className="text-foreground" /></Text>
          <Text>{comments.length}</Text>
        </Button>
        <Button className="w-6 h-6 flex-row items-center" style={{marginHorizontal: 8}} variant={"ghost"}  size={"icon"}>
          <Text><Share2 className="text-foreground" /></Text>
        </Button>
      </View>
      {isComments && (
        <Animatable.View
          animation="fadeInDown"
          duration={100}
          easing="ease-out"
          className="mt-2"
          style={{zIndex: 0}} 
        >
          <Text style={{marginLeft: 5}}>{t('posts.comments')}</Text>
          <Separator className="mb-1" />
          {comments.map((comment, i) => (
            <View key={i} style={{marginLeft: 15, maxWidth: 300, width: "auto", alignSelf: "flex-start"}} className="rounded-md bg-muted my-2 px-4 py-2">
              <Text className="text-wrap text-sm">{comment}</Text>
            </View>
          ))}
        </Animatable.View>
      )}
      <Separator className="my-6" />
    </View>
  )
}
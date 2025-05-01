import { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Separator } from "~/components/ui/separator";
import { RootState } from "~/types/RootState";
import { User } from "~/types/User";
import Toast from "react-native-toast-message";
import { H3, P } from "~/components/ui/typography";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Text } from '~/components/ui/text';
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { setLogout } from "~/store";
import { router } from "expo-router";

interface UserProps {
  userId: string;
  picturePath: string;
}

export default function UserWidget({ userId, picturePath }: UserProps) {
  const [user, setUser] = useState<User>();
  const token = useSelector((state: RootState) => state.auth.token);
  const PUBLIC_API_URI = process.env.EXPO_PUBLIC_API_URI;
  const fullName = `${user?.firstName} ${user?.lastName}`;
  const loggedInUserId = useSelector((state: RootState) => state.auth.user?.idString)
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(setLogout());
    router.replace("/");
  }

  const getUser = async () => {
    try {
      const response = await fetch(`${PUBLIC_API_URI}/api/users/getUser${userId}`, {
        method: "GET", 
        headers: {Authorization: `Bearer ${token}`}
      }); 
      const data = await response.json()
      if(data){
        setUser(data);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "User not found",
      });
    }
  };

  useEffect(() => {
    getUser();
  }, [userId, token]);

  return (
    <View>
      <View className="flex flex-row justify-between py-1 mb-1">
        <View>
          <H3 className="font-semibold">{fullName}</H3>
          <Text className="text-sm">{user?.location}</Text>
          <Text className="text-sm text-muted-foreground my-2">
            { user?.friends.length! > 1 
              ? (user?.friends.length + " friends") 
              : (user?.friends.length + " friend") }
          </Text>
        </View>
        {loggedInUserId === userId ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar alt="Profile Avatar">
                <AvatarImage source={{ uri: `${PUBLIC_API_URI}/Public/${picturePath}` }} />
                <AvatarFallback>
                  <Text>{user?.firstName[0]} {user?.lastName[0]}</Text>
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-64 native:w-72'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onPress={() => logout()}>
                <Text>Logout</Text>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Avatar alt="Profile Avatar">
            <AvatarImage source={{ uri: `${PUBLIC_API_URI}/Public/${picturePath}` }} />
            <AvatarFallback>
              <Text>{user?.firstName[0]} {user?.lastName[0]}</Text>
            </AvatarFallback>
          </Avatar>
        )}
      </View>
      <View className="flex flex-row justify-between items-center py-2">
        {loggedInUserId === userId ? (
          <Button className="w-[48%]" variant={"secondary"}>
            <Text>Edit profile</Text>
          </Button>
        ) : (
          <Button className="w-[48%]" variant={"secondary"}>
            <Text>Friend</Text>
          </Button>
        )}
        <Button className="w-[48%]" variant={"secondary"}>
          <Text>Share profile</Text>
        </Button>
      </View>
      <Separator className="my-6" />  
    </View>
  );
}

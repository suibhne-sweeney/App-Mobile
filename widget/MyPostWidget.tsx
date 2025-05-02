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
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

interface UserProps {
  userId: string;
  picturePath: string;
}


const MyPostWidget = () => {
    const [user, setUser] = useState<User>();
    const token = useSelector((state: RootState) => state.auth.token);
    const PUBLIC_API_URI = process.env.EXPO_PUBLIC_API_URI;
    const fullName = `${user?.firstName} ${user?.lastName}`;
    const loggedInUserId = useSelector((state: RootState) => state.auth.user?.idString)
    const dispatch = useDispatch();

    const getUser = async () => {
      try {
        const response = await fetch(`${PUBLIC_API_URI}/api/users/getUser/${loggedInUserId}`, {
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
    }, [loggedInUserId, token]);

    return (
        <View className="flex flex-row py-1 mb-1">
            <Avatar className="w-10 h-10" alt="Profile Avatar">
                <AvatarImage source={{ uri: `${PUBLIC_API_URI}/Public/${user?.picturePath}` }} />
                <AvatarFallback>
                    <Text>{user?.firstName}</Text>
                </AvatarFallback>
            </Avatar>
            <View className="mx-4">
                <Text>{fullName}</Text>
                <Textarea placeholder='Write some stuff...' aria-labelledby='textareaLabel'/>
            </View>
        </View>
    );
};

export default MyPostWidget;
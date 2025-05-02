import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useEffect, useState } from 'react';
import { User } from '~/types/User';
import { useSelector } from 'react-redux';
import { RootState } from '~/types/RootState';
import PostsWidget from '~/widget/PostsWidget';
import { Text } from '~/components/ui/text';
import MyPostWidget from '~/widget/MyPostWidget';

export default function Home () {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const token = useSelector((state: RootState) => state.auth.token);
  const PUBLIC_API_URI = process.env.EXPO_PUBLIC_API_URI;

  const getUser = async () => {
    try {
      const response = await fetch(`${PUBLIC_API_URI}/api/users/getUser/${id}`, {
        method: "GET", 
        headers: {Authorization: `Bearer ${token}`}
      }); 
      const data = await response.json()
      if(data){
        setUser(data);
        setLoading(false)
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'User not found',
      });
    }
  }

  useEffect(() => {
    getUser();
  }, [id]);

  if(loading){ return <Text>loading</Text> }

  return (
    <View className='w-full py-2 px-4'>
      <MyPostWidget />
      <PostsWidget isProfile={true} userId={`${user?.idString!}`}/>
    </View>
  );
}

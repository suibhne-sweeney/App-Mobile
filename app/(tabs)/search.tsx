import { Link } from 'expo-router';

import React, { useState, useEffect } from 'react';
import { View, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { Text } from '~/components/ui/text';
import { Input } from '~/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar';
import { Search as SearchIcon } from '~/lib/icons/Search';
import { RootState } from '~/types/RootState';
import { User } from '~/types/User';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state: RootState) => state.auth.token);
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const PUBLIC_API_URI = process.env.EXPO_PUBLIC_API_URI;
  const router = useRouter();

  // Fetch all users on component mount
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Filter users when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(allUsers);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = allUsers.filter(user => 
        user.firstName?.toLowerCase().includes(query) || 
        user.lastName?.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, allUsers]);

  const fetchAllUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${PUBLIC_API_URI}/api/users/all`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      
      // Filter out the current user from the results
      const otherUsers = data.filter((user: User) => user.idString !== currentUser?.idString);
      
      setAllUsers(otherUsers);
      setFilteredUsers(otherUsers);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error fetching users',
        text2: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToProfile = (userId: string) => {
    router.push(`/profile/${userId}`);
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <Pressable 
      onPress={() => navigateToProfile(item.idString)}
      className="flex-row items-center p-4 border-b border-gray-200"
    >
      <Avatar className="h-12 w-12 mr-4">
        <AvatarImage 
          source={{ uri: item.picturePath ? `${PUBLIC_API_URI}/Public/${item.picturePath}` : undefined }} 
        />
        <AvatarFallback>
          <Text className="text-sm">{item.firstName?.[0]}{item.lastName?.[0]}</Text>
        </AvatarFallback>
      </Avatar>
      <View className="flex-1">
        <Text className="font-semibold">{item.firstName} {item.lastName}</Text>
        <Text className="text-sm text-gray-500">{item.location || 'No location'}</Text>
      </View>
    </Pressable>
  );

  const renderEmptyList = () => (
    <View className="flex-1 justify-center items-center p-4">
      <SearchIcon size={48} className="text-gray-400 mb-4" />
      <Text className="text-gray-500 text-center">
        {searchQuery.trim() ? `No users found matching "${searchQuery}"` : 'No users available'}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-background p-4">
      <View className="flex-row items-center mb-4 bg-muted rounded-md p-2">
        <SearchIcon size={20} className="text-muted-foreground mr-2" />
        <Input
          className="flex-1 bg-transparent border-0 p-0"
          placeholder="Search for users..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text className="mt-2 text-center text-gray-500">Loading users...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.idString}
          renderItem={renderUserItem}
          ListEmptyComponent={renderEmptyList}
          contentContainerStyle={{ 
            flexGrow: 1, 
            paddingBottom: 20,
            ...(filteredUsers.length === 0 && { justifyContent: 'center' })
          }}
        />
      )}
    </View>
  );
}
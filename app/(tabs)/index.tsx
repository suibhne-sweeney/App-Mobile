import { Link } from 'expo-router';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Text } from '~/components/ui/text';
import { RootState } from '~/types/RootState';

export default function Home() {
  const user = useSelector((state: RootState) => state.auth.user );

  const fullName = `${user?.firstName} ${user?.lastName} ${user?.idString}`
    return (
      <View>
        <Text>
            {fullName}
        </Text>
        <Link href='/login'>
          <Text>Go to Login</Text>
        </Link>
      </View>
    )
}
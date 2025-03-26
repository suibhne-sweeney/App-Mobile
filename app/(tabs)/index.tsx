import { Link } from 'expo-router';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';

export default function Home() {
    return (
      <View>
        <Text>
            Hello world
        </Text>
        <Link href='/login'>
          <Text>Go to Login</Text>
        </Link>
      </View>
    )
}
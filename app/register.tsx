import { Link } from 'expo-router';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';

export default function Register() {
    return (
      <View>
        <Text>
            Sign-Up
        </Text>
        <Link href='/login'>
          <Text>Go to Login</Text>
        </Link>
      </View>
    )
}
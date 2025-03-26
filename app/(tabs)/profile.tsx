import { Link } from 'expo-router';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';

export default function Profile () {
    return (
      <View>
        <Text>
            This is the profile.
        </Text>
        <Link href='/login'>
          <Text>Go to Login</Text>
        </Link>
      </View>
    )
}
import { Link } from 'expo-router';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';

export default function Search () {
    return (
      <View>
        <Text>
            This is the Search page.
        </Text>
        <Link href='/login'>
          <Text>Go to Login</Text>
        </Link>
      </View>
    )
}
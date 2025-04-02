import { Link } from 'expo-router';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import Toast from 'react-native-toast-message';

export default function Profile () {
    return (
      <View>
        <Button onPress={() =>
          Toast.show({
            type: 'error',
            text1: 'Error!',
            text2: 'An error occurred while saving your item.',
          })
        }>
          <Text>Error</Text>
        </Button>
        <Link href='/login'>
          <Text>Go to Login</Text>
        </Link>
      </View>
    )
}
import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { useTranslation } from 'react-i18next';

export default function NotFoundScreen() {
  const { t } = useTranslation();
  return (
    <>
      <Stack.Screen options={{ title: t('notFound.title') }} />
      <View>
        <Text>{t('notFound.message')}</Text>

        <Link href='/(tabs)'>
          <Text>{t('notFound.goBack')}</Text>
        </Link>
      </View>
    </>
  );
}

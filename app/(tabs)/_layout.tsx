import '~/global.css';

import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { Tabs, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, View, Text } from 'react-native';

import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { Home, User, Search } from 'lucide-react-native';
import { ThemeToggle } from '~/components/ThemeToggle';
import { useSelector } from 'react-redux';
import { RootState } from '~/types/RootState';
import { LanguageSelector } from '~/components/LanguageSelector';
import { useTranslation } from 'react-i18next';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { t } = useTranslation();
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const id = useSelector((state: RootState) => state.auth.user?.idString);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background');
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <Tabs>
        <Tabs.Screen 
          name='index'
          options={{
            title: t('navigation.home'),
            headerRight: () => (
              <View className="flex-row items-center space-x-2 mr-2">
                <ThemeToggle /> 
                <LanguageSelector/>
              </View>
            ),
            tabBarLabel: t('navigation.home'),
            tabBarIcon: (tabInfo) => (
              <Home color={tabInfo.color} size={tabInfo.focused ? 22 : 20} />
            ),
          }}
        />
        <Tabs.Screen 
          name="search"
          options={{
            title: t('navigation.search'),
            headerRight: () => (
              <View className="flex-row items-center space-x-2 mr-2">
                <ThemeToggle /> 
                <LanguageSelector/>
              </View>
            ),
            tabBarLabel: t('navigation.search'),
            tabBarIcon: (tabInfo) => (
              <Search color={tabInfo.color} size={tabInfo.focused ? 22 : 20} />
            ),
          }}
        />
        <Tabs.Screen 
          name="profile/[id]"
          initialParams={{ id: id }}
          options={{
            title: t('navigation.profile'),
            headerRight: () => (
              <View className="flex-row items-center space-x-2 mr-2">
                <ThemeToggle /> 
                <LanguageSelector/>
              </View>
            ),
            tabBarLabel: t('navigation.profile'),
            tabBarIcon: (tabInfo) => (
              <User color={tabInfo.color} size={tabInfo.focused ? 22 : 20} />
            ),
          }}
        />
      </Tabs>
      
      <PortalHost />
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

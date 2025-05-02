import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '~/components/ui/text';
import { useTranslation } from 'react-i18next';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

export function LanguageSelector() {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <View className="flex-row space-x-2">
      <Button 
        variant={i18n.language === 'en' ? 'default' : 'outline'}
        size="sm"
        onPress={() => changeLanguage('en')} 
      >
        <Text className={cn(
          i18n.language === 'en' ? 'text-primary-foreground' : 'text-foreground'
        )}>EN</Text>
      </Button>
      <Button 
        variant={i18n.language === 'pl' ? 'default' : 'outline'} 
        size="sm"
        onPress={() => changeLanguage('pl')}
      >
        <Text className={cn(
          i18n.language === 'pl' ? 'text-primary-foreground' : 'text-foreground'
        )}>PL</Text>
      </Button>
    </View>
  );
}
import { Controller, useForm } from "react-hook-form";
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { View } from "react-native";
import { H1, H3 } from "~/components/ui/typography";
import { setLogin } from '~/store';
import { useDispatch } from 'react-redux';
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const dispatch = useDispatch();
  const router = useRouter();
  const PUBLIC_API_URI = process.env.EXPO_PUBLIC_API_URI;

  const onSubmit = async (data: FormData) => {
    try {
      const loggedInResponse = await fetch(`${PUBLIC_API_URI}/api/auth/login`, {
        method: "POST", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify(data)
      });       
      const loggedIn = await loggedInResponse.json();
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        router.push("/")
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('error.unknown'),
        text2: `${error}`,
      })
    }
  };

  return (
    <View className="mx-4 my-24 p-1">
       <View className="items-center mb-4">
        <H1 className="my-2">{t('app.name')}</H1>
        <H3 className="my-2 font-bold">{t('login.welcome')}</H3>
        <Text className="mt-2 text-base text-muted-foreground">
          {t('login.prompt')}
        </Text>
      </View>
        <View className="w-full max-w-md p-6">
          {/* Email Field */}
          <Controller
            control={control}
            name="email"
            rules={{
              required: t('validation.emailRequired'),
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: t('validation.invalidEmail'),
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mb-4">
                <Label className="mb-1 text-base font-semibold">{t('login.email')}</Label>
                <Input
                  className="w-full border rounded-md p-2"
                  placeholder={t('login.emailPlaceholder')}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                />
                {errors.email && (
                  <Text className="text-red-600 mt-1">{errors.email.message}</Text>
                )}
              </View>
            )}
          />

          {/* Password Field */}
          <Controller
            control={control}
            name="password"
            rules={{ 
              required: t('validation.passwordRequired'), 
              minLength: { value: 4, message: t('validation.passwordTooShort')}
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mb-4">
                <Label className="mb-1 text-base font-semibold">{t('login.password')}</Label>
                <Input
                  className="w-full border rounded-md p-2"
                  placeholder={t('login.passwordPlaceholder')}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
                {errors.password && (
                  <Text className="text-red-600 mt-1">{errors.password.message}</Text>
                )}
              </View>
            )}
          />

          {/* Submit Button */}
          <Button className="mt-2" onPress={handleSubmit(onSubmit)}>
            <Text>{t('login.submit')}</Text>
          </Button>
        </View>
      <View className="items-center">
        <Text className="text-sm text-muted-foreground">
          {t('login.noAccount')}{' '}
          <Text onPress={() => router.push("/register")}>
            {t('login.signUp')}
          </Text>
        </Text>
      </View>
    </View>
  );
}
import { Controller, useForm } from "react-hook-form";
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { View, Platform, KeyboardAvoidingView } from "react-native";
import { H1, H3, P } from "~/components/ui/typography";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { User } from "~/types/User";
import { useState } from "react";
import { ChevronLeft } from '~/lib/icons/ChevronLeft';
import { ImageUp } from '~/lib/icons/ImageUp';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';

interface FormData extends User {
  file?: ImagePicker.ImagePickerAsset;
}

export default function Register() {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const PUBLIC_API_URI = process.env.EXPO_PUBLIC_API_URI;
  const [step, setStep] = useState(0);
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 10 : 0


  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      for(const value in data){
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if(value !== "file") formData.append(value, data[value]);
      }

      if (data.file) {
        const assets = data.file;
        const file = {
          uri: assets.uri,
          name: assets.fileName,
          type: assets.type,
        };
  
        formData.append('file', file as any);
      }

      const registeredResponse = await fetch(`${PUBLIC_API_URI}/api/auth/register`, {
        method: "POST",
        body: formData,
        headers: {'Content-Type': 'multipart/form-data'}
      })

      if(registeredResponse){
        Toast.show({
          type: "success",
          text1: t('register.success'),
          text2: t('register.welcomeUser', {name: data.firstName})
        })
        router.push("/login")
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
    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
      <View className={`mx-4 ${
          (step === 0 && "my-32") || 
          (step === 1 && "my-24") || 
          (step === 2 && "my-6")
        } p-1`}>
        <View className="items-center mb-4">
          <H1 className="my-2">{t('app.name')}</H1>
          <H3 className="my-2 font-bold">{t('register.welcome')}</H3>
          <Text className="mt-2 text-base text-muted-foreground">
            {t('register.prompt')}
          </Text>
        </View>
        <View className="w-full max-w-md p-6">
          {/* Email Field */}
          {step === 0 && (
            <>
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
                    <Label className="mb-1 text-base font-semibold">{t('register.email')}</Label>
                    <Input
                      className="w-full border rounded-md p-2"
                      placeholder={t('register.emailPlaceholder')}
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
              <Button className="mt-2" onPress={async () => { 
                const isValid = await trigger("email");
                if (isValid) setStep(1);
              }}>
                <Text>{t('register.next')}</Text>
              </Button>
            </>
          )}

          {/* Password Field */}
          {step === 1 && (
            <>
              <View className="flex flex-row items-center">
                <Button variant={"ghost"} size={"icon"} onPress={() => setStep(0)}>
                  <ChevronLeft className='text-foreground' />
                </Button>
                <P className="px-3">{t('register.step2')}</P>
              </View>
              <Controller
                control={control}
                name="password"
                rules={{ 
                  required: "Password is required", 
                  minLength: { value: 4, message: 'Password too short'}
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View className="mb-4 mt-2">
                    <Label className="mb-1 text-base font-semibold">Password</Label>
                    <Input
                      className="w-full border rounded-md p-2"
                      placeholder="Enter your password"
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
              <Button className="mt-2" onPress={async () => { 
                const isValid = await trigger("password");
                if (isValid) setStep(2);
              }}>
                <Text>{t('register.next')}</Text>
              </Button>
            </>
          )}

          {/*The Rest of the Form Feilds*/}
          {step === 2 && (
            <>
            <View className="flex flex-row items-center">
                <Button variant={"ghost"} size={"icon"} onPress={() => setStep(1)}>
                  <ChevronLeft className='text-foreground' />
                </Button>
                <P className="px-3">{t('register.step3')}</P>
              </View>
              <View className="flex flex-row justify-between items-center">
                <Controller
                  control={control}
                  name="firstName"
                  rules={{ 
                    required: t('validation.firstNameRequired'), 
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className="mb-4 mt-2 w-[48%]">
                      <Label className="mb-1 text-base font-semibold">{t('register.firstName')}</Label>
                      <Input
                        className="w-full border rounded-md p-2"
                        placeholder={t('register.firstNamePlaceholder')}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      {errors.firstName && (
                        <Text className="text-red-600 mt-1">{errors.firstName.message}</Text>
                      )}
                    </View>
                  )}
                />
                <Controller
                  control={control}
                  name="lastName"
                  rules={{ 
                    required: t('validation.lastNameRequired'), 
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className="mb-4 mt-2 w-[48%]">
                      <Label className="mb-1 text-base font-semibold">{t('register.lastName')}</Label>
                      <Input
                        className="w-full border rounded-md p-2"
                        placeholder={t('register.lastNamePlaceholder')}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      {errors.lastName && (
                        <Text className="text-red-600 mt-1">{errors.lastName.message}</Text>
                      )}
                    </View>
                  )}
                />
              </View>
              <Controller
                control={control}
                name="file"
                rules={{ 
                  required: t('validation.imageRequired'), 
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View className="mb-4 mt-2 w-full">
                    <Label className="mb-1 text-base font-semibold">{t('register.profilePicture')}</Label>
                    <Button
                      variant={"outline"}
                      onBlur={onBlur} 
                      onPress={async () => {
                        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                        if(status === "granted"){
                          const result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ['images'],
                            allowsEditing: true,
                            aspect: [4, 3],
                            quality: 1,
                          });
                          value = result.assets?.at(0)!
                          if(value){
                            onChange(value);
                            setValue("picturePath", value.fileName!)
                          }
                        }else{
                          Toast.show({
                            type: 'error',
                            text1: t('permissions.denied'),
                            text2: t('permissions.mediaLibraryNeeded'),
                          })
                        }
                      }}
                    >
                      {value ? (
                        <Text>
                          Name: {value.fileName}
                        </Text>
                      ) : <ImageUp className='text-foreground'/> }
                    </Button>
                    {errors.file && (
                      <Text className="text-red-600 mt-1">{errors.file.message}</Text>
                    )}
                  </View>
                )}
              />
              <View className="flex flex-row justify-between items-center">
                <Controller
                  control={control}
                  name="location"
                  rules={{ 
                    required: t('validation.locationRequired'), 
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className="mb-4 mt-2 w-[48%]">
                      <Label className="mb-1 text-base font-semibold">{t('register.location')}</Label>
                      <Input
                        className="w-full border rounded-md p-2"
                        placeholder={t('register.locationPlaceholder')}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      {errors.location && (
                        <Text className="text-red-600 mt-1">{errors.location.message}</Text>
                      )}
                    </View>
                  )}
                />
                <Controller
                  control={control}
                  name="occupation"
                  rules={{ 
                    required: t('validation.occupationRequired'), 
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className="mb-4 mt-2 w-[48%]">
                      <Label className="mb-1 text-base font-semibold">{t('register.occupation')}</Label>
                      <Input
                        className="w-full border rounded-md p-2"
                        placeholder={t('register.occupationPlaceholder')}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      {errors.occupation && (
                        <Text className="text-red-600 mt-1">{errors.occupation.message}</Text>
                      )}
                    </View>
                  )}
                />
              </View>

              <Button className="mt-2" onPress={handleSubmit(onSubmit)}>
                <Text>{t('register.submit')}</Text>
              </Button>
            </>
          )}

          {/* Submit Button */}

          <View className="items-center mb-4">
            <Text className="mt-2 text-base text-muted-foreground">
              {t('register.welcomeMessage')}
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
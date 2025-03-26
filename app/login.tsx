import { Controller, useForm } from "react-hook-form";
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { View } from "react-native";
import { H1, H3 } from "~/components/ui/typography";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const loggedInResponse = await fetch("http://localhost:5185/api/auth/login", {
        method: "POST", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify(data)
      });       
      const loggedIn = await loggedInResponse.json();
      console.log(loggedIn);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <View className="mx-4 my-24 p-1">
       <View className="items-center mb-4">
        <H1 className="my-2">Sociopathy </H1>
        <H3 className="my-2 font-bold">Welcome Back!</H3>
        <Text className="mt-2 text-base text-muted-foreground">
          Please login to your account
        </Text>
      </View>
        <View className="w-full max-w-md p-6">
          {/* Email Field */}
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mb-4">
                <Label className="mb-1 text-base font-semibold">Email</Label>
                <Input
                  className="w-full border rounded-md p-2"
                  placeholder="Enter your email"
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
              required: "Password is required", 
              minLength: { value: 4, message: 'Password too short'}
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="mb-4">
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

          {/* Submit Button */}
          <Button className="mt-2" onPress={handleSubmit(onSubmit)}>
            <Text>Submit</Text>
          </Button>
        </View>
      <View className="items-center">
        <Text className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Text>
            Sign-up
          </Text>
        </Text>
      </View>
    </View>
  );
}
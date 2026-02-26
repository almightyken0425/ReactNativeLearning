import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'React Native 百科全書',
          headerStyle: { backgroundColor: '#F9F8F4' },
          headerTintColor: '#8B7355',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      />
    </Stack>
  );
}

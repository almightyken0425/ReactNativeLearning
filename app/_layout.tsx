import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { ThemeContext, ThemeType } from './state_management/context/theme_context';

export default function RootLayout() {
  // ==========================================
  // 🌍 最頂層的資料主機 (真正的狀態存放地)
  // ==========================================
  const [theme, setTheme] = useState<ThemeType>('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#F9F8F4' },
          headerTintColor: '#8B7355',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: 'React Native 百科全書' }}
        />
        <Stack.Screen name="routing_and_deep_link/main" options={{ title: '📥 路由與深層連結' }} />
        <Stack.Screen name="routing_and_deep_link/demo_expo_router" options={{ title: '🚗 基礎堆疊導航' }} />
        <Stack.Screen name="routing_and_deep_link/demo_page" options={{ title: '🎯 參數接收頁面' }} />
        <Stack.Screen name="routing_and_deep_link/(demo_tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="routing_and_deep_link/demo_header_buttons" options={{ title: '🕹️ 標題操作按鈕' }} />
        <Stack.Screen name="state_management/main" options={{ title: 'Hooks 狀態與副作用百科' }} />
        <Stack.Screen name="state_management/demo_use_state" options={{ title: 'useState 雙向綁定' }} />
        <Stack.Screen name="state_management/demo_use_effect" options={{ title: 'useEffect 表單驗證' }} />
        <Stack.Screen name="state_management/demo_use_context" options={{ title: '⚙️ 全域設定' }} />
        <Stack.Screen name="state_management/demo_use_reducer" options={{ title: '複雜狀態機' }} />
        <Stack.Screen name="state_management/demo_use_custom_hook" options={{ title: '自訂鉤子' }} />
      </Stack>
    </ThemeContext.Provider>
  );
}

import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { ThemeContext, ThemeType } from './stateManagement/context/ThemeContext';

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
        <Stack.Screen name="routingAndDeepLink/main" options={{ title: '📥 路由與深層連結' }} />
        <Stack.Screen name="routingAndDeepLink/demoPage" options={{ title: '🎯 參數接收頁面' }} />
        <Stack.Screen name="stateManagement/main" options={{ title: 'Hooks 狀態與副作用百科' }} />
        <Stack.Screen name="stateManagement/demoUseState" options={{ title: 'useState 雙向綁定' }} />
        <Stack.Screen name="stateManagement/demoUseEffect" options={{ title: 'useEffect 表單驗證' }} />
        <Stack.Screen name="stateManagement/demoUseContext" options={{ title: '⚙️ 全域設定' }} />
        <Stack.Screen name="stateManagement/demoUseReducer" options={{ title: '複雜狀態機' }} />
        <Stack.Screen name="stateManagement/demoUseCustomHook" options={{ title: '自訂鉤子' }} />
      </Stack>
    </ThemeContext.Provider>
  );
}

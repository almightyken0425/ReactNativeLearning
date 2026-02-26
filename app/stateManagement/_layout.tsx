import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { ThemeContext, ThemeType } from './context/ThemeContext';

export default function AdvancedStateManagementLayout() {
    // ==========================================
    // 🌍 最頂層的資料主機 (真正的狀態存放地)
    // ==========================================
    // 整個 stateManagement 資料夾底下所有的畫面，都會以這裡為頂點
    // 只要這裡的 theme 改變，所有用 useContext 收到廣播的子畫面，都會在同一個瞬間重新渲染
    const [theme, setTheme] = useState<ThemeType>('light');

    return (
        // 把 [theme值] 和 [修改theme的函式] 一併放進廣播台的 value 裡面
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {/* 所有的子畫面 (main.tsx, settings.tsx) 都被包在這個廣播台裡面 */}
            <Stack>
                <Stack.Screen name="main" options={{ title: 'Hooks 狀態與副作用百科' }} />
                <Stack.Screen name="demoUseState" options={{ title: 'useState 雙向綁定' }} />
                <Stack.Screen name="demoUseEffect" options={{ title: 'useEffect 表單驗證' }} />
                <Stack.Screen name="demoUseContext" options={{ title: '⚙️ 全域設定' }} />
                <Stack.Screen name="demoUseReducer" options={{ title: '複雜狀態機' }} />
                <Stack.Screen name="demoUseCustomHook" options={{ title: '自訂鉤子' }} />
            </Stack>
        </ThemeContext.Provider>
    );
}

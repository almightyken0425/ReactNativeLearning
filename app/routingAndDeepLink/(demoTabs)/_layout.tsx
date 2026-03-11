import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#8B7355',
            tabBarInactiveTintColor: 'gray',
            headerStyle: { backgroundColor: '#F9F8F4' },
            headerTintColor: '#8B7355',
            headerTitleStyle: { fontWeight: 'bold' }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: '百科首頁',
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: '偏好設定',
                    tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}

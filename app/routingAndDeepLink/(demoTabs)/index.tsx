import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TabHomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>🏠 這裡是首頁標籤</Text>
            <Text style={styles.description}>
                底部標籤導航 (Bottom Tabs) 允許使用者在平行的主要功能之間快速切換。
                通常用於 App 的主要模組，例如首頁、搜尋、個人檔案等。
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F8F4',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 15
    },
    description: {
        fontSize: 16,
        color: '#7F8C8D',
        textAlign: 'center',
        lineHeight: 24
    }
});

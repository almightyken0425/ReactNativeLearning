import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TabSettingsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>⚙️ 這裡是設定標籤</Text>
            <Text style={styles.description}>
                點擊下方其他標籤即可切換畫面。
                注意標籤列 (Tab Bar) 會一直保持在畫面底部，不會隨著畫面切換而消失。
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

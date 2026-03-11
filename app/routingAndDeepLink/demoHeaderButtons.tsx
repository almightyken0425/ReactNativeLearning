import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DemoHeaderButtonsScreen() {
    const [count, setCount] = useState(0);

    // 模擬一個儲存或更新的行為
    const handleSave = () => {
        Alert.alert('進度已儲存', `目前的計數為: ${count}`);
    };

    return (
        <View style={styles.container}>
            {/* 動態設定標題列與按鈕 */}
            <Stack.Screen
                options={{
                    headerRight: () => (
                        <TouchableOpacity onPress={handleSave} style={styles.headerBtn}>
                            <Text style={styles.headerBtnText}>儲存</Text>
                        </TouchableOpacity>
                    )
                }}
            />

            <Text style={styles.title}>🕹️ 標題區塊操作按鈕</Text>
            <Text style={styles.description}>
                透過 {"<Stack.Screen>"} 元件，我們可以在畫面的渲染過程中，動態決定並覆寫所屬導航器的標題列 (Header) 設定。
                這不僅可以用於修改標題文字，也非常適合用來放置能與當前畫面交互的按鈕。請試著增加計數並點擊右上角的「儲存」按鈕！
            </Text>

            <View style={styles.counterBox}>
                <Text style={styles.countText}>目前計數：{count}</Text>
                <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => setCount(prev => prev + 1)}
                >
                    <Text style={styles.actionBtnText}>增加計數</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F8F4',
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 15,
        textAlign: 'center'
    },
    description: {
        fontSize: 16,
        color: '#7F8C8D',
        lineHeight: 24,
        marginBottom: 30
    },
    counterBox: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#8B7355',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    countText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#8B7355',
        marginBottom: 20
    },
    actionBtn: {
        backgroundColor: '#3498DB',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8
    },
    actionBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    headerBtn: {
        marginRight: 15,
        padding: 8,
        backgroundColor: '#8B7355',
        borderRadius: 6
    },
    headerBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14
    }
});

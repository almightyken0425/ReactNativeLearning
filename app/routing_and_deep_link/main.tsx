import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RoutingAndDeepLinkMainScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
            <Text style={styles.headerTitle}>
                百科 7: 路由與深層連結
            </Text>

            {/* =======================================================
                💡 Expo Router 與導航
            ======================================================= */}
            <Text style={styles.sectionTitle}>
                💡 1. 堆疊導航 (Stack Navigation)
            </Text>

            <View style={styles.demoBox}>
                <Text style={styles.demoText}>
                    <Text style={{ fontWeight: 'bold' }}>• 揮別繁雜的設定：</Text>
                    {'\n'}
                    傳統的 React Navigation 需要定義各種 Stack Navigator 並註冊所有畫面，
                    但在使用 Expo Router 的專案中，只要把檔案放進 <Text style={styles.codeText}>app/</Text> 資料夾，
                    路由就會依照檔案名稱自動生成！
                    {'\n\n'}
                    點擊下方按鈕，了解如何使用 <Text style={styles.codeText}>router.push</Text> 以及如何夾帶參數跳轉。
                </Text>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#3498DB' }]}
                    onPress={() => router.push("/routing_and_deep_link/demo_expo_router" as any)}
                >
                    <Text style={styles.buttonText}>➡ 前往 Expo Router 基礎教學</Text>
                </TouchableOpacity>
            </View>

            {/* =======================================================
                💡 底部標籤導航 (Bottom Tabs)
            ======================================================= */}
            <Text style={styles.sectionTitle}>
                💡 2. 底部標籤導航 (Bottom Tabs)
            </Text>

            <View style={styles.demoBox}>
                <Text style={styles.demoText}>
                    <Text style={{ fontWeight: 'bold' }}>• 平行的主要功能區塊：</Text>
                    {'\n'}
                    使用 <Text style={styles.codeText}>(group)</Text> 資料夾名稱與 <Text style={styles.codeText}>Tabs</Text> 元件，可以輕鬆建立底部標籤列。標籤頁各自擁有導航狀態，切換時可以保持目前的畫面進度！
                </Text>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#27AE60' }]}
                    onPress={() => router.push("/routing_and_deep_link/(demo_tabs)" as any)}
                >
                    <Text style={styles.buttonText}>➡ 前往底部標籤導航展示</Text>
                </TouchableOpacity>
            </View>

            {/* =======================================================
                💡 標題區塊操作按鈕 (Header Buttons)
            ======================================================= */}
            <Text style={styles.sectionTitle}>
                💡 3. 標題區塊操作按鈕 (Header Buttons)
            </Text>

            <View style={styles.demoBox}>
                <Text style={styles.demoText}>
                    <Text style={{ fontWeight: 'bold' }}>• 與原生標題列互動：</Text>
                    {'\n'}
                    利用 <Text style={styles.codeText}>Stack.Screen</Text> 動態覆寫標題列設定，輕鬆把「儲存」或「分享」等互動按鈕放進右上角的原生空間！
                </Text>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#E67E22' }]}
                    onPress={() => router.push("/routing_and_deep_link/demo_header_buttons" as any)}
                >
                    <Text style={styles.buttonText}>➡ 前往標題區塊按鈕實戰</Text>
                </TouchableOpacity>
            </View>

            {/* =======================================================
                💡 Deep Linking 深層連結
            ======================================================= */}
            <Text style={styles.sectionTitle}>
                💡 Deep Linking：來自外部的呼喚
            </Text>

            <View style={styles.demoBox}>
                <Text style={styles.demoText}>
                    <Text style={{ fontWeight: 'bold' }}>• 讓你的 App 也能擁有專屬網址：</Text>
                    {'\n'}
                    深層連結讓使用者可以直接從外部瀏覽器，點擊特定網址後直接喚醒並跳轉到你 App 裡面的特定畫面！
                    {'\n\n'}
                    你想知道如何從外部接收參數嗎？你想測試看看如何透過點擊按鈕，模擬系統呼喚你的 App 嗎？
                    點擊下方按鈕前往深層連結實戰！
                </Text>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#9B59B6' }]}
                    onPress={() => router.push("/routing_and_deep_link/demo_deep_link" as any)}
                >
                    <Text style={styles.buttonText}>➡ 前往深層連結與傳參實戰</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F8F4',
        padding: 20
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginVertical: 20,
        textAlign: 'center'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8B7355',
        marginTop: 10,
        marginBottom: 15
    },
    demoBox: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 12,
        marginBottom: 25,
        shadowColor: '#8B7355',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    demoText: {
        fontSize: 14,
        lineHeight: 22,
        color: '#7F8C8D'
    },
    codeText: {
        fontFamily: 'monospace',
        backgroundColor: '#F5F5F3',
        paddingHorizontal: 4,
        borderRadius: 4,
        color: '#8B7355'
    },
    button: {
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

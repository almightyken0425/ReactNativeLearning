import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DemoExpoRouterScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
            <Text style={styles.headerTitle}>
                百科 7-1: Expo Router 基礎導航
            </Text>

            {/* =======================================================
                💡 檔案即路由 File-based Routing
            ======================================================= */}
            <Text style={styles.sectionTitle}>
                💡 檔案即路由 File-based Routing
            </Text>

            <View style={styles.demoBox}>
                <Text style={styles.demoText}>
                    <Text style={{ fontWeight: 'bold' }}>• 什麼是檔案即路由？</Text>
                    {'\n'}
                    在傳統的 React Navigation 中，我們需要在一支檔案裡定義所有的 Screen 跟 Stack。
                    但在 Expo Router 裡面，只要你在 <Text style={styles.codeText}>app/</Text> 資料夾下新增檔案，它就會自動變成一個可以跳轉的頁面！
                    {'\n\n'}
                    例如：建立 <Text style={styles.codeText}>app/profile.tsx</Text>，你就可以直接跳轉到 <Text style={styles.codeText}>/profile</Text> 路由！
                </Text>
            </View>

            {/* =======================================================
                💡 程式化導航：路由推入與取代
            ======================================================= */}
            <Text style={styles.sectionTitle}>
                💡 程式化導航：路由推入與取代
            </Text>

            <View style={styles.demoBox}>
                <Text style={styles.demoText}>
                    <Text style={{ fontWeight: 'bold' }}>• 推入新頁面</Text>
                    {'\n'}
                    將新頁面推入堆疊 Stack。你可以點擊左上角的返回按鈕回到前一頁。
                    {'\n\n'}
                    <Text style={{ fontWeight: 'bold' }}>• 取代目前頁面</Text>
                    {'\n'}
                    取代目前的頁面。這通常用在登入後跳轉到首頁的設計上，因為你不希望使用者按返回鍵又回到登入頁。
                </Text>
            </View>

            {/* =======================================================
                💡 攜帶參數跳轉
            ======================================================= */}
            <Text style={styles.sectionTitle}>
                💡 攜帶參數跳轉
            </Text>

            <View style={styles.demoBox}>
                <Text style={styles.demoText}>
                    <Text style={{ fontWeight: 'bold' }}>• 透過物件傳遞參數</Text>
                    {'\n'}
                    不論是字串或是物件，都能當作路由的 href 傳入。如果需要帶參數，可以寫成下面這樣：
                    {'\n\n'}
                    <Text style={[styles.codeText, { fontSize: 12 }]}>
                        router.push({'{'}{'\n'}
                        {'  '}pathname: "/routingAndDeepLink/demoDeepLink",{'\n'}
                        {'  '}params: {'{'} user: "Ken", id: "123" {'}'}{'\n'}
                        {'}'});
                    </Text>
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push({
                        pathname: "/routingAndDeepLink/demoPage" as any,
                        params: { user: "Ken", action: "test_push" }
                    })}
                >
                    <Text style={styles.buttonText}>➡ 攜帶參數跳轉測試</Text>
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
        backgroundColor: '#8B7355',
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

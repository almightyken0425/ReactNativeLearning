import * as Linking from 'expo-linking';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DeepLinkDemoScreen() {
    // 獲取目前啟動或處於活動狀態時的 URL
    const url = Linking.useURL();
    const [initialUrl, setInitialUrl] = useState<string | null>(null);

    // 透過 Expo Router 的 hook 獲取路由夾帶的參數
    const params = useLocalSearchParams();

    useEffect(() => {
        const fetchInitialUrl = async () => {
            const initial = await Linking.getInitialURL();
            if (initial) setInitialUrl(initial);
        };
        fetchInitialUrl();
    }, []);

    const handleTestDeepLink = async () => {
        const deepLinkUrl = Linking.createURL('/routing_and_deep_link/demo_deep_link', {
            queryParams: {
                source: 'deepLink_button',
                message: 'Hello_from_DeepLink',
                timestamp: Date.now().toString()
            }
        });
        await Linking.openURL(deepLinkUrl);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
            <Text style={styles.headerTitle}>
                百科 7-2: 深層連結 Deep Linking
            </Text>

            {/* =======================================================
                💡 什麼是深層連結？
            ======================================================= */}
            <Text style={styles.sectionTitle}>
                💡 什麼是深層連結？
            </Text>

            <View style={styles.demoBox}>
                <Text style={styles.demoText}>
                    深層連結 Deep Link 是一種讓外部應用程式或網站可以直接開啟 App 中特定頁面的技術。
                    {'\n'}
                    就像網頁有專屬網址一樣，手機 App 也能有專屬的 URL Scheme 例如 <Text style={styles.codeText}>reactnativelearning://</Text> ，作業系統收到這個請求時，就會去尋找對應的 App 來開啟。
                </Text>
            </View>

            {/* =======================================================
                💡 當前網址狀態與測試
            ======================================================= */}
            <Text style={styles.sectionTitle}>
                💡 當前網址狀態與 API
            </Text>

            <View style={styles.demoBox}>
                <View style={styles.urlBox}>
                    <Text style={styles.label}>useURL() 取得之現有網址：</Text>
                    <Text style={styles.urlText}>{url || '無 (可能尚未透過連結喚醒)'}</Text>
                </View>
                <View style={[styles.urlBox, { marginBottom: 0 }]}>
                    <Text style={styles.label}>getInitialURL() 取得之啟動網址：</Text>
                    <Text style={styles.urlText}>{initialUrl || '無'}</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleTestDeepLink}>
                    <Text style={styles.buttonText}>➡ 觸發外部深層連結</Text>
                </TouchableOpacity>

                <Text style={[styles.demoText, { marginTop: 15, fontStyle: 'italic', fontSize: 13 }]}>
                    CLI 測試: npx uri-scheme open reactnativelearning://routing_and_deep_link/demo_deep_link?source=cli --android
                </Text>
            </View>

            {/* =======================================================
                💡 成功接收的參數
            ======================================================= */}
            <Text style={styles.sectionTitle}>
                💡 成功解析的參數 (Params)
            </Text>

            <View style={styles.demoBox}>
                <Text style={[styles.demoText, { marginBottom: 15 }]}>
                    當我們透過深層連結或路由進入此頁面時，將會自動為我們解析所有網址後的查詢字串 Query Parameters 如下表格：
                </Text>

                <View style={styles.paramsContainer}>
                    {Object.keys(params).map((key) => (
                        <View key={key} style={styles.paramRow}>
                            <Text style={styles.paramKey}>{key}</Text>
                            <Text style={styles.paramValue}>{params[key]}</Text>
                        </View>
                    ))}

                    {Object.keys(params).length === 0 && (
                        <Text style={styles.emptyText}>目前沒有接收到任何參數</Text>
                    )}
                </View>
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
    },
    urlBox: {
        backgroundColor: '#F8F9F9',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#EAE6DF'
    },
    label: {
        fontSize: 13,
        color: '#7F8C8D',
        marginBottom: 4,
        fontWeight: '500',
    },
    urlText: {
        fontSize: 14,
        color: '#E74C3C',
        fontFamily: 'monospace',
    },
    paramsContainer: {
        backgroundColor: '#F8F9F9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#EAE6DF',
        padding: 10
    },
    paramRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ECF0F1',
    },
    paramKey: {
        fontSize: 15,
        fontWeight: '600',
        color: '#34495E',
    },
    paramValue: {
        fontSize: 15,
        color: '#3498DB',
        fontWeight: '500',
    },
    emptyText: {
        fontSize: 14,
        color: '#95A5A6',
        textAlign: 'center',
        fontStyle: 'italic',
        paddingVertical: 10,
    }
});

import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DeviceAdaptationMainScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.headerTitle}>
                百科 8: 專屬行動裝置生態適配
            </Text>

            {/* =======================================================
                💡 優化長列表效能
            ======================================================= */}
            <Text style={styles.sectionTitle}>
                💡 優化長列表效能 FlatList
            </Text>

            <View style={styles.demoBox}>
                <Text style={styles.demoText}>
                    <Text style={{ fontWeight: 'bold' }}>• 揮別卡頓的 ScrollView：</Text>
                    {'\n'}
                    如果是幾百筆甚至幾千筆資料，直接塞進 ScrollView 會讓全部元件同時渲染，這會瞬間榨乾手機的記憶體並造成畫面卡頓。
                    {'\n\n'}
                    使用 FlatList 可以達成局部渲染，也就是只渲染目前螢幕範圍內看見的項目，大幅提升效能！
                    點擊下方按鈕，了解如何運用 FlatList 以及為何需要設定唯一鍵值以協助底層比對差異。
                </Text>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#3498DB' }]}
                    onPress={() => router.push("/deviceAdaptation/demoFlatList" as any)}
                >
                    <Text style={styles.buttonText}>➡ 前往 FlatList 實戰教學</Text>
                </TouchableOpacity>
            </View>

            {/* =======================================================
                💡 鍵盤迴避與安全區域
            ======================================================= */}
            <Text style={styles.sectionTitle}>
                💡 鍵盤迴避與 SafeAreaView
            </Text>

            <View style={styles.demoBox}>
                <Text style={styles.demoText}>
                    在手機設備上，除了實體的螢幕邊界外，還有上方狀態列、下方的全螢幕手勢橫條等各種變數。除此之外，當使用者點擊輸入框時，彈出的虛擬鍵盤經常會遮擋住原本的輸入框或送出按鈕。
                    {'\n\n'}
                    點擊下方按鈕，我們將運用 SafeAreaView 避開這些系統介面，並透過 KeyboardAvoidingView 確保輸入框在鍵盤彈出時依舊保持可見！
                </Text>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#E74C3C' }]}
                    onPress={() => router.push("/deviceAdaptation/demoKeyboard" as any)}
                >
                    <Text style={styles.buttonText}>➡ 前往鍵盤與安全範圍控制實戰</Text>
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
    scrollContent: {
        paddingBottom: 50
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
        fontSize: 15,
        lineHeight: 24,
        color: '#34495E'
    },
    button: {
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

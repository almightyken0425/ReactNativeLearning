import React, { useContext, useReducer } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ThemeContext } from './context/theme_context';
import { cartReducer } from './reducers/cart_reducer';

export default function ReducerExampleScreen() {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    const [cartState, dispatch] = useReducer(cartReducer, { count: 0, total: 0 });

    return (
        <View
            style={[
                styles.safeArea,
                isDark ? styles.darkBg : styles.lightBg
            ]}
        >
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 50 }}
            >
                {/* =======================================================
                    💡 useReducer：複雜狀態機
                ======================================================= */}
                <Text
                    style={[
                        styles.sectionTitle,
                        isDark ? styles.darkAccent : styles.lightAccent
                    ]}
                >
                    💡 useReducer：集中管理複雜狀態
                </Text>

                <View
                    style={[
                        styles.demoBox,
                        isDark ? styles.darkCard : styles.lightCard
                    ]}
                >
                    <Text
                        style={[
                            styles.demoText,
                            isDark ? styles.darkDesc : styles.lightDesc
                        ]}
                    >
                        <Text style={{ fontWeight: 'bold' }}>• Reducer：</Text>
                        {'\n'}
                        當總數量與總金額等多個聯動的變數需要一起更新，
                        可以把邏輯整理成一個 <Text style={styles.codeText}>reducer</Text> 函式。
                        UI 只透過呼叫 <Text style={styles.codeText}>dispatch</Text> 派發一個動作標籤，
                        剩下的更新運算完全交給 reducer 處理。
                    </Text>

                    <Text
                        style={[
                            styles.dataText,
                            isDark ? styles.darkText : styles.lightText,
                            { marginTop: 15 }
                        ]}
                    >
                        購物車內有：{cartState.count} 項商品
                    </Text>
                    <Text
                        style={[
                            styles.dataText,
                            isDark ? styles.darkText : styles.lightText
                        ]}
                    >
                        總金額： {cartState.total}
                    </Text>

                    <View style={styles.row}>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                styles.flex1,
                                { backgroundColor: '#4CAF50' }
                            ]}
                            onPress={() => dispatch({ type: 'ADD_ITEM', price: 100 })}
                        >
                            <Text style={styles.buttonText}>+ 增商品</Text>
                        </TouchableOpacity>

                        <View style={{ width: 10 }} />

                        <TouchableOpacity
                            style={[
                                styles.button,
                                styles.flex1,
                                { backgroundColor: '#FF9800' }
                            ]}
                            onPress={() => dispatch({ type: 'REMOVE_ITEM', price: 100 })}
                        >
                            <Text style={styles.buttonText}>- 減商品</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: '#F44336', marginTop: 10 }
                        ]}
                        onPress={() => dispatch({ type: 'CLEAR' })}
                    >
                        <Text style={styles.buttonText}>🗑️ 清空</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    lightBg: { backgroundColor: '#F9F8F4' },
    darkBg: { backgroundColor: '#121212' },
    container: { flex: 1, padding: 20 },
    lightText: { color: '#2C3E50' },
    darkText: { color: '#fff' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 15 },
    lightAccent: { color: '#8B7355' },
    darkAccent: { color: '#BB86FC' },
    demoBox: { padding: 20, borderRadius: 12, marginBottom: 25, shadowColor: '#8B7355', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    lightCard: { backgroundColor: '#FFFFFF' },
    darkCard: { backgroundColor: '#1e1e1e' },
    demoText: { fontSize: 14, lineHeight: 22 },
    lightDesc: { color: '#7F8C8D' },
    darkDesc: { color: '#aaa' },
    codeText: { fontFamily: 'monospace', backgroundColor: '#F5F5F3', paddingHorizontal: 4, borderRadius: 4, color: '#8B7355' },
    dataText: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    button: { height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 15 },
    buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    flex1: { flex: 1 }
});

import React, { createContext, useContext, useReducer, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ==========================================
// Context API 示範：全域主題
// ==========================================
type ThemeContextType = 'light' | 'dark';
// 建立一個 Context，初始值為 'light'
const ThemeContext = createContext<ThemeContextType>('light');

const ThemeConsumerComponent = () => {
    // 💡 透過 useContext 取得最上層 Provider 所提供的全域狀態
    const theme = useContext(ThemeContext);
    const isDark = theme === 'dark';

    return (
        <View style={[styles.demoBox, isDark ? styles.darkBox : styles.lightBox]}>
            <Text style={isDark ? styles.darkText : styles.lightText}>
                現在的 Context 主題是：{theme}
            </Text>
        </View>
    );
};

// ==========================================
// useReducer 示範：購物車狀態
// ==========================================
type CartState = { count: number; total: number };
type CartAction =
    | { type: 'ADD_ITEM'; price: number }
    | { type: 'REMOVE_ITEM'; price: number }
    | { type: 'CLEAR' };

// Reducer 是一個純函式 Pure Function，它負責接收當前狀態與發生的動作 Action，然後計算並返回全新的狀態
const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM':
            return { count: state.count + 1, total: state.total + action.price };
        case 'REMOVE_ITEM':
            if (state.count === 0) return state; // 避免數量變為負的
            return { count: state.count - 1, total: Math.max(0, state.total - action.price) };
        case 'CLEAR':
            return { count: 0, total: 0 };
        default:
            return state;
    }
};

// ==========================================
// Custom Hook 示範：抽離商業邏輯
// ==========================================
// 將計數器的邏輯封裝在一個 use 開頭的函式中
const useCounter = (initialValue: number = 0) => {
    const [count, setCount] = useState(initialValue);

    const increment = () => setCount(c => c + 1);
    const decrement = () => setCount(c => c - 1);
    const reset = () => setCount(initialValue);

    // 將狀態和可呼叫的方法打包回傳提供給外部的 UI 層級使用
    return { count, increment, decrement, reset };
};

export default function AdvancedStateManagementScreen() {
    // --- Context State ---
    const [theme, setTheme] = useState<ThemeContextType>('light');

    // --- useReducer State ---
    // 第一個參數放 reducer 邏輯，第二個參數放初始狀態
    const [cartState, dispatch] = useReducer(cartReducer, { count: 0, total: 0 });

    // --- Custom Hook State ---
    // UI 元件裡只需要一行程式碼就能接入完整的計數器邏輯
    const counter = useCounter(10);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
                <Text style={styles.headerTitle}>百科 6: 進階狀態管理</Text>

                {/* =======================================================
                    💡 Context API：避免 Prop Drilling
                ======================================================= */}
                <Text style={styles.sectionTitle}>💡 useContext：全域共享</Text>
                <View style={styles.demoBox}>
                    <Text style={styles.demoText}>
                        <Text style={{ fontWeight: 'bold' }}>• Context：</Text>
                        當主題、語系、登入狀態等資料需要提供給深層子元件時，使用 <Text style={styles.codeText}>createContext</Text> 與 <Text style={styles.codeText}>{"<Context.Provider>"}</Text> 包覆外層，子代深處元件就能直接呼叫 <Text style={styles.codeText}>useContext()</Text> 拿資料，不用透過層層 Props 接力傳遞。
                    </Text>
                </View>

                <View style={styles.exerciseBox}>
                    <ThemeContext.Provider value={theme}>
                        <ThemeConsumerComponent />
                    </ThemeContext.Provider>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    >
                        <Text style={styles.buttonText}>切換主題並改變 Provider 值</Text>
                    </TouchableOpacity>
                </View>

                {/* =======================================================
                    💡 useReducer：複雜狀態機
                ======================================================= */}
                <Text style={styles.sectionTitle}>💡 useReducer：集中管理複雜狀態</Text>
                <View style={styles.demoBox}>
                    <Text style={styles.demoText}>
                        <Text style={{ fontWeight: 'bold' }}>• Reducer：</Text>
                        當總數量與總金額等多個聯動的變數需要一起更新，可以把邏輯整理成一個 <Text style={styles.codeText}>reducer</Text> 函式。UI 只透過呼叫 <Text style={styles.codeText}>dispatch</Text> 派發一個動作標籤，剩下的更新運算完全交給 reducer 處理。
                    </Text>
                </View>

                <View style={styles.exerciseBox}>
                    <Text style={styles.dataText}>購物車內有：{cartState.count} 項商品</Text>
                    <Text style={styles.dataText}>總金額： {cartState.total}</Text>

                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.button, styles.flex1, { backgroundColor: '#4CAF50' }]} onPress={() => dispatch({ type: 'ADD_ITEM', price: 100 })}>
                            <Text style={styles.buttonText}>+ 增加一百元商品</Text>
                        </TouchableOpacity>
                        <View style={{ width: 10 }} />
                        <TouchableOpacity style={[styles.button, styles.flex1, { backgroundColor: '#FF9800' }]} onPress={() => dispatch({ type: 'REMOVE_ITEM', price: 100 })}>
                            <Text style={styles.buttonText}>- 減商品</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#F44336', marginTop: 10 }]} onPress={() => dispatch({ type: 'CLEAR' })}>
                        <Text style={styles.buttonText}>🗑️ 清空購物車</Text>
                    </TouchableOpacity>
                </View>

                {/* =======================================================
                    💡 Custom Hooks：邏輯抽離
                ======================================================= */}
                <Text style={styles.sectionTitle}>💡 Custom Hooks：自訂鉤子</Text>
                <View style={styles.demoBox}>
                    <Text style={styles.demoText}>
                        <Text style={{ fontWeight: 'bold' }}>• Custom Hook：</Text>
                        把 <Text style={styles.codeText}>useState</Text> 或其他操作狀態的商業邏輯抽離成一個以 <Text style={styles.codeText}>use</Text> 開頭的獨立函式。這可以讓 UI 元件回歸渲染的本質，保持畫面的乾淨，並達到業務邏輯可重複使用 Reusability 的目的。
                    </Text>
                </View>

                <View style={styles.exerciseBox}>
                    <Text style={styles.dataText}>自訂計數器 Hook：{counter.count}</Text>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.button, styles.flex1]} onPress={counter.increment}><Text style={styles.buttonText}>+ 加</Text></TouchableOpacity>
                        <View style={{ width: 10 }} />
                        <TouchableOpacity style={[styles.button, styles.flex1]} onPress={counter.decrement}><Text style={styles.buttonText}>- 減</Text></TouchableOpacity>
                        <View style={{ width: 10 }} />
                        <TouchableOpacity style={[styles.button, styles.flex1, { backgroundColor: '#9E9E9E' }]} onPress={counter.reset}><Text style={styles.buttonText}>重置</Text></TouchableOpacity>
                    </View>
                </View>

                {/* =======================================================
                    📝 任務區
                ======================================================= */}
                <Text style={styles.sectionTitle}>🧩 你的實戰演練區</Text>
                <View style={[styles.exerciseBox, { borderColor: '#FF9800', borderWidth: 2 }]}>
                    <Text style={styles.demoText}>
                        <Text style={{ fontWeight: 'bold' }}>任務：動手寫一個屬於你的 Custom Hook</Text>{'\n'}
                        - 參考上方 <Text style={styles.codeText}>useCounter</Text> 的結構，寫一個名叫 <Text style={styles.codeText}>useToggle</Text> 的 Custom Hook。{'\n'}
                        - 該 Hook 要接收一個初始的布林值初值。{'\n'}
                        - 裡面要回傳：當前狀態值、以及切換、設為真、設為假三個切換函式。{'\n'}
                        - 然後，在這個檔案裡面找個地方呼叫並測試它的按鈕！
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#eef2f5',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007AFF',
        marginTop: 10,
        marginBottom: 15,
    },
    demoBox: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    demoText: {
        fontSize: 14,
        color: '#555',
        lineHeight: 22,
    },
    codeText: {
        fontFamily: 'monospace',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 4,
        borderRadius: 4,
        color: '#E91E63',
    },
    exerciseBox: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    lightBox: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    darkBox: {
        backgroundColor: '#333',
    },
    lightText: {
        color: '#333',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    darkText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    dataText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    button: {
        backgroundColor: '#007AFF',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    flex1: {
        flex: 1,
    }
});

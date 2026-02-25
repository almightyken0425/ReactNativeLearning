import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ArrayStateAndStorageScreen() {
    // 💡 TS 教學註解: 明確定義泛型
    // 原本的預設數值 TS 會自己猜測是 number，所以沒寫沒關係。
    // 但身為好習慣，我們加上了 <number> 來告訴 Strict Mode 這永遠只能裝數字。
    const [balance, setBalance] = useState<number>(1000);

    // 💡 TS 教學註解: 解決空陣列 never 的問題
    // 如果只寫空陣列，TS 會以為這是一個不准放任何東西的 never 陣列。
    // 所以我們必須透過明確定義清楚裡面每一塊資料長什麼樣子。
    const [history, setHistory] = useState<{ id: string; amount: number }[]>([]);

    const [txt, setTxt] = useState<string>('');

    // 開機時讀取資料
    useEffect(() => {
        loadData();
    }, []);

    // 📖 讀檔邏輯
    const loadData = async () => {
        try {
            const savedBalance = await AsyncStorage.getItem('myBalance');
            const savedHistory = await AsyncStorage.getItem('myHistory');

            if (savedBalance !== null) {
                setBalance(parseInt(savedBalance));
            }
            if (savedHistory !== null) {
                setHistory(JSON.parse(savedHistory));
            }
        } catch (e) {
            console.log('讀檔失敗');
        }
    };

    // 💡 TS 教學註解: 為函式傳入參數標示型別
    // TS 不允許參數有隱含的 any 風險。你必須告訴它型別，
    // 而傳入陣列必須符合我們設計的陣列物件格式，否則編譯是不會通過的。
    const saveData = async (newBalance: number, newHistory: { id: string; amount: number }[]) => {
        try {
            await AsyncStorage.setItem('myBalance', newBalance.toString());
            await AsyncStorage.setItem('myHistory', JSON.stringify(newHistory));
        } catch (e) {
            console.log('存檔失敗');
        }
    };

    return (
        <View style={styles.safeArea}>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
                <Text style={styles.headerTitle}>百科 5: 陣列狀態與持久化</Text>

                {/* =======================================================
                    💡 百科全書解說區
                ======================================================= */}
                <Text style={styles.sectionTitle}>💡 useState 陣列狀態與 TypeScript</Text>
                <View style={styles.demoBox}>
                    <Text style={styles.demoText}>
                        <Text style={{ fontWeight: 'bold' }}>• 泛型標註：</Text>
                        如果是空陣列狀態，TypeScript 會把它當作不允許放東西的 never 陣列。因此我們必須加上明確的泛型：<Text style={styles.codeText}>{"<{ id: string; amount: number }[]>"}</Text> 來規定裡面的物件長相。
                    </Text>
                    <Text style={[styles.demoText, { marginTop: 10 }]}>
                        <Text style={{ fontWeight: 'bold' }}>• Immutable Array 更新：</Text>
                        在 React 裡面更新陣列不能直接用 <Text style={styles.codeText}>push</Text> 功能，而是要透過展開運算子：<Text style={styles.codeText}>[...history, newItem]</Text> 來產生一個全新的陣列設定進去，如此才能觸發畫面重新渲染。
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>💡 useEffect 初始化生命週期</Text>
                <View style={styles.demoBox}>
                    <Text style={styles.demoText}>
                        <Text style={{ fontWeight: 'bold' }}>• ComponentDidMount：</Text>
                        當我們把 <Text style={styles.codeText}>useEffect</Text> 的第二個參數給定空陣列 <Text style={styles.codeText}>[]</Text> 時，裡面的程式碼就只會在畫面第一次畫出來時執行一次。這非常適合用來串接 API 或是讀取本地端 <Text style={styles.codeText}>AsyncStorage</Text> 的歷史資料。
                    </Text>
                </View>

                {/* =======================================================
                    📱 實際展示區
                ======================================================= */}
                <Text style={styles.sectionTitle}>📱 實際運作 Demo</Text>
                <View style={styles.exerciseBox}>
                    <Text style={styles.balanceText}>目前存款： {balance}</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="請輸入扣除金額..."
                        onChangeText={(text) => setTxt(text)}
                        value={txt}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            const amount = parseInt(txt) || 0;
                            if (amount > 0) {
                                const newBalance = balance - amount;
                                const newHistory = [
                                    ...history,
                                    { id: Date.now().toString(), amount: amount },
                                ];

                                setBalance(newBalance);
                                setHistory(newHistory);
                                saveData(newBalance, newHistory);
                                setTxt('');
                            }
                        }}>
                        <Text style={styles.buttonText}>💸 記一筆帳</Text>
                    </TouchableOpacity>

                    <View style={styles.list}>
                        <Text style={styles.listTitle}>交易紀錄：</Text>

                        {/* 因外層已經有 ScrollView，故用 map 取代 FlatList */}
                        {history.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.listItem}
                                onPress={() => {
                                    Alert.alert(
                                        '刪除確認',
                                        '確定要刪除這筆紀錄嗎？',
                                        [
                                            { text: '取消', style: 'cancel' },
                                            {
                                                text: '刪除',
                                                style: 'destructive',
                                                onPress: () => {
                                                    const newHistory = history.filter(
                                                        (record) => record.id !== item.id
                                                    );
                                                    const newBalance = balance + item.amount;

                                                    setHistory(newHistory);
                                                    setBalance(newBalance);
                                                    saveData(newBalance, newHistory);
                                                },
                                            },
                                        ]
                                    );
                                }}>
                                <Text style={styles.listItemText}>消費了：{item.amount}</Text>
                                <Text style={styles.listItemHint}>點擊可復原並刪除紀錄</Text>
                            </TouchableOpacity>
                        ))}
                        {history.length === 0 && <Text style={{ color: '#aaa', textAlign: 'center', marginTop: 20 }}>目前沒有任何紀錄</Text>}
                    </View>
                </View>

            </ScrollView>
        </View>
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
        color: '#007AFF', // iOS 藍色風格
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
        minHeight: 300,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    balanceText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    button: {
        backgroundColor: '#4CAF50',
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textInput: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: '#fafafa',
        borderRadius: 8,
        fontSize: 16,
    },
    list: {
        marginTop: 25,
        borderTopWidth: 1,
        borderColor: '#eee',
        paddingTop: 15,
    },
    listTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#555',
    },
    listItem: {
        backgroundColor: '#FFEB3B', // 將原先的黃色保留
        padding: 15,
        marginVertical: 6,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // 淡淡的陰影
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    listItemText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    listItemHint: {
        fontSize: 12,
        color: '#888',
    }
});

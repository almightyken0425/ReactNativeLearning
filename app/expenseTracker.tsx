import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ExpenseTrackerScreen() {
    // 💡 TS 教學註解 1: 明確定義泛型
    // 原本的 useState(1000) TS 會自己猜測是 number，所以沒寫沒關係。
    // 但身為好習慣，我們加上了 <number> 來告訴 Strict Mode 這永遠只能裝數字。
    const [balance, setBalance] = useState<number>(1000);

    // 💡 TS 教學註解 2: 解決 never[] 的問題
    // 如果只寫 useState([])，TS 會以為這是一個不准放任何東西的空陣列 (never[])。
    // 所以我們必須透過 <{ id: string; amount: number }[]> 清楚定義裡面每一塊資料長什麼樣子。
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

    // 💡 TS 教學註解 3: 為函式傳入參數標示型別
    // TS 不允許參數有「隱含的 any」風險。你必須告訴它 newBalance 一定是 number，
    // 而 newHistory 必須符合我們設計的陣列物件格式，否則編譯是不會通過的。
    const saveData = async (newBalance: number, newHistory: { id: string; amount: number }[]) => {
        try {
            await AsyncStorage.setItem('myBalance', newBalance.toString());
            await AsyncStorage.setItem('myHistory', JSON.stringify(newHistory));
        } catch (e) {
            console.log('存檔失敗');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.paragraph}>Here's the balance: {balance}</Text>
            <TextInput
                style={styles.textInput}
                placeholder="請輸入金額"
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
                <Text style={styles.buttonText}>扣錢</Text>
            </TouchableOpacity>

            <View style={styles.list}>
                <Text style={styles.listTitle}>交易紀錄：</Text>

                <FlatList
                    data={history}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
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
                            <Text>消費了：${item.amount}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        backgroundColor: 'white',
    },
    list: {
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: '#ccc',
        flex: 1,
    },
    listTitle: {
        marginTop: 10,
        fontSize: 16,
        marginBottom: 5,
    },
    listItem: {
        backgroundColor: 'yellow',
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

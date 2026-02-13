import { useState } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function App() {
    const [balance, setBalance] = useState(1000);
    const [txt, setTxt] = useState('');

    const [history, setHistory] = useState([
        { id: '1', amount: 50 },
        { id: '2', amount: 150 },
        { id: '3', amount: 300 },
    ]);

    return (
        <View style={styles.container}>
            <Text style={styles.paragraph}>Balance: {balance}</Text>
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
                        setBalance(balance - amount);
                        setHistory([
                            ...history,
                            { id: Date.now().toString(), amount: amount },
                        ]);
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
                                    '這筆紀錄將被刪除，金額會退回餘額，確定嗎？',
                                    [
                                        {
                                            text: '取消',
                                            style: 'cancel',
                                        },
                                        {
                                            text: '刪除',
                                            style: 'destructive',
                                            onPress: () => {
                                                const newHistory = history.filter(
                                                    (record) => record.id !== item.id
                                                );
                                                setHistory(newHistory);
                                                setBalance(balance + item.amount);
                                            },
                                        },
                                    ]
                                );
                            }}>
                            {/* 這裡面的字才需要用 Text 包起來 */}
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
        flex: 1, // 讓列表可以佔滿剩下的空間
    },
    listTitle: {
        marginTop: 10,
        fontSize: 16,
        marginBottom: 5,
    },
    listItem: {
        backgroundColor: 'white',
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 10,
        // 陰影設定
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

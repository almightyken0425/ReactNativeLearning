import { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StateAndEffectFormScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isValid, setIsValid] = useState(false); // 控制按鈕啟用狀態

    // 🕵️‍♀️ 驗證邏輯：監聽 Email 和 Password
    useEffect(() => {
        // 檢查 Email 格式
        if (email.length > 0 && email.length < 5) {
            setErrorMsg('Email 太短了');
            setIsValid(false);
        } else if (email.length > 0 && !email.includes('@')) {
            setErrorMsg('Email 缺少 @ 符號');
            setIsValid(false);
        } else {
            setErrorMsg(''); // Email 沒問題

            // 只有當 Email 無誤且密碼已輸入時才算驗證通過
            if (email.length >= 5 && password.length > 0) {
                setIsValid(true);
            } else {
                setIsValid(false);
            }
        }
        // 👇 這裡要盯著 email 也要盯著 password，任何一個變動都要重新檢查
    }, [email, password]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
                <Text style={styles.headerTitle}>狀態與副作用百科</Text>

                {/* =======================================================
                    💡 百科全書解說區
                ======================================================= */}
                <Text style={styles.sectionTitle}>💡 useState 雙向綁定</Text>
                <View style={styles.demoBox}>
                    <Text style={styles.demoText}>
                        <Text style={{ fontWeight: 'bold' }}>• 狀態追蹤：</Text>
                        我們使用 <Text style={styles.codeText}>useState</Text> 來儲存使用者輸入的 Email 與 Password。
                        透過 TextInput 的 <Text style={styles.codeText}>value</Text> 屬性與 <Text style={styles.codeText}>onChangeText</Text> 函式達成值的雙向同步。
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>💡 useEffect 副作用檢測</Text>
                <View style={styles.demoBox}>
                    <Text style={styles.demoText}>
                        <Text style={{ fontWeight: 'bold' }}>• 依賴陣列 Dependency Array：</Text>
                        我們將 <Text style={styles.codeText}>[email, password]</Text> 放進 <Text style={styles.codeText}>useEffect</Text> 的依賴陣列中。這代表只要這兩個值有任何變動，裡面的檢查 @ 符號與長度等驗證邏輯就會自動重新執行，並即時更新錯誤訊息與登入按鈕的狀態！
                    </Text>
                </View>

                {/* =======================================================
                    📱 實際展示區
                ======================================================= */}
                <Text style={styles.sectionTitle}>📱 實際運作 Demo</Text>
                <View style={styles.exerciseBox}>
                    <Text style={styles.title}>歡迎登入</Text>

                    {/* Email 輸入框 */}
                    <Text style={styles.label}>電子郵件</Text>
                    <TextInput
                        style={[styles.input, errorMsg ? styles.inputError : null]} // 如果有錯，邊框變紅
                        value={email}
                        onChangeText={setEmail}
                        placeholder="請輸入 Email"
                        keyboardType="email-address" // 讓鍵盤出現 @
                        autoCapitalize="none" // 關閉首字大寫
                    />
                    {/* 錯誤訊息區，僅在表單驗證失敗時渲染顯示 */}
                    {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

                    {/* 密碼輸入框 */}
                    <Text style={styles.label}>密碼</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="請輸入密碼"
                        secureTextEntry={true} // 🔒 變成圓點點
                    />

                    {/* 登入按鈕 */}
                    <TouchableOpacity
                        // 如果 isValid 是 false，就用 disabledButton 的樣式
                        style={[styles.button, isValid ? null : styles.disabledButton]}
                        disabled={!isValid} // 如果驗證沒過，禁止點擊
                        onPress={() => Alert.alert('登入成功', `歡迎 ${email}`)}
                    >
                        <Text style={styles.buttonText}>登入</Text>
                    </TouchableOpacity>
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
        minHeight: 200,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 25,
        textAlign: 'center',
        color: '#333',
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        color: '#666',
        fontWeight: '600',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 10,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    inputError: {
        borderColor: '#ff4d4f', // 錯誤時邊框變紅
        backgroundColor: '#fff2f0',
    },
    errorText: {
        color: '#ff4d4f',
        fontSize: 14,
        marginBottom: 10,
        fontWeight: '500',
    },
    button: {
        backgroundColor: '#007AFF', // 亮藍色
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    disabledButton: {
        backgroundColor: '#ccc', // 灰色
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
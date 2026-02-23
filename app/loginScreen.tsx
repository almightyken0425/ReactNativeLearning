import { useEffect, useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isValid, setIsValid] = useState(false); // 用來控制按鈕能不能按

    // 🕵️‍♀️ 驗證邏輯：監聽 Email 和 Password
    useEffect(() => {
        // 1. 檢查 Email 格式
        if (email.length > 0 && email.length < 5) {
            setErrorMsg('Email 太短了');
            setIsValid(false);
        } else if (email.length > 0 && !email.includes('@')) {
            setErrorMsg('Email 缺少 @ 符號');
            setIsValid(false);
        } else {
            setErrorMsg(''); // Email 沒問題

            // 2. 只有當 Email 沒錯，且密碼也輸入了，才算驗證通過
            if (email.length >= 5 && password.length > 0) {
                setIsValid(true);
            } else {
                setIsValid(false);
            }
        }
        // 👇 這裡要盯著 email 也要盯著 password，任何一個變動都要重新檢查
    }, [email, password]);

    return (
        <View style={styles.container}>
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
            {/* 錯誤訊息區 (只有在有錯誤時顯示) */}
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#333',
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        color: '#666',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    inputError: {
        borderColor: 'red', // 錯誤時邊框變紅
        backgroundColor: '#fff0f0',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
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
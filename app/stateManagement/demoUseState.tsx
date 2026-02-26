import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function DemoUseStateScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    return (
        <View style={styles.safeArea}>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
                {/* =======================================================
                    💡 狀態解說區
                ======================================================= */}
                <Text style={styles.sectionTitle}>💡 useState 雙向綁定</Text>
                <View style={styles.demoBox}>
                    <Text style={styles.demoText}>
                        <Text style={{ fontWeight: 'bold' }}>• 狀態追蹤：</Text>
                        我們使用 <Text style={styles.codeText}>useState</Text> 來儲存使用者輸入的名字與 Email。
                        隨著你打字，下方藍色的區塊會即時更新文字，這就是「雙向綁定 (Two-way binding)」的效果。
                    </Text>
                </View>

                {/* =======================================================
                    📱 實際展示區
                ======================================================= */}
                <Text style={styles.sectionTitle}>📱 實際運作 Demo</Text>
                <View style={styles.exerciseBox}>
                    <Text style={styles.title}>會員資料設定</Text>

                    <Text style={styles.label}>姓名</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="請輸入姓名"
                    />

                    <Text style={styles.label}>電子郵件</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="請輸入 Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    {/* 即時預覽區 */}
                    <View style={styles.previewBox}>
                        <Text style={styles.previewText}>哈囉！ {name ? name : '(請輸入姓名)'}</Text>
                        <Text style={styles.previewText}>你的信箱是 {email ? email : '(請輸入 Email)'}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => Alert.alert('設定成功', `歡迎 ${name}!`)}
                    >
                        <Text style={styles.buttonText}>送出</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F9F8F4' },
    container: { flex: 1, padding: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#8B7355', marginTop: 10, marginBottom: 15 },
    demoBox: { backgroundColor: '#FFFFFF', padding: 15, borderRadius: 12, marginBottom: 25, shadowColor: '#8B7355', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    demoText: { fontSize: 14, color: '#7F8C8D', lineHeight: 22 },
    codeText: { fontFamily: 'monospace', backgroundColor: '#F5F5F3', paddingHorizontal: 4, borderRadius: 4, color: '#8B7355' },
    exerciseBox: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12, minHeight: 200, shadowColor: '#8B7355', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 25, textAlign: 'center', color: '#2C3E50' },
    label: { marginBottom: 5, fontSize: 16, color: '#95A5A6', fontWeight: '600' },
    input: { height: 50, borderColor: '#EAE6DF', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, fontSize: 16, backgroundColor: '#F9F8F4' },
    previewBox: { backgroundColor: '#F5F5F3', padding: 15, borderRadius: 8, marginTop: 10, marginBottom: 20, borderWidth: 1, borderColor: '#EAE6DF' },
    previewText: { fontSize: 16, color: '#2C3E50', marginBottom: 5 },
    button: { backgroundColor: '#8B7355', height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
    buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

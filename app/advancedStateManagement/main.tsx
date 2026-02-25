import { router } from 'expo-router';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 引入拆分出去的模組
import { ThemeContext } from './context/ThemeContext';

export default function AdvancedStateManagementScreen() {
    // ==========================================
    // 🌍 拔掉本地的 useState，改向頂層 Context 拿資料
    // ==========================================
    // 注意：原本寫在這邊的 const [theme, setTheme] = useState... 已經被我們搬到 _layout.tsx 當源頭了。
    // 這個畫面現在變成「單純的接收端」，只負責用 useContext 把 theme 跟 setTheme 抓下來用。
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    return (
        <View style={[styles.safeArea, isDark ? styles.darkBg : styles.lightBg]}>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
                <Text style={[styles.headerTitle, isDark ? styles.darkText : styles.lightText]}>
                    百科 6: 全域狀態與自訂 Hooks
                </Text>

                {/* =======================================================
                    💡 什麼是 Hook？
                ======================================================= */}
                <Text style={[styles.sectionTitle, isDark ? styles.darkAccent : styles.lightAccent]}>
                    💡 解謎：Hook 到底是什麼？
                </Text>
                <View style={[styles.demoBox, isDark ? styles.darkCard : styles.lightCard]}>
                    <Text style={[styles.demoText, isDark ? styles.darkDesc : styles.lightDesc]}>
                        <Text style={{ fontWeight: 'bold' }}>
                            • Hook (鉤子) 的白話文：
                        </Text>
                        在 React 的世界裡，元件本來只是單純在畫畫的「無靈魂空殼」。
                        如果元件需要「記住東西 (State)」，或者需要「跟系統底層互動 (Effect/Context)」，
                        我們就會用這些以
                        <Text style={styles.codeText}>
                            use
                        </Text>
                        開頭的奇妙函式。
                        {'\n\n'}
                        為什麼叫 Hook？因為它就像是一根「鉤子」，**把 React 底層強大的生命週期與狀態管理能力，硬生生地「鉤」進了我們這間平凡的元件小房間裡。**
                    </Text>
                </View>

                {/* =======================================================
                    💡 useState
                ======================================================= */}
                <Text style={[styles.sectionTitle, isDark ? styles.darkAccent : styles.lightAccent]}>💡 useState：給元件記憶</Text>
                <View style={[styles.demoBox, isDark ? styles.darkCard : styles.lightCard]}>
                    <Text style={[styles.demoText, isDark ? styles.darkDesc : styles.lightDesc]}>
                        <Text style={{ fontWeight: 'bold' }}>• 狀態追蹤：</Text>
                        我們使用 <Text style={styles.codeText}>useState</Text> 來儲存使用者輸入的內容，或是可以被改變的資料。
                        點擊下方按鈕，了解如何透過狀態讓畫面隨之產生變化。
                    </Text>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: isDark ? '#007AFF' : '#007AFF' }]}
                        onPress={() => router.push("/advancedStateManagement/demoUseState" as any)}
                    >
                        <Text style={styles.buttonText}>➡ 前往 useState 範例</Text>
                    </TouchableOpacity>
                </View>

                {/* =======================================================
                    💡 useEffect
                ======================================================= */}
                <Text style={[styles.sectionTitle, isDark ? styles.darkAccent : styles.lightAccent]}>💡 useEffect：副作用檢測</Text>
                <View style={[styles.demoBox, isDark ? styles.darkCard : styles.lightCard]}>
                    <Text style={[styles.demoText, isDark ? styles.darkDesc : styles.lightDesc]}>
                        <Text style={{ fontWeight: 'bold' }}>• 生命週期與依賴：</Text>
                        當特定資料改變時，我們可能需要做額外的「檢查」或「呼叫 API」。這時候就可以使用 <Text style={styles.codeText}>useEffect</Text> 來監聽變化，讓他自動發動攻擊！
                    </Text>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: isDark ? '#FF9800' : '#FF9800' }]}
                        onPress={() => router.push("/advancedStateManagement/demoUseEffect" as any)}
                    >
                        <Text style={styles.buttonText}>➡ 前往 useEffect 範例</Text>
                    </TouchableOpacity>
                </View>

                {/* =======================================================
                    💡 Context API 跨檔廣播示範
                ======================================================= */}
                <Text style={[styles.sectionTitle, isDark ? styles.darkAccent : styles.lightAccent]}>💡 useContext：跨畫面傳送門</Text>
                <View style={[styles.demoBox, isDark ? styles.darkCard : styles.lightCard]}>
                    <Text style={[styles.demoText, isDark ? styles.darkDesc : styles.lightDesc]}>
                        <Text style={{ fontWeight: 'bold' }}>• 為什麼不能只用 useState 來做全域主題設定？</Text>
                        {'\n'}
                        如果你在每個畫面自己寫 `const [theme] = useState('light')`，下場就是每個頁面都各有各的電燈開關。
                        如果要同步？你必須把開關透過屬性 (Props) 傳來傳去，或是寫像下面這樣噁心的監聽碼：
                        {'\n\n'}
                        <Text style={[styles.codeText, { fontSize: 12 }]}>
                            // 各頁面痛苦的監聽地獄{'\n'}
                            useEffect(() ={'>'} {'{\n'}
                            {'  '}ThemeEventBus.addListener('change', newTheme ={'>'} {'{\n'}
                            {'    '}setLocalTheme(newTheme);{'\n'}
                            {'  }'});{'\n'}
                            {'}'}, []);
                        </Text>
                        {'\n\n'}
                        <Text style={{ fontWeight: 'bold' }}>• 解法：把開關拉到 _layout.tsx_</Text>
                        我們把 ThemeProvider 寫在 _layout.tsx。現在，你只要點擊下方按鈕去「設定頁面」修改主題，
                        修改完按返回時，你會發現這個首頁已經**瞬間變色**，不需要寫任何額外的監聽邏輯！
                    </Text>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: isDark ? '#BB86FC' : '#9C27B0' }]}
                        onPress={() => router.push("/advancedStateManagement/demoUseContext" as any)}
                    >
                        <Text style={styles.buttonText}>➡ 前往設定頁切換主題</Text>
                    </TouchableOpacity>
                </View>




                {/* =======================================================
                    💡 useReducer：複雜狀態機 (拆分至獨立畫面)
                ======================================================= */}
                <Text style={[styles.sectionTitle, isDark ? styles.darkAccent : styles.lightAccent]}>💡 useReducer：集中管理複雜狀態</Text>
                <View style={[styles.demoBox, isDark ? styles.darkCard : styles.lightCard]}>
                    <Text style={[styles.demoText, isDark ? styles.darkDesc : styles.lightDesc]}>
                        我們將這個較為複雜的觀念獨立成了一個專屬的畫面，點擊下方按鈕前往查看 useReducer 的購物車範例吧！
                    </Text>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: isDark ? '#BB86FC' : '#9C27B0' }]}
                        onPress={() => router.push("/advancedStateManagement/demoUseReducer" as any)}
                    >
                        <Text style={styles.buttonText}>➡ 前往 useReducer 範例</Text>
                    </TouchableOpacity>
                </View>

                {/* =======================================================
                    💡 Custom Hooks (拆分至獨立畫面)
                ======================================================= */}
                <Text style={[styles.sectionTitle, isDark ? styles.darkAccent : styles.lightAccent]}>💡 Custom Hooks：自訂鉤子</Text>
                <View style={[styles.demoBox, isDark ? styles.darkCard : styles.lightCard]}>
                    <Text style={[styles.demoText, isDark ? styles.darkDesc : styles.lightDesc]}>
                        我們將自訂鉤子的觀念獨立成了一個專屬的畫面，點擊下方按鈕前往查看 Custom Hook 的計數器範例吧！
                    </Text>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: isDark ? '#BB86FC' : '#9C27B0' }]}
                        onPress={() => router.push("/advancedStateManagement/demoUseCustomHook" as any)}
                    >
                        <Text style={styles.buttonText}>➡ 前往 Custom Hook 範例</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView >
        </View >
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    lightBg: { backgroundColor: '#eef2f5' },
    darkBg: { backgroundColor: '#121212' },
    container: { flex: 1, padding: 20 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', marginVertical: 20, textAlign: 'center' },
    lightText: { color: '#333' },
    darkText: { color: '#fff' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 15 },
    lightAccent: { color: '#007AFF' },
    darkAccent: { color: '#BB86FC' },
    demoBox: { padding: 20, borderRadius: 12, marginBottom: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    lightCard: { backgroundColor: '#fff' },
    darkCard: { backgroundColor: '#1e1e1e' },
    demoText: { fontSize: 14, lineHeight: 22 },
    lightDesc: { color: '#555' },
    darkDesc: { color: '#aaa' },
    codeText: { fontFamily: 'monospace', backgroundColor: 'rgba(150,150,150,0.2)', paddingHorizontal: 4, borderRadius: 4, color: '#E91E63' },
    dataText: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    button: { height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 15 },
    buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    flex1: { flex: 1 }
});

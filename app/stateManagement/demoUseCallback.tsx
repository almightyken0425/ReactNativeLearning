import React, { memo, useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

// =======================================================
// 🧩 巨大且渲染昂貴的子元件
// =======================================================
// 我們先用 React.memo 包裝這個元件（否則即使 useCallback 穩定了參考，父元件渲染時子元件還是會被拖下水）
const HeavyButton = memo(({ onPress, title, isDark }: { onPress: () => void, title: string, isDark: boolean }) => {
    // 每次這個元件重新渲染時，我們故意印出 log 讓我們知道防護罩破了
    console.log(`[重新渲染] 子元件: ${title}`);

    // 模擬渲染很慢的子元件
    let sum = 0;
    for (let j = 0; j < 5000000; j++) sum += j;

    return (
        <TouchableOpacity
            style={[styles.heavyButton, isDark ? styles.heavyDark : styles.heavyLight]}
            onPress={onPress}
        >
            <Text style={[styles.heavyBtnText, isDark ? styles.darkText : styles.lightText]}>{title}</Text>
        </TouchableOpacity>
    );
});


export default function DemoUseCallbackScreen() {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // =======================================================
    // 💡 關鍵差異：有無使用 useCallback 
    // =======================================================

    // 🔴 [不良示範] 未防護的函式
    // 只要父元件重新渲染 (例如切換深色模式或按任何按鈕)，這個函式就會被「重新宣告」。
    // 重新宣告 = 產生新的記憶體位址 = 傳給子元件的 Props 變了 = 子元件的 React.memo 防護罩被擊穿！
    const handleUnstableClick = () => {
        setCount1(c => c + 1);
    };

    // 🟢 [良好示範] 受防護的函式
    // 透過 useCallback，React 會將這個函式的記憶體位址鎖死。
    // 由於依賴陣列是空的 []，這個函式的參考永遠不會變。
    // (注意內部使用 setCount2(c => c + 1) 的函式更新寫法，所以不需要依賴 count2)
    const handleStableClick = useCallback(() => {
        setCount2(c => c + 1);
    }, []);

    return (
        <View style={[styles.safeArea, isDarkMode ? styles.darkBg : styles.lightBg]}>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
                {/* 說明區塊 */}
                <Text style={[styles.sectionTitle, isDarkMode ? styles.darkText : styles.lightText]}>
                    💡 useCallback：穩定函式參考
                </Text>
                <View style={[styles.demoBox, isDarkMode ? styles.darkCard : styles.lightCard]}>
                    <Text style={[styles.demoText, isDarkMode ? styles.darkDesc : styles.lightDesc]}>
                        <Text style={{ fontWeight: 'bold' }}>• 破壞防護罩的元兇：</Text>
                        切換下方的「深色模式」或是點擊按鈕。你會發現點擊左側「未受保護」的按鈕時，會有明顯卡頓 (詳見終端機 Log)。這是因為父元件重繪時，重新宣告了函式，導致子元件的 <Text style={styles.codeText}>React.memo</Text> 誤以為收到了新的 Props 而跟著重繪。
                        {'\n\n'}
                        <Text style={{ fontWeight: 'bold' }}>• 鎖定記憶體位址：</Text>
                        右側按鈕傳入的是具備 <Text style={styles.codeText}>useCallback</Text> 保護的函式，它的記憶體位址被固定住了。即使父元件重繪，傳給子元件的 Props 參考仍然一模一樣，完美防禦了無謂的連鎖渲染！
                    </Text>
                </View>

                {/* 狀態切換與顯示 */}
                <View style={styles.topControls}>
                    <View style={styles.switchRow}>
                        <Text style={isDarkMode ? styles.darkText : styles.lightText}>切換無關狀態 (深色模式)</Text>
                        <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
                    </View>
                </View>

                {/* 互動展示 */}
                <View style={styles.row}>
                    <View style={[styles.col, isDarkMode ? styles.darkCard : styles.lightCard]}>
                        <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>🔴 未受保護 (每次重建)</Text>
                        <Text style={[styles.countText, isDarkMode ? styles.darkText : styles.lightText]}>計數: {count1}</Text>
                        {/* 這裡傳入的是沒被 useCallback 保護的函式 */}
                        <HeavyButton title="+1 (會卡頓)" onPress={handleUnstableClick} isDark={isDarkMode} />
                    </View>

                    <View style={[styles.col, isDarkMode ? styles.darkCard : styles.lightCard]}>
                        <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>🟢 受 useCallback 保護</Text>
                        <Text style={[styles.countText, isDarkMode ? styles.darkText : styles.lightText]}>計數: {count2}</Text>
                        {/* 這裡傳入的是穩定的函式參考 */}
                        <HeavyButton title="+1 (很順暢)" onPress={handleStableClick} isDark={isDarkMode} />
                    </View>
                </View>

                <View style={[styles.hintBox, isDarkMode ? styles.darkCard : styles.lightCard]}>
                    <Text style={[styles.demoText, isDarkMode ? styles.darkDesc : styles.lightDesc]}>
                        ⚠️ 提示：請打開終端機 (Terminal) 觀察 Console 輸出。當你點擊深色模式時，只有左邊的按鈕會觸發重新渲染！
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    lightBg: {
        backgroundColor: '#F9F8F4'
    },
    darkBg: {
        backgroundColor: '#121212'
    },
    container: {
        flex: 1,
        padding: 20
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 15
    },
    lightText: {
        color: '#2C3E50'
    },
    darkText: {
        color: '#E0E0E0'
    },
    demoBox: {
        padding: 15,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    lightCard: {
        backgroundColor: '#FFFFFF'
    },
    darkCard: {
        backgroundColor: '#1E1E1E'
    },
    demoText: {
        fontSize: 14,
        lineHeight: 22
    },
    lightDesc: {
        color: '#7F8C8D'
    },
    darkDesc: {
        color: '#A0A0A0'
    },
    codeText: {
        fontFamily: 'monospace',
        backgroundColor: '#F5F5F3',
        paddingHorizontal: 4,
        borderRadius: 4,
        color: '#8B7355'
    },
    topControls: {
        marginBottom: 20,
        alignItems: 'center'
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    row: {
        flexDirection: 'row',
        gap: 15
    },
    col: {
        flex: 1,
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)'
    },
    label: {
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center'
    },
    countText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15
    },
    heavyButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center'
    },
    heavyLight: {
        backgroundColor: '#EAE6DF'
    },
    heavyDark: {
        backgroundColor: '#333333'
    },
    heavyBtnText: {
        fontWeight: 'bold'
    },
    hintBox: {
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        backgroundColor: 'rgba(231, 76, 60, 0.1)'
    }
});

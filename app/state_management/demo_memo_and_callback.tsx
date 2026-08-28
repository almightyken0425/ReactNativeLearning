import React, { memo, useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

// =======================================================
// 🧩 巨大且渲染昂貴並戴上防護罩的子元件
// =======================================================
// 這裡我們加上了 `React.memo`，這是一把鎖，它會檢查 Props 有沒有改變
const HeavyButton = memo(({ onPress, title, isDark }: { onPress: () => void, title: string, isDark: boolean }) => {
    // 每次這個元件重新渲染時，我們故意印出 log
    console.log(`重新渲染 🟢 子元件: ${title} 我被重繪了`);

    // 💡 我們用 useEffect 來偵測傳進來的 onPress 記憶體位址有沒有變
    useEffect(() => {
        console.log(`位址檢查 🔑 子元件 ${title} 的 onPress 函式換了一個新的！`);
    }, [onPress]);

    // 模擬渲染很慢的子元件
    let sum = 0;
    for (let j = 0; j < 100000000; j++) sum += j;

    return (
        <TouchableOpacity
            style={[styles.heavyButton, isDark ? styles.heavyDark : styles.heavyLight]}
            onPress={onPress}
        >
            <Text style={[styles.heavyBtnText, isDark ? styles.darkText : styles.lightText]}>{title}</Text>
        </TouchableOpacity>
    );
});


export default function DemoMemoAndCallbackScreen() {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // =======================================================
    // 💡 關鍵差異：父元件給子元件的「鑰匙」
    // =======================================================

    // 🔴 未防護且會變動參考的函式
    // 只要父元件重新渲染，這個函式就會換一個新的記憶體位址。
    // 子元件的 React.memo 收到了新鑰匙，以為 Props 改變了，防護罩直接被擊穿！
    const handleUnstableClick = () => {
        setCount1(c => c + 1);
    };

    // 🟢 穩定參考並完美防禦的函式
    // 透過 useCallback，把函式記憶體位址鎖死。
    // 子元件的 React.memo 檢查發現鑰匙沒變，防護罩成功擋下重繪！
    const handleStableClick = useCallback(() => {
        setCount2(c => c + 1);
    }, []);

    return (
        <View
            style={[
                styles.safeArea,
                isDarkMode ? styles.darkBg : styles.lightBg
            ]}
        >
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 50 }}
            >
                {/* 說明區塊 */}
                <Text
                    style={[
                        styles.sectionTitle,
                        isDarkMode ? styles.darkText : styles.lightText
                    ]}
                >
                    💡 三部曲：完美結合雙劍合璧
                </Text>

                <View
                    style={[
                        styles.demoBox,
                        isDarkMode ? styles.darkCard : styles.lightCard
                    ]}
                >
                    <Text
                        style={[
                            styles.demoText,
                            isDarkMode ? styles.darkDesc : styles.lightDesc
                        ]}
                    >
                        <Text style={{ fontWeight: 'bold' }}>• 探戈需要兩個人跳：</Text>
                        {'\n'}
                        在這個畫面中，下方的子元件
                        <Text style={{ fontWeight: 'bold', color: '#4CAF50' }}>皆有實作 React.memo 擔任防護鎖</Text>。
                        {'\n\n'}

                        <Text style={{ fontWeight: 'bold' }}>• 擊穿防護的地方：</Text>
                        {'\n'}
                        當切換深色模式時，左側的按鈕依然會卡頓重繪，因為它傳入的
                        <Text style={styles.codeText}>onPress</Text>
                        是一把會變動即未受 useCallback 保護的鑰匙。當防護鎖發現變動後即觸發重繪。
                        {'\n\n'}

                        <Text style={{ fontWeight: 'bold' }}>• 完美防禦的地方：</Text>
                        {'\n'}
                        右側的按鈕傳入了受 <Text style={styles.codeText}>useCallback</Text> 保護的函式也就是不變的鑰匙。
                        防護鎖檢查發現參考位址並未改變，故成功跳過重繪！此即 React 框架中最高級的組件防禦法！
                    </Text>
                </View>

                {/* 狀態切換 */}
                <View style={styles.topControls}>
                    <View style={styles.switchRow}>
                        <Text style={isDarkMode ? styles.darkText : styles.lightText}>
                            切換無關之深色模式狀態
                        </Text>
                        <Switch
                            value={isDarkMode}
                            onValueChange={setIsDarkMode}
                        />
                    </View>
                </View>

                {/* 互動展示 */}
                <View style={styles.row}>
                    <View
                        style={[
                            styles.col,
                            isDarkMode ? styles.darkCard : styles.lightCard
                        ]}
                    >
                        <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>
                            🔴 僅有防護鎖而無穩定鑰匙
                        </Text>
                        <Text style={[styles.countText, isDarkMode ? styles.darkText : styles.lightText]}>
                            計數: {count1}
                        </Text>

                        {/* 這裡防護罩被變動的函式位址給破壞了 */}
                        <HeavyButton
                            title="防護被擊穿之加一操作"
                            onPress={handleUnstableClick}
                            isDark={isDarkMode}
                        />
                    </View>

                    <View
                        style={[
                            styles.col,
                            isDarkMode ? styles.darkCard : styles.lightCard
                        ]}
                    >
                        <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>
                            🟢 兼具防護鎖與穩定鑰匙
                        </Text>
                        <Text style={[styles.countText, isDarkMode ? styles.darkText : styles.lightText]}>
                            計數: {count2}
                        </Text>

                        {/* 雙劍合璧，完美防護 */}
                        <HeavyButton
                            title="完美防禦之加一操作"
                            onPress={handleStableClick}
                            isDark={isDarkMode}
                        />
                    </View>
                </View>

                <View
                    style={[
                        styles.hintBox,
                        isDarkMode ? styles.darkCard : styles.lightCard
                    ]}
                >
                    <Text style={[styles.demoText, isDarkMode ? styles.darkDesc : styles.lightDesc]}>
                        ⚠️ 提示：打開終端機並切換深色模式。
                        你會發現左側組件不斷印出位址檢查與重新渲染，
                        而右側組件則安靜無聲不產生任何日誌，完美跳過無謂的渲染！
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

import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

// =======================================================
// 🧩 巨大且渲染昂貴的子元件
// =======================================================
// 我們這裡刻意不使用 React.memo 包裝這個元件
// 讓大家看看，就算用了 useCallback，如果沒有 React.memo 盾牌，子元件還是會被拖下水重繪！
const HeavyButton = ({ onPress, title, isDark }: { onPress: () => void, title: string, isDark: boolean }) => {
    // 每次這個元件重新渲染時，我們故意印出 log 讓我們知道防護罩破了
    console.log(`重新渲染 💔 子元件: ${title} 因為沒有 React.memo，我還是重繪了`);

    // 💡 關鍵偵測：我們用 useEffect 來偵測傳進來的 onPress 記憶體位址有沒有變
    useEffect(() => {
        console.log(`位址檢查 🔑 子元件 ${title} 的 onPress 函式換了一個新的並改變了記憶體位址！`);
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
};


export default function DemoUseCallbackScreen() {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // =======================================================
    // 💡 關鍵差異：有無使用 useCallback 
    // =======================================================

    // 🔴 未防護的函式
    // 只要父元件重新渲染，例如切換深色模式或按任何按鈕，這個函式就會被重新宣告。
    // 重新宣告等同於產生新的記憶體位址，也代表傳給子元件的屬性改變了，子元件的 React.memo 防護罩即被擊穿！
    const handleUnstableClick = () => {
        setCount1(c => c + 1);
    };

    // 🟢 受防護的函式
    // 透過 useCallback，React 會將這個函式的記憶體位址鎖死。
    // 由於依賴陣列是空的 []，這個函式的參考永遠不會變。
    // 注意內部使用更新計數狀態的函式寫法，因此不需要依賴現有的計數狀態
    const handleStableClick = useCallback(() => {
        setCount2(c => c + 1);
    }, []);

    return (
        <View style={[styles.safeArea, isDarkMode ? styles.darkBg : styles.lightBg]}>
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
                    💡 二部曲：useCallback 穩定函式參考
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
                        <Text style={{ fontWeight: 'bold' }}>• 殘酷的真相：</Text>
                        {'\n'}
                        在這個畫面中，下方的子元件
                        <Text style={{ fontWeight: 'bold', color: '#E74C3C' }}>沒有加上 React.memo 防護罩</Text>。
                        當你切換深色模式時，兩個按鈕<Text style={{ fontWeight: 'bold' }}>都會卡頓並重新渲染</Text>！
                        {'\n\n'}

                        <Text style={{ fontWeight: 'bold' }}>• 那 useCallback 在幹嘛？請仔細觀察終端機會發現：</Text>
                        {'\n'}
                        雖然兩個都重繪了，但觀察終端機：
                        {'\n'}1. 🔴 左邊未受保護的按鈕，傳入的函式一直被當作新的生命週期物件，所以會印出位址檢查。
                        {'\n'}2. 🟢 右邊雖然也被拖下水重繪，但它收到的函式參考是穩固的，
                        <Text style={{ fontWeight: 'bold' }}>沒有印出位址改變</Text>！
                        {'\n\n'}

                        <Text style={{ fontWeight: 'bold', color: '#8B7355' }}>
                            小結：useCallback 是一把絕對不變的鑰匙，
                            但如果子元件沒有實作 React.memo 當作防護鎖，鑰匙再穩固也是白搭。兩者必須互相搭配！
                        </Text>
                    </Text>
                </View>

                {/* 狀態切換與顯示 */}
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
                            🔴 未受保護每次皆重建
                        </Text>
                        <Text style={[styles.countText, isDarkMode ? styles.darkText : styles.lightText]}>
                            計數: {count1}
                        </Text>

                        {/* 這裡傳入的是沒被 useCallback 保護的函式 */}
                        <HeavyButton
                            title="受卡頓影響之按鈕"
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
                            🟢 受 useCallback 保護
                        </Text>
                        <Text style={[styles.countText, isDarkMode ? styles.darkText : styles.lightText]}>
                            計數: {count2}
                        </Text>

                        {/* 這裡傳入的是穩定的函式參考 */}
                        <HeavyButton
                            title="順暢無比之按鈕"
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
                        ⚠️ 提示：請打開終端機。切換深色模式時，
                        你會發現兩個子元件都印出重新渲染，但只有左邊 🔴 按鈕會印出位址檢查，
                        這證明了右邊 🟢 拿到的是穩定不變的函式。
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

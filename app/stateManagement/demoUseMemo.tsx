import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

// 模擬高耗時運算：找出 1 到 max 之間的所有質數
const calculatePrimes = (max: number) => {
    console.log(`[耗時運算執行中] 正在計算 1 到 ${max} 之間的質數...`);

    // 故意增加延遲感 (模擬更複雜的運算)
    let sum = 0;
    for (let j = 0; j < 5000000; j++) {
        sum += j; // 廢代碼，用來拖慢時間
    }

    const primes = [];
    for (let i = 2; i <= max; i++) {
        let isPrime = true;
        for (let j = 2; Math.pow(j, 2) <= i; j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) primes.push(i);
    }
    return primes;
};

export default function DemoUseMemoScreen() {
    const [count, setCount] = useState(0);
    const [range, setRange] = useState(100);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // =======================================================
    // 💡 關鍵差異：有無使用 useMemo 
    // =======================================================

    // 🔴 [不良示範] 每次元件重新渲染 (例如切換深色模式或點擊計數器) 都會重跑
    // 註解掉下方這行來體驗卡頓：
    // const primes = calculatePrimes(range);

    // 🟢 [良好示範] 只有當 range 改變時，才會重新計算質數
    const primes = useMemo(() => {
        return calculatePrimes(range);
    }, [range]); // <-- 依賴陣列：只有 range 改變時才重算

    return (
        <View style={[styles.safeArea, isDarkMode ? styles.darkBg : styles.lightBg]}>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
                {/* 說明區塊 */}
                <Text style={[styles.sectionTitle, isDarkMode ? styles.darkText : styles.lightText]}>
                    💡 useMemo：記憶耗時運算
                </Text>
                <View style={[styles.demoBox, isDarkMode ? styles.darkCard : styles.lightCard]}>
                    <Text style={[styles.demoText, isDarkMode ? styles.darkDesc : styles.lightDesc]}>
                        <Text style={{ fontWeight: 'bold' }}>• 實驗一 (無關狀態更新)：</Text>
                        點擊下方的「一般計數器」或「切換深色模式」。因為我們使用了 <Text style={styles.codeText}>useMemo</Text>，質數運算不會被觸發，畫面瞬間更新。
                        {'\n\n'}
                        <Text style={{ fontWeight: 'bold' }}>• 實驗二 (依賴變數更新)：</Text>
                        點擊「增加運算範圍」。因為運算範圍改變了，React 知道舊的快取已失效，此時才會重新執行耗時運算，你會感受到明顯的卡頓。
                    </Text>
                </View>

                {/* 互動控制區塊 */}
                <View style={[styles.controlBox, isDarkMode ? styles.darkCard : styles.lightCard]}>
                    {/* 1. 無關緊要的狀態 (不應該卡頓) */}
                    <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>無關狀態測試 (應該要很順暢)</Text>

                    <View style={styles.row}>
                        <TouchableOpacity style={styles.button} onPress={() => setCount(c => c + 1)}>
                            <Text style={styles.buttonText}>一般計數器: {count}</Text>
                        </TouchableOpacity>

                        <View style={styles.switchRow}>
                            <Text style={isDarkMode ? styles.darkText : styles.lightText}>深色模式</Text>
                            <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* 2. 相關的狀態 (才會觸發重新計算並卡頓) */}
                    <Text style={[styles.label, isDarkMode ? styles.darkText : styles.lightText]}>依賴狀態測試 (會引發卡頓)</Text>
                    <TouchableOpacity
                        style={[styles.button, styles.dangerButton]}
                        onPress={() => setRange(r => r + 10)}
                    >
                        <Text style={styles.buttonText}>增加質數範圍 (目前: 1~{range})</Text>
                    </TouchableOpacity>
                </View>

                {/* 結果顯示區塊 */}
                <View style={[styles.resultBox, isDarkMode ? styles.darkCard : styles.lightCard]}>
                    <Text style={[styles.resultTitle, isDarkMode ? styles.darkText : styles.lightText]}>
                        運算結果：找到 {primes.length} 個質數
                    </Text>
                    <Text style={[styles.resultData, isDarkMode ? styles.darkDesc : styles.lightDesc]} numberOfLines={5}>
                        {primes.join(', ')} ...
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
    controlBox: {
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)'
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    button: {
        backgroundColor: '#8B7355',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        flex: 1,
        marginRight: 10,
        alignItems: 'center'
    },
    dangerButton: {
        backgroundColor: '#E74C3C',
        flex: 0,
        marginRight: 0
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginVertical: 15
    },
    resultBox: {
        padding: 15,
        borderRadius: 12,
        backgroundColor: 'rgba(139, 115, 85, 0.1)'
    },
    resultTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    resultData: {
        fontSize: 14,
        lineHeight: 20
    },
});

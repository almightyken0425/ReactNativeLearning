import React, { memo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// =======================================================
// 🧩 一般的子元件 (只要父元件渲染，它一律陪葬)
// =======================================================
const NormalChild = ({ text }: { text: string }) => {
    console.log('[重繪] 🔴 NormalChild 被渲染了');
    return (
        <View style={[styles.childBox, styles.normalBox]}>
            <Text style={styles.childTitle}>🔴 普通元件</Text>
            <Text style={styles.childText}>文字內容: {text}</Text>
            <Text style={styles.childDesc}>(父層只要更新，我就一定會重繪)</Text>
        </View>
    );
};

// =======================================================
// 🧩 鑲上 React.memo 的裝甲子元件
// =======================================================
// 只有當 Props (這裡的 text) 真正改變時，它才會重新渲染
const MemoizedChild = memo(({ text }: { text: string }) => {
    console.log('[重繪] 🟢 MemoizedChild 被渲染了');
    return (
        <View style={[styles.childBox, styles.memoBox]}>
            <Text style={styles.childTitle}>🟢 Memo 元件</Text>
            <Text style={styles.childText}>文字內容: {text}</Text>
            <Text style={styles.childDesc}>(只有我的 Props 改變時才重繪)</Text>
        </View>
    );
});

export default function DemoReactMemoScreen() {
    // 父元件的兩個狀態
    // 1. 父元件專屬的計數器 (跟子元件無關)
    const [clickCount, setClickCount] = useState(0);
    // 2. 要傳給子元件的文字
    const [childText, setChildText] = useState('哈囉 React!');

    return (
        <View style={styles.safeArea}>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
                {/* 說明區塊 */}
                <Text style={styles.sectionTitle}>💡 React.memo：子元件防護罩</Text>
                <View style={styles.demoBox}>
                    <Text style={styles.demoText}>
                        當我們在父元件(也就是目前這個畫面)中更新狀態時，React 預設會「順便」將底下所有的子孫元件全部重新渲染一次。
                        {'\n\n'}
                        <Text style={{ fontWeight: 'bold' }}>• 實驗一：</Text>
                        點擊下方的「增加父層數字」，這會更新父層狀態。你會發現左下方的「🔴 普通元件」因為連帶關係被迫重繪 (看 Console Log)，即使傳給它的文字沒變！而右下方的「🟢 Memo 元件」則成功擋下了無效渲染。
                        {'\n\n'}
                        <Text style={{ fontWeight: 'bold' }}>• 實驗二：</Text>
                        在輸入框打字改變送給子元件的字串。此時屬性真的改變了，所以兩個子元件都會乖乖重繪。
                    </Text>
                </View>

                {/* 父元件控制區塊 */}
                <View style={styles.parentBox}>
                    <Text style={styles.parentTitle}>🏠 這裡是父元件</Text>

                    <View style={styles.controlRow}>
                        <View style={{ flex: 1, marginRight: 15 }}>
                            <Text style={styles.label}>1. 跟子層無關的內部狀態</Text>
                            <TouchableOpacity style={styles.button} onPress={() => setClickCount(c => c + 1)}>
                                <Text style={styles.buttonText}>增加父層數字: {clickCount}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={styles.label}>2. 要傳給子層的 Props</Text>
                            <TextInput
                                style={styles.input}
                                value={childText}
                                onChangeText={setChildText}
                            />
                        </View>
                    </View>
                    <Text style={styles.hintText}>試著點擊左邊按鈕，觀察 Console Log 看看下方誰被連累了！</Text>
                </View>

                {/* 子元件展示區塊 */}
                <View style={styles.childrenContainer}>
                    {/* 傳入相同的 Props */}
                    <NormalChild text={childText} />
                    <MemoizedChild text={childText} />
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F9F8F4' },
    container: { flex: 1, padding: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#8B7355', marginTop: 10, marginBottom: 15 },
    demoBox: { backgroundColor: '#FFFFFF', padding: 15, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    demoText: { fontSize: 14, color: '#7F8C8D', lineHeight: 22 },
    parentBox: { backgroundColor: '#EAE6DF', padding: 20, borderRadius: 12, marginBottom: 20 },
    parentTitle: { fontSize: 18, fontWeight: 'bold', color: '#34495E', marginBottom: 15, textAlign: 'center' },
    controlRow: { flexDirection: 'row', justifyContent: 'space-between' },
    label: { fontSize: 12, color: '#7F8C8D', marginBottom: 8, fontWeight: 'bold' },
    button: { backgroundColor: '#8B7355', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
    input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#D5D0C5', borderRadius: 8, paddingHorizontal: 10, height: 42, fontSize: 14 },
    hintText: { marginTop: 15, fontSize: 12, color: '#E74C3C', textAlign: 'center', fontWeight: 'bold' },
    childrenContainer: { flexDirection: 'row', gap: 10 },
    childBox: { flex: 1, padding: 15, borderRadius: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
    normalBox: { backgroundColor: '#FFEBEE', borderWidth: 1, borderColor: '#FFCDD2' },
    memoBox: { backgroundColor: '#E8F5E9', borderWidth: 1, borderColor: '#C8E6C9' },
    childTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#333' },
    childText: { fontSize: 14, fontWeight: 'bold', color: '#555', marginBottom: 10 },
    childDesc: { fontSize: 11, color: '#888', textAlign: 'center' }
});

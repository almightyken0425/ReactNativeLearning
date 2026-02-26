import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ThemeContext } from './context/ThemeContext';
import { useCounter } from './hooks/useCounter';

export default function CustomHookDemoScreen() {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    // --- Custom Hook State ---
    const counter = useCounter(10);

    return (
        <View style={[styles.safeArea, isDark ? styles.darkBg : styles.lightBg]}>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
                {/* =======================================================
                    💡 Custom Hooks
                ======================================================= */}
                <Text style={[styles.sectionTitle, isDark ? styles.darkAccent : styles.lightAccent]}>💡 Custom Hooks：自訂鉤子</Text>
                <View style={[styles.demoBox, isDark ? styles.darkCard : styles.lightCard]}>
                    <Text style={[styles.demoText, isDark ? styles.darkDesc : styles.lightDesc]}>
                        把 <Text style={styles.codeText}>useState</Text> 邏輯抽離成 <Text style={styles.codeText}>use</Text> 開頭的函式。
                        讓 UI 回歸單純渲染。
                    </Text>

                    <Text style={[styles.dataText, isDark ? styles.darkText : styles.lightText, { marginTop: 15 }]}>自訂計數器 Hook：{counter.count}</Text>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.actionBtn, styles.flex1]} onPress={counter.increment}><Text style={styles.buttonText}>+ 加</Text></TouchableOpacity>
                        <View style={{ width: 10 }} />
                        <TouchableOpacity style={[styles.actionBtn, styles.flex1]} onPress={counter.decrement}><Text style={styles.buttonText}>- 減</Text></TouchableOpacity>
                        <View style={{ width: 10 }} />
                        <TouchableOpacity style={[styles.actionBtn, styles.flex1, { backgroundColor: '#D4C4B7' }]} onPress={counter.reset}><Text style={styles.buttonText}>重置</Text></TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    lightBg: { backgroundColor: '#F9F8F4' },
    darkBg: { backgroundColor: '#121212' },
    container: { flex: 1, padding: 20 },
    lightText: { color: '#2C3E50' },
    darkText: { color: '#fff' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 15 },
    lightAccent: { color: '#8B7355' },
    darkAccent: { color: '#BB86FC' },
    demoBox: { padding: 20, borderRadius: 12, marginBottom: 25, shadowColor: '#8B7355', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    lightCard: { backgroundColor: '#FFFFFF' },
    darkCard: { backgroundColor: '#1e1e1e' },
    demoText: { fontSize: 14, lineHeight: 22 },
    lightDesc: { color: '#7F8C8D' },
    darkDesc: { color: '#aaa' },
    codeText: { fontFamily: 'monospace', backgroundColor: '#F5F5F3', paddingHorizontal: 4, borderRadius: 4, color: '#8B7355' },
    dataText: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    actionBtn: { height: 40, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#8B7355' },
    buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    flex1: { flex: 1 }
});

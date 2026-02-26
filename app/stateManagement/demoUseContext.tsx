import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ThemeContext } from './context/ThemeContext';

export default function SettingsScreen() {
    // 💡 我們直接從 Context 開啟收音機，拿到「設定新主題的遙控器(setTheme)」和「當前主題(theme)」
    const { theme, setTheme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    return (
        <View style={[styles.safeArea, isDark ? styles.darkBg : styles.lightBg]}>

            <ScrollView style={styles.container}>
                <View style={[styles.card, isDark ? styles.darkCard : styles.lightCard]}>
                    <Text style={[styles.cardTitle, isDark ? styles.darkText : styles.lightText]}>
                        外觀主題
                    </Text>
                    <Text style={[styles.desc, isDark ? styles.darkDesc : styles.lightDesc]}>
                        在這裡修改的這個值，因為是透過 useContext 發送到頂層的 Provider，
                        所以當你按返回時，你會發現首頁也已經同步變色了！完全不需要透過路由參數傳遞資料。
                    </Text>

                    <View style={styles.row}>
                        <TouchableOpacity
                            style={[
                                styles.optionBtn,
                                theme === 'light' ? styles.activeLight : styles.inactiveBtn
                            ]}
                            onPress={() => setTheme('light')}
                        >
                            <Text style={[
                                styles.optionText,
                                theme === 'light' ? styles.activeText : styles.inactiveText
                            ]}>
                                淺色模式
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.optionBtn,
                                theme === 'dark' ? styles.activeDark : styles.inactiveBtn
                            ]}
                            onPress={() => setTheme('dark')}
                        >
                            <Text style={[
                                styles.optionText,
                                theme === 'dark' ? styles.activeText : styles.inactiveText
                            ]}>
                                深色模式
                            </Text>
                        </TouchableOpacity>
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

    lightText: { color: '#2C3E50' },
    darkText: { color: '#fff' },
    lightDesc: { color: '#7F8C8D' },
    darkDesc: { color: '#aaa' },
    container: { flex: 1, padding: 20 },
    card: {
        padding: 20,
        borderRadius: 12,
        shadowColor: '#8B7355',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    lightCard: { backgroundColor: '#FFFFFF' },
    darkCard: { backgroundColor: '#1e1e1e' },
    cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    desc: { fontSize: 14, lineHeight: 22, marginBottom: 20 },
    row: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
    optionBtn: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
    inactiveBtn: { backgroundColor: '#EAE6DF' },
    activeLight: { backgroundColor: '#8B7355' },
    activeDark: { backgroundColor: '#BB86FC' },
    optionText: { fontSize: 16, fontWeight: '600' },
    activeText: { color: '#fff' },
    inactiveText: { color: '#95A5A6' }
});

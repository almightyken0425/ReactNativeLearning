import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function IndexMenu() {
    return (
        <ScrollView style={styles.safeArea} contentContainerStyle={styles.scrollContent}>
            <View style={styles.container}>
                <View style={styles.menuSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionLabel}>目錄 CONTENTS</Text>
                        <View style={styles.divider} />
                    </View>

                    <TouchableOpacity style={styles.chapterButton} onPress={() => router.push("/flexboxProfileCard" as any)}>
                        <Text style={styles.chapterNumber}>01</Text>
                        <View style={styles.chapterContent}>
                            <Text style={styles.chapterTitle}>Flexbox 名片排版</Text>
                            <Text style={styles.chapterDesc}>基礎排版實戰</Text>
                        </View>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.chapterButton} onPress={() => router.push("/componentDataFlow" as any)}>
                        <Text style={styles.chapterNumber}>02</Text>
                        <View style={styles.chapterContent}>
                            <Text style={styles.chapterTitle}>元件化與資料</Text>
                            <Text style={styles.chapterDesc}>元件溝通與資料流百科</Text>
                        </View>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.chapterButton} onPress={() => router.push("/typeVsInterface" as any)}>
                        <Text style={styles.chapterNumber}>03</Text>
                        <View style={styles.chapterContent}>
                            <Text style={styles.chapterTitle}>Type 與 Interface</Text>
                            <Text style={styles.chapterDesc}>TypeScript 型別演練</Text>
                        </View>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.chapterButton} onPress={() => router.push("/arrayStateAndStorage" as any)}>
                        <Text style={styles.chapterNumber}>04</Text>
                        <View style={styles.chapterContent}>
                            <Text style={styles.chapterTitle}>陣列操作與資料持久化</Text>
                            <Text style={styles.chapterDesc}>應用狀態儲存百科</Text>
                        </View>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.chapterButton} onPress={() => router.push("/stateManagement/main" as any)}>
                        <Text style={styles.chapterNumber}>05</Text>
                        <View style={styles.chapterContent}>
                            <Text style={styles.chapterTitle}>狀態管理</Text>
                            <Text style={styles.chapterDesc}>進階全局狀態百科</Text>
                        </View>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.chapterButton} onPress={() => router.push("/routingAndDeepLink/main" as any)}>
                        <Text style={styles.chapterNumber}>06</Text>
                        <View style={styles.chapterContent}>
                            <Text style={styles.chapterTitle}>路由與深層連結</Text>
                            <Text style={styles.chapterDesc}>外部喚醒與參數解析</Text>
                        </View>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.chapterButton} onPress={() => router.push("/deviceAdaptation/main" as any)}>
                        <Text style={styles.chapterNumber}>07</Text>
                        <View style={styles.chapterContent}>
                            <Text style={styles.chapterTitle}>行動裝置適配</Text>
                            <Text style={styles.chapterDesc}>FlatList 與鍵盤處理百科</Text>
                        </View>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F9F8F4',
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    container: {
        flex: 1,
        padding: 24,
    },
    menuSection: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 24,
        shadowColor: '#8B7355',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 24,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#EAE6DF',
    },
    sectionHeader: {
        marginBottom: 16,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#8B7355',
        letterSpacing: 3,
        marginBottom: 12,
    },
    divider: {
        height: 2,
        backgroundColor: '#F0EFEB',
        width: '100%',
    },
    chapterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F3',
    },
    chapterNumber: {
        fontSize: 28,
        fontWeight: '300',
        color: '#D4C4B7',
        width: 48,
        fontFamily: 'serif',
    },
    chapterContent: {
        flex: 1,
        justifyContent: 'center',
        paddingRight: 16,
    },
    chapterTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#34495E',
        marginBottom: 6,
    },
    chapterDesc: {
        fontSize: 14,
        color: '#95A5A6',
    },
    arrow: {
        fontSize: 24,
        fontWeight: '300',
        color: '#D4C4B7',
    },
});
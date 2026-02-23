import { router } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function IndexMenu() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.headerTitle}>React Native 學習導覽</Text>

                <View style={styles.menuSection}>
                    <Text style={styles.sectionLabel}>📝 專題與實戰</Text>
                    {/* TS 理論註解 4: as any */}
                    {/* Expo Router 對型別非常龜毛，如果它還沒爬完本地目錄建好路徑型別，就會報錯說 href 不合法。 */}
                    {/* 所以在這個 href 我們加上 'as any' 來暫時繞過嚴格的路由型別檢查。 */}
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#4CAF50', marginBottom: 15 }]}
                        onPress={() => router.push("/expenseTracker" as any)}
                    >
                        <Text style={styles.buttonText}>進入 記帳本 Demo (包含 TS 修正註解)</Text>
                    </TouchableOpacity>

                    {/* 新增: 登入頁面與 useEffect 教學 */}
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#2196F3' }]}
                        onPress={() => router.push("/loginScreen" as any)}
                    >
                        <Text style={styles.buttonText}>進入 登入畫面 Demo (包含 useEffect 教學)</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.menuSection}>
                    <Text style={styles.sectionLabel}>📚 每週練習題</Text>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#FF6347' }]}
                        onPress={() => router.push("/exercise1" as any)}
                    >
                        <Text style={styles.buttonText}>🌟 進入練習題 1: Flexbox 第一張名片</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
        color: '#333'
    },
    menuSection: {
        marginBottom: 30,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionLabel: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
        color: '#555',
    },
    button: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'black',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
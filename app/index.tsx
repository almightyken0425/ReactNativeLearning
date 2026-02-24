import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
                    <Text style={{ color: '#666', marginBottom: 15, fontStyle: 'italic', textAlign: 'center' }}>持續擴增中...</Text>
                </View>

                <View style={styles.menuSection}>
                    <Text style={styles.sectionLabel}>📚 每週練習題與百科</Text>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#FF6347', marginBottom: 15 }]}
                        onPress={() => router.push("/flexboxProfileCard" as any)}
                    >
                        <Text style={styles.buttonText}>🌟 Flexbox 名片排版實戰</Text>
                    </TouchableOpacity>

                    {/* 新增 Exercise 2 */}
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#E91E63', marginBottom: 15 }]}
                        onPress={() => router.push("/componentDataFlow" as any)}
                    >
                        <Text style={styles.buttonText}>🧩 元件化與資料百科演練</Text>
                    </TouchableOpacity>

                    {/* 新增 Exercise 3 */}
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#9C27B0', marginBottom: 15 }]}
                        onPress={() => router.push("/typeVsInterface" as any)}
                    >
                        <Text style={styles.buttonText}>🛡️ Type 與 Interface 型別演練</Text>
                    </TouchableOpacity>

                    {/* 百科系列 */}
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#2196F3', marginBottom: 15 }]}
                        onPress={() => router.push("/stateAndEffectForm" as any)}
                    >
                        <Text style={styles.buttonText}>📖 狀態管理與副作用週期百科</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#4CAF50', marginBottom: 15 }]}
                        onPress={() => router.push("/arrayStateAndStorage" as any)}
                    >
                        <Text style={styles.buttonText}>📖 陣列操作與資料持久化百科</Text>
                    </TouchableOpacity >

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#9C27B0' }]}
                        onPress={() => router.push("/advancedStateManagement" as any)}
                    >
                        <Text style={styles.buttonText}>📖 進階狀態管理百科</Text>
                    </TouchableOpacity >
                </View >

            </View >
        </SafeAreaView >
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
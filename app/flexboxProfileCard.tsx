import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FlexboxProfileCardScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Text style={styles.headerTitle}>進階 Flexbox 版面大全</Text>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>

                <Text style={styles.description}>
                    以下示範了同一種卡片中，將外層容器 cardContainer 改變不同 Flexbox 參數時的效果：
                </Text>

                {/* =======================================================
                    水平置左對齊，最常見的名片版型
                    - flexDirection: row 由左至右
                    - justifyContent: flex-start 主軸水平靠左
                    - alignItems: center 交錯軸垂直置中
                ======================================================= */}
                <Text style={styles.sectionTitle}>row 搭配 flex-start 搭配 center</Text>
                <View style={[styles.cardContainer, { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }]}>
                    <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={styles.avatar} />
                    <View style={styles.infoContainer}>
                        <Text style={styles.nameText}>Ken Chio</Text>
                        <Text style={styles.bioText}>Software Product Manager</Text>
                    </View>
                </View>

                {/* =======================================================
                    垂直置中對齊，適合個人首頁頂端大頭貼
                    - flexDirection: column 由上至下
                    - justifyContent: center 主軸垂直置中
                    - alignItems: center 交錯軸水平置中
                ======================================================= */}
                <Text style={styles.sectionTitle}>column 搭配 center 搭配 center</Text>
                <View style={[styles.cardContainer, { flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }]}>
                    <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={styles.avatar} />
                    {/* 這裡我們不加 marginLeft，改加 marginTop 讓文字往下推 */}
                    <View style={[styles.infoContainer, { marginLeft: 0, marginTop: 10, alignItems: 'center' }]}>
                        <Text style={styles.nameText}>Ken Chio</Text>
                        <Text style={styles.bioText}>Software Product Manager</Text>
                    </View>
                </View>

                {/* =======================================================
                    水平排版，靠右對齊，適用於右側選單或右側通知
                    - flexDirection: row 由左至右
                    - justifyContent: flex-end 主軸水平靠右
                    - alignItems: flex-start 交錯軸垂直貼頂
                ======================================================= */}
                <Text style={styles.sectionTitle}>row 搭配 flex-end 搭配 flex-start</Text>
                <View style={[styles.cardContainer, { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start' }]}>
                    <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={styles.avatar} />
                    <View style={styles.infoContainer}>
                        <Text style={styles.nameText}>Ken Chio</Text>
                        <Text style={styles.bioText}>貼近頂部，且整體靠右</Text>
                    </View>
                </View>

                {/* =======================================================
                    空間平分對齊 space-around
                    - flexDirection: row 由左至右
                    - justifyContent: space-around 主軸元素之間與外側留白
                    - alignItems: center 交錯軸垂直置中
                ======================================================= */}
                <Text style={styles.sectionTitle}>row 搭配 space-around 搭配 center</Text>
                <View style={[styles.cardContainer, { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }]}>
                    <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={styles.avatar} />
                    <View style={styles.infoContainer}>
                        <Text style={styles.nameText}>Ken Chio</Text>
                        <Text style={styles.bioText}>左右留白相同</Text>
                    </View>
                </View>

                {/* =======================================================
                    反向水平對齊 row-reverse
                    - flexDirection: row-reverse 由右至左
                    - justifyContent: space-between 主軸元素靠兩側
                    - alignItems: center 交錯軸垂直置中
                ======================================================= */}
                <Text style={styles.sectionTitle}>row-reverse 搭配 space-between</Text>
                <View style={[styles.cardContainer, { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }]}>
                    <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={styles.avatar} />
                    {/* 文字靠左對齊，消除 marginLeft 改成 marginRight */}
                    <View style={[styles.infoContainer, { marginLeft: 0, marginRight: 15 }]}>
                        <Text style={styles.nameText}>Ken Chio</Text>
                        <Text style={styles.bioText}>這是一張從右至左的卡片</Text>
                    </View>
                </View>

                {/* =======================================================
                    垂直反向 column-reverse
                    - flexDirection: column-reverse 由下至上
                    - justifyContent: flex-end 主軸將元素推向頂部
                    - alignItems: flex-end 交錯軸將元素推向右邊
                ======================================================= */}
                <Text style={styles.sectionTitle}>column-reverse 搭配 flex-end，整體靠右</Text>
                <View style={[styles.cardContainer, { flexDirection: 'column-reverse', justifyContent: 'flex-end', alignItems: 'flex-end', minHeight: 180 }]}>
                    {/* 因為是由下至上排列，所以 HTML 結構在上面的會跑到畫面底部 */}
                    <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={styles.avatar} />
                    <View style={[styles.infoContainer, { marginLeft: 0, marginBottom: 10, alignItems: 'flex-end' }]}>
                        <Text style={styles.nameText}>Ken Chio</Text>
                        <Text style={styles.bioText}>我在大頭貼上面</Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#eef2f5',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
        lineHeight: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#007AFF', // iOS 藍色風格
        marginTop: 15,
        marginBottom: 8,
    },
    cardContainer: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 12, // 圓角大一點比較現代
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        marginBottom: 15,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30, // 圓形頭像
    },
    infoContainer: {
        // 利用 flex: 1 或是直接吃寬度都可以，這裡配合教學不一定要寫死 flex: 1
        marginLeft: 15,
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    bioText: {
        fontSize: 14,
        color: '#666',
    }
});

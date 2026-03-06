import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

// 模擬產生一千筆資料
const DATA = Array.from({ length: 1000 }).map((_, index) => ({
    id: `item_${index}`,
    title: `我是第 ${index + 1} 筆大量測資資料`
}));

type ItemProps = { title: string };

const Item = ({ title }: ItemProps) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

export default function DemoFlatListScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>
                百科 8-1: FlatList 局部渲染實戰
            </Text>

            <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                    下方是一個包含一千筆資料的列表。
                    我們將效能不佳之渲染替換為 FlatList，它只會渲染目前位於畫面上或即將捲動到的少量區塊。
                    {'\n\n'}
                    請注意，我們還設定了唯一鍵值協助底層比對差異。設定 keyExtractor，能讓 React Native 清楚知道哪一列資料新增或被移除了！
                </Text>
            </View>

            <View style={styles.listContainer}>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => <Item title={item.title} />}
                    keyExtractor={item => item.id}
                    initialNumToRender={10}
                    windowSize={5}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F8F4',
        padding: 20
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 16,
        textAlign: 'center'
    },
    infoBox: {
        backgroundColor: '#E8F4F8',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#3498DB'
    },
    infoText: {
        fontSize: 14,
        lineHeight: 22,
        color: '#2C3E50'
    },
    listContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#EAE6DF'
    },
    item: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0EFEB'
    },
    title: {
        fontSize: 16,
        color: '#34495E'
    }
});

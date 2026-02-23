import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function Exercise1Screen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.headerTitle}>練習題 1: 個人名片卡</Text>

                {/* 
          TODO 1: 在下方建立一個 View 作為卡片的外部容器，
          並套用 styles.cardContainer 樣式
        */}


                {/*
          TODO 2: 在卡片容器內加入一張 Image，
          來源網址可以使用 'https://reactnative.dev/img/tiny_logo.png'
          並套用 styles.avatar 樣式
        */}


                {/*
          TODO 3: 在大頭貼右邊加入一個文字區塊容器 (View)
          裡面包含兩行 Text：
          第一行是你的名字，套用 styles.nameText
          第二行是一句簡短的自我介紹，套用 styles.bioText
        */}


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
        // TODO 4: 試著在這裡加上 justifyContent: 'center' 看看整個版面發生了什麼變化？
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333'
    },

    // -------------------------
    // 以下是需要你動手補上 Flexbox 屬性的地方
    // -------------------------
    cardContainer: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        // TODO 5: 目前卡片方向是預設的 column (上下排列)。
        // 請加入正確的 flexDirection 屬性，讓頭像跟文字變成水平 (左右排列)。

        // TODO 6: 加入正確的 alignItems 屬性，讓頭像跟文字在垂直方向上「置中對齊」。

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30, // 圓形頭像
    },
    infoContainer: {
        // TODO 7: 請加入 flex 屬性，讓文字區塊能佔滿剩下的卡片寬度

        // TODO 8: 加上 marginLeft 屬性，讓文字跟左邊的大頭貼保持距離 (例如邊距設定為 15)

    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    bioText: {
        fontSize: 14,
        color: '#666',
    }
});

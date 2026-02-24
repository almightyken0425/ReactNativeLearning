import React from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ==========================================
// 💡 百科全書示範區: 各種 Props 屬性傳遞寫法
// ==========================================

// 這是一個已完成的示範元件，用來展示各種傳入 Props 的方式
type DemoBadgeProps = {
    text: string;           // 必填字串
    isActive?: boolean;     // 選填布林值
    themeColor?: string;    // 選填字串，具備預設值
    onPressAction?: () => void; // 選填函式
};

// 宣告元件時將 Props 解構並設定預設值
const DemoBadge = ({ text, isActive = false, themeColor = '#888', onPressAction }: DemoBadgeProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.badge,
                { borderColor: themeColor, backgroundColor: isActive ? themeColor : 'transparent' }
            ]}
            onPress={onPressAction}
            disabled={!onPressAction} // 如果沒傳參數進來，就不允許點擊
        >
            <Text style={{ color: isActive ? '#fff' : themeColor, fontWeight: 'bold', fontSize: 12 }}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

// ==========================================
// 🧩 練習：實作共用按鈕 CustomButton 元件
// ==========================================

// 待辦：為 CustomButton 定義 Props 型別
// TypeScript 中可以這樣定義：
type CustomButtonProps = {
    title: string;
    onPress: () => void;
    color?: string; // 選填
};
const CustomButton = ({ title, onPress, color = '#2196F3' }: CustomButtonProps) => {
    return (
        // 待辦：將最外層 View 改成 TouchableOpacity，並綁定 onPress 屬性
        // 待辦：設定背景顏色為傳入的 color，並加入適當的 padding 與 borderRadius
        <TouchableOpacity
            style={{ backgroundColor: color, padding: 10, marginTop: 10, borderRadius: 5 }}
            onPress={onPress}
            disabled={!onPress}
        >
            {/* 待辦：顯示 title，並將文字置中對齊、顏色設為白色 */}
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                {title ? title : '我是一個按鈕，請實作我'}
            </Text>
        </TouchableOpacity>
    );
};


// ==========================================
// 🧩 練習：實作資料展示 ProfileCard 卡片模組
// ==========================================

// 待辦：為 ProfileCard 定義 Props
// 包含 name 字串、role 字串、avatarUrl 字串、onContact 函式

type ProfileCardProps = {
    name: string;
    role: string;
    avatarUrl: string;
    onContact: () => void;
};

const ProfileCard = ({ name, role, avatarUrl, onContact }: ProfileCardProps) => {
    return (
        // 待辦：設定卡片的外觀樣式：白色背景、圓角、內距 padding 15、邊距 marginBottom 15、加上陰影
        <View style={styles.cardPlaceholder}>
            <View style={styles.cardHeader}>
                {/* 
                  待辦：建立排版 
                  先放置 Image，來源為 avatarUrl，設定寬高並且是圓形
                  接著依序放置一個 View 容器，裡面放 name 與 role
                */}
                <Image
                    source={{ uri: avatarUrl }}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                />
                <Text style={{ flex: 1 }}>{`${name} - ${role}`}</Text>

            </View>

            {/* 待辦：使用你剛剛建立的 CustomButton 模組，title 傳入聯絡我文字，onPress 傳入 onContact 功能 */}
            <CustomButton title="聯絡我" onPress={onContact} />
        </View>
    );
};


// ==========================================
// 主畫面區 - 負責資料派發與單向資料流
// ==========================================
export default function ComponentDataFlowScreen() {
    // 假設我們透過網路取得了一組資料
    const users = [
        { id: '1', name: 'Alice', role: 'Frontend Developer', avatar: 'https://reactnative.dev/img/tiny_logo.png' },
        { id: '2', name: 'Bob', role: 'Backend Developer', avatar: 'https://reactnative.dev/img/tiny_logo.png' },
    ];

    // 這個函式會由父層提供，並透過 Props 給子層的聯絡我按鈕觸發
    const handleContact = (name: string) => {
        Alert.alert("聯絡通知", `你點擊了聯絡 ${name} 的按鈕！`);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
                <Text style={styles.headerTitle}>練習題 2: 元件化與資料百科</Text>

                {/* =======================================================
                    💡 百科全書示範段落
                ======================================================= */}
                <Text style={styles.sectionTitle}>💡 Props 的各種傳遞姿勢百科全書</Text>
                <View style={styles.demoBox}>
                    <Text style={styles.demoLabel}>基本字串傳遞必填屬性</Text>
                    <DemoBadge text="我是純文字 Badge" />

                    <Text style={styles.demoLabel}>傳入覆蓋預設值的字串參數</Text>
                    <DemoBadge text="覆蓋預設灰色" themeColor="#E91E63" />

                    <Text style={styles.demoLabel}>傳入布林值 isActive 改變樣式邏輯</Text>
                    <DemoBadge text="我是 Active 狀態" isActive={true} themeColor="#4CAF50" />

                    <Text style={styles.demoLabel}>傳入 Function 作為回呼函式參數</Text>
                    <DemoBadge
                        text="點我觸發父元件功能"
                        isActive={true}
                        themeColor="#FF9800"
                        onPressAction={() => Alert.alert("來自父層", "透過 Props 成功觸發了父元件的 Function！")}
                    />
                </View>


                {/* =======================================================
                    🧩 你的練習區段落
                ======================================================= */}
                <Text style={styles.sectionTitle}>🧩 你的實戰演練區</Text>

                {/* 
                  待辦：直接寫死或是使用陣列的 map 方法將 users 陣列渲染出來。
                  在此處放上兩個 ProfileCard，並將名稱、職位、圖片網址當作 Props 傳遞下去。
                  重點：handleContact 需要包裝成一個箭頭函數才能正確傳遞對象給目標元件。
                */}

                <View style={styles.exerciseBox}>
                    <Text style={styles.hintText}>請參照百科全書的寫法，在這邊渲染出兩張你實作的 ProfileCard</Text>
                    <ProfileCard
                        name={users[0].name}
                        role={users[0].role}
                        avatarUrl={users[0].avatar}
                        onContact={() => handleContact(users[0].name)}
                    />
                    <ProfileCard
                        name={users[1].name}
                        role={users[1].role}
                        avatarUrl={users[1].avatar}
                        onContact={() => handleContact(users[1].name)}
                    />
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
        marginBottom: 20,
        textAlign: 'center',
        color: '#333'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007AFF', // iOS 藍色風格
        marginTop: 10,
        marginBottom: 15,
    },
    demoBox: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 25,
        // 陰影
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    demoLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#555',
        marginTop: 10,
        marginBottom: 8,
    },
    badge: {
        alignSelf: 'flex-start',
        borderWidth: 1.5,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 5,
    },
    exerciseBox: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        minHeight: 200,
        // 陰影
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    hintText: {
        textAlign: 'center',
        padding: 20,
        color: '#aaa',
        fontStyle: 'italic',
        lineHeight: 24,
    },
    // 以下可作為實作 TODO 6 / TODO 7 時的樣式參考，你也可以直接寫在上面元件區
    cardPlaceholder: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        marginBottom: 15,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

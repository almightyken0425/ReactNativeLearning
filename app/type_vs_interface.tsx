import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

// ==========================================
// 💡 百科全書示範區: TypeScript Type vs Interface
// ==========================================

// Interface 的特點包含物件導向、支援 extends 繼承功能、同名宣告會自動合併
interface BaseUser {
    id: string;
    name: string;
}

// 使用 Extends 達成物件屬性繼承
interface AdminUser extends BaseUser {
    role: 'admin';
    permissions: string[];
}

// Declaration Merging 同名宣告會自動合併，很容易在大型專案中產生預期外的行為
interface BaseUser {
    age?: number; // BaseUser 現在自動擁有 age 屬性了！
}

// Type 的特點包含彈性高、支援聯集 Union 與交集 Intersection，並且嚴格禁止同名合併
type BaseUserType = {
    id: string;
    name: string;
};

// 用交集 Intersection 來達到類似繼承的屬性擴增效果
type AdminUserType = BaseUserType & {
    role: 'admin';
    permissions: string[];
};

// 支援聯集 Union，這是 Interface 做不到的核心差異
type Status = 'success' | 'error' | 'loading';

// ==========================================
// 🧩 你的練習區
// ==========================================

// 實作項目：試著定義一個名為 UserRole 的 type，讓它只能限定為 guest, member, vip 三種字串的聯集
type UserRole = 'guest' | 'member' | 'vip';
// 實作項目：試著自訂一個 UserProfile 的型別別名 Type，內部必須包含：
// - username 為字串型態
// - role 為上方剛定義的 UserRole 型別
// - isOnline 為布林值型態且設定為選填屬性
type UserProfile = {
    username: string;
    role: UserRole;
    isOnline?: boolean;
};

// 實作項目：幫下方的 ProfileBadge 元件加上 Props 的型別驗證設定，使用剛才定義好的 UserProfile
const ProfileBadge = (props: UserProfile) => {
    // 這裡我先幫你解構，如果你把型別寫好，TypeScript 就會知道它們是什麼型別了
    const { username, role, isOnline = false } = props;

    return (
        <View style={styles.badgeContainer}>
            <Text style={styles.badgeName}>{username || '尚未填寫名稱'}</Text>
            <View style={styles.roleTag}>
                <Text style={styles.roleText}>{role || '未知身分'}</Text>
            </View>
            <Text style={{ color: isOnline ? 'green' : 'gray', marginTop: 5 }}>
                狀態：{isOnline ? '🟢 上線中' : '⚪ 離線'}
            </Text>
        </View>
    );
};


export default function TypeVsInterfaceScreen() {
    return (
        <View style={styles.safeArea}>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
                <Text style={styles.headerTitle}>型別系統演練 Type 與 Interface 比較</Text>

                {/* =======================================================
                    💡 百科全書示範段落
                ======================================================= */}
                <Text style={styles.sectionTitle}>💡 Type 與 Interface 的差異</Text>
                <View style={styles.demoBox}>
                    <Text style={styles.demoLabel}>Extends 繼承與 Intersection 交集合併差異</Text>
                    <Text style={styles.demoText}>Interface 使用 extends 繼承，Type 使用交集來合併物件。</Text>

                    <Text style={styles.demoLabel}>Declaration Merging 宣告合併機制</Text>
                    <Text style={styles.demoText}>同名的 Interface 會自動把屬性合併在一起；同名的 Type 則會直接報錯，這使得 Type 在元件開發上更安全。</Text>

                    <Text style={styles.demoLabel}>Union Types 聯集變化</Text>
                    <Text style={styles.demoText}>Type 可以定義像是字串列舉的聯集，或者用來別名基本型別，Interface 只能定義物件形狀。</Text>

                    <Text style={[styles.demoLabel, { color: '#E91E63', marginTop: 15 }]}>⭐ 業界慣例：寫 React Props 時，優先使用 Type！</Text>
                </View>

                {/* =======================================================
                    🧩 你的練習區段落
                ======================================================= */}
                <Text style={styles.sectionTitle}>🧩 你的實戰演練區</Text>

                <View style={styles.exerciseBox}>
                    <Text style={styles.hintText}>請在上方定義好型別，並在這裡放入兩個你實作的 ProfileBadge 來測試型別是否正確</Text>

                    {/* 
                      實作項目：在這裡渲染兩個 ProfileBadge 元件實體，第一個設定為上線狀態，第二個設定為離線狀態
                      在輸入 username 時，可以觀察 VS Code 提供的自動完成與型別檢查提示功能
                    */}
                    <ProfileBadge username="Ken" role="guest" isOnline={true} />
                    <ProfileBadge username="Jane" role="vip" isOnline={false} />
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F9F8F4',
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
        color: '#2C3E50'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8B7355', // 百科全書主題色
        marginTop: 10,
        marginBottom: 15,
    },
    demoBox: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 25,
        shadowColor: '#8B7355',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    demoLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#8B7355',
        marginTop: 10,
        marginBottom: 4,
    },
    demoText: {
        fontSize: 14,
        color: '#7F8C8D',
        marginBottom: 10,
        lineHeight: 20,
    },
    exerciseBox: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        minHeight: 200,
        shadowColor: '#8B7355',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    hintText: {
        textAlign: 'center',
        padding: 20,
        color: '#95A5A6',
        fontStyle: 'italic',
        lineHeight: 24,
    },
    badgeContainer: {
        borderWidth: 1,
        borderColor: '#EAE6DF',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
    },
    badgeName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    roleTag: {
        backgroundColor: '#8B7355',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
    },
    roleText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    }
});

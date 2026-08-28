import React, { useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

export default function DemoKeyboardScreen() {
    const [message, setMessage] = useState('');

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingContainer}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <Text style={styles.headerTitle}>
                            百科 8-2: 避讓鍵盤與安全區域
                        </Text>

                        <View style={styles.infoBox}>
                            <Text style={styles.infoText}>
                                本畫面被 SafeAreaView 妥善保護，以避開系統頂部狀態列與底部手勢區。
                                {'\n\n'}
                                同時，我們使用了 KeyboardAvoidingView 確保輸入框在虛擬鍵盤彈出時依舊能被安全地推高並維持完全可見。
                                {'\n\n'}
                                請嘗試點擊畫面最下方的輸入框，觀察鍵盤滑出時畫面如何優雅地跟著上升。點開鍵盤後，您可以點擊畫面空白處將鍵盤收起。
                            </Text>
                        </View>

                        {/* 佈置一些空白內容佔位，藉此把輸入框擠到畫面最下方測試 */}
                        <View style={styles.spacer}>
                            <Text style={styles.spacerText}>內容文字方塊的靈魂佔位區</Text>
                            <Text style={styles.spacerText}>一路往下拖放即可</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="請在此輸入精彩留言"
                                placeholderTextColor="#95A5A6"
                                value={message}
                                onChangeText={setMessage}
                            />
                            <TouchableOpacity style={styles.submitButton}>
                                <Text style={styles.submitText}>傳送留言</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F9F8F4',
    },
    keyboardAvoidingContainer: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 16,
        textAlign: 'center'
    },
    infoBox: {
        backgroundColor: '#FCE7ED',
        padding: 16,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#E74C3C'
    },
    infoText: {
        fontSize: 14,
        lineHeight: 22,
        color: '#2C3E50'
    },
    spacer: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EAE6DF',
        borderRadius: 8,
        marginVertical: 20,
        opacity: 0.5
    },
    spacerText: {
        color: '#7F8C8D',
        fontWeight: 'bold'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10
    },
    input: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        height: 50,
        borderRadius: 25,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#BDC3C7',
        marginRight: 10,
        fontSize: 16
    },
    submitButton: {
        backgroundColor: '#E74C3C',
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderRadius: 25
    },
    submitText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    }
});

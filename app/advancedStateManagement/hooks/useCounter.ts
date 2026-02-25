import { useState } from 'react';

// 將計數器的邏輯封裝在一個以 use 開頭的獨立函式中
export const useCounter = (initialValue: number = 0) => {
    const [count, setCount] = useState(initialValue);

    const increment = () => setCount(c => c + 1);
    const decrement = () => setCount(c => c - 1);
    const reset = () => setCount(initialValue);

    // 將狀態和可呼叫的方法打包回傳提供給外部的 UI 層級使用
    return { count, increment, decrement, reset };
};

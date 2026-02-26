export type CartState = {
    count: number;
    total: number
};

export type CartAction =
    | { type: 'ADD_ITEM'; price: number }
    | { type: 'REMOVE_ITEM'; price: number }
    | { type: 'CLEAR' };

// Reducer 是一個純函式 Pure Function，它負責接收當前狀態與發生的動作 Action，然後計算並返回全新的狀態
export const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM':
            return { count: state.count + 1, total: state.total + action.price };
        case 'REMOVE_ITEM':
            if (state.count === 0) return state; // 避免數量變為負數
            return { count: state.count - 1, total: Math.max(0, state.total - action.price) };
        case 'CLEAR':
            return { count: 0, total: 0 };
        default:
            return state;
    }
};

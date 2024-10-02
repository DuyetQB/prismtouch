"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const Button = ({ onPress, style, children }) => {
    return (react_1.default.createElement(react_native_1.TouchableOpacity, { style: [styles.button, style], onPress: onPress }, children));
};
const styles = react_native_1.StyleSheet.create({
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    text: {
        color: '#fff',
        textAlign: 'center',
    },
});
exports.default = Button;

import React from 'react';
import { ViewStyle } from 'react-native';
interface ButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
}
declare const Button: React.FC<ButtonProps>;
export default Button;

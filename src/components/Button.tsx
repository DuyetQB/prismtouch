
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ButtonProps } from '../interfaces/ButtonProps';


const Button: React.FC<ButtonProps> = ({ onPress, style, children }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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

export default Button;

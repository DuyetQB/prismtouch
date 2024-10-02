import { PropsWithChildren, ReactNode } from "react";
import { ViewStyle } from "react-native";

export interface ButtonProps {
    onPress: () => void;
    style?: ViewStyle;
    children: PropsWithChildren<ReactNode>;
}
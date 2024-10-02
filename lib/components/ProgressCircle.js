"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const AnimatedTextInput = react_native_1.Animated.createAnimatedComponent(react_native_1.TextInput);
function ProgressCicle({ percent, radius = 30, strokeWidth = 6, duration = 500, color = 'tomato', textColor, max = 100 }) {
    const animated = react_1.default.useRef(new react_native_1.Animated.Value(0)).current;
    const circleRef = react_1.default.useRef();
    const inputRef = react_1.default.useRef();
    const circumference = 2 * Math.PI * radius;
    const halfCircle = radius + strokeWidth;
    const animation = (toValue) => {
        return react_native_1.Animated.timing(animated, {
            delay: 1000,
            toValue,
            duration,
            useNativeDriver: true,
            easing: react_native_1.Easing.out(react_native_1.Easing.ease)
        }).start(() => {
            // animation(Number(percent))
        });
    };
    react_1.default.useEffect(() => {
        animation(Number(percent));
        animated.addListener((v) => {
            const maxPerc = (100 * v.value) / max;
            const strokeDashoffset = circumference - (circumference * maxPerc) / 100;
            if (v.value === 100) {
                return animated.removeAllListeners();
            }
            if (inputRef?.current) {
                inputRef.current.setNativeProps({
                    text: `${Math.round(v.value)}%`
                });
            }
            if (circleRef?.current) {
                circleRef.current.setNativeProps({
                    strokeDashoffset
                });
            }
        });
        return () => {
            animated.removeAllListeners();
        };
    }, [percent]);
    const renderProgress = () => {
        if (Number(percent) < 50) {
            return '#F24564'; //return color pink when progress < 50
        }
        if (Number(percent) >= 50 && Number(percent) < 60) {
            return '#F8C917'; //return color pink when progress < 50
        }
        if (Number(percent) >= 60) {
            return '#3ED684'; //return color pink when progress < 50
        }
    };
    return (react_1.default.createElement(react_native_1.View, { style: { width: radius * 2, height: radius * 2 } },
        react_1.default.createElement(react_native_svg_1.default, { height: radius * 2, width: radius * 2, viewBox: `0 0 ${halfCircle * 2} ${halfCircle * 2}` },
            react_1.default.createElement(react_native_svg_1.G, { rotation: "-90", origin: `${halfCircle}, ${halfCircle}` },
                react_1.default.createElement(react_native_svg_1.Circle, { ref: circleRef, cx: "50%", cy: "50%", r: radius, fill: "transparent", stroke: renderProgress(), strokeWidth: strokeWidth, strokeLinecap: "round", strokeDashoffset: circumference, strokeDasharray: circumference }),
                react_1.default.createElement(react_native_svg_1.Circle, { cx: "50%", cy: "50%", r: radius, fill: "transparent", stroke: '#B5B2C1', strokeWidth: strokeWidth, strokeLinejoin: "round", strokeOpacity: ".1" }))),
        react_1.default.createElement(AnimatedTextInput, { ref: inputRef, underlineColorAndroid: "transparent", editable: false, defaultValue: "0", style: [
                react_native_1.StyleSheet.absoluteFillObject,
                {
                    fontSize: 11,
                    color: textColor ?? color,
                    fontWeight: '400',
                    textAlign: 'center'
                }
            ] })));
}
exports.default = (0, react_1.memo)(ProgressCicle);

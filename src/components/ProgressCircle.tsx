import { IProgressCicle } from '../interfaces/ProgressCircle'
import React, { memo } from 'react'
import { Easing, TextInput, Animated, View, StyleSheet } from 'react-native'
import Svg, { G, Circle } from 'react-native-svg'

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

function ProgressCicle({
    percent,
    radius = 30,
    strokeWidth = 6,
    duration = 500,
    color = 'tomato',
    textColor,
    max = 100
}: IProgressCicle) {
    const animated = React.useRef(new Animated.Value(0)).current
    const circleRef = React.useRef<any>()
    const inputRef = React.useRef<any>()

    const circumference = 2 * Math.PI * radius
    const halfCircle = radius + strokeWidth

    const animation = (toValue: number) => {
        return Animated.timing(animated, {
            delay: 1000,
            toValue,
            duration,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease)
        }).start(() => {
            // animation(Number(percent))
        })
    }

    React.useEffect(() => {
        animation(Number(percent))
        animated.addListener((v) => {
            const maxPerc = (100 * v.value) / max
            const strokeDashoffset = circumference - (circumference * maxPerc) / 100
            if (v.value === 100) {
                return animated.removeAllListeners()
            }
            if (inputRef?.current) {
                inputRef.current.setNativeProps({
                    text: `${Math.round(v.value)}%`
                })
            }
            if (circleRef?.current) {
                circleRef.current.setNativeProps({
                    strokeDashoffset
                })
            }
        })
        return () => {
            animated.removeAllListeners()
        }
    }, [percent])

    const renderProgress = () => {
        if (Number(percent) < 50) {
            return '#F24564' //return color pink when progress < 50
        }
        if (Number(percent) >= 50 && Number(percent) < 60) {
            return '#F8C917' //return color pink when progress < 50
        }
        if (Number(percent) >= 60) {
            return '#3ED684' //return color pink when progress < 50
        }
    }

    return (
        <View style={{ width: radius * 2, height: radius * 2 }}>
            <Svg
                height={radius * 2}
                width={radius * 2}
                viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
            >
                <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
                    <Circle
                        ref={circleRef}
                        cx="50%"
                        cy="50%"
                        r={radius}
                        fill="transparent"
                        stroke={renderProgress()}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDashoffset={circumference}
                        strokeDasharray={circumference}
                    />
                    <Circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        fill="transparent"
                        stroke={'#B5B2C1'}
                        strokeWidth={strokeWidth}
                        strokeLinejoin="round"
                        strokeOpacity=".1"
                    />
                </G>
            </Svg>
            <AnimatedTextInput
                ref={inputRef}
                underlineColorAndroid="transparent"
                editable={false}
                defaultValue="0"
                style={[
                    StyleSheet.absoluteFillObject,
                    {
                        fontSize: 11,
                        color: textColor ?? color,
                        fontWeight: '400',
                        textAlign: 'center'
                    }
                ]}
            />
        </View>
    )
}

export default memo(ProgressCicle)

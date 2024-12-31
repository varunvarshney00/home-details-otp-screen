import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from '../App';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Define the props type for the component
type OtpProps = NativeStackScreenProps<RootStackParamList, 'otppage'>;

const Otppage: React.FC<OtpProps> = ({ route }) => {
    const { phoneNumber } = route.params;

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputs = useRef<Array<TextInput | null>>([]);
    const [timer, setTimer] = useState(60); // Timer in seconds
    const [resendEnabled, setResendEnabled] = useState(false);

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setResendEnabled(true);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChangeText = (text: string, index: number) => {
        let newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Automatically move to the next input
        if (text && index < inputs.current.length - 1) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputs.current[index - 1]?.focus();
        }
    };

    const handleResendOtp = () => {
        // Logic to resend OTP goes here
        console.log('Resending OTP...');
        // Reset timer and disable resend button
        setTimer(60);
        setResendEnabled(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.smallText}>Verify Account Access</Text>


            <Text style={styles.numtext}>
                Enter the code that we just sent you on{" "}
                <View style={styles.flexrow}>
                    <Text style={styles.phstyle}>{phoneNumber}</Text>
                    <TouchableOpacity style={styles.editop}>
                        <Text style={styles.editstyle} onPress={() => navigation.goBack()}>EDIT</Text>
                    </TouchableOpacity>
                </View>
            </Text>

            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.otpBox}
                        keyboardType="numeric"
                        maxLength={1}
                        value={digit}
                        onChangeText={(text) => handleChangeText(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        ref={(el) => (inputs.current[index] = el)}
                    />
                ))}
            </View>

            <View style={styles.resendContainer}>
                {resendEnabled ? (
                    <TouchableOpacity style={styles.resendButton} onPress={handleResendOtp}>
                        <Text style={styles.resendButtonText}>Resend OTP</Text>
                    </TouchableOpacity>
                ) : (
                    <Text style={styles.resendtext}>
                        Resend in {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                    </Text>
                )}
            </View>

            <TouchableOpacity style={styles.ccbutton}>
                <Text style={styles.cctext}>Confirm Code</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    flexrow: {
        paddingTop: 10,
        flexDirection: 'row',
    },
    phstyle: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 17
    },
    numtext: {
        fontSize: 19,
        color: 'gray',
        marginTop: 8,
        marginLeft: 2,
    },
    resendtext: {
        textAlign: 'right',
        color: 'blue',
        marginRight: 5,
        marginTop: 10,
    },
    resendButton: {
        alignItems: 'flex-end',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    resendButtonText: {
        color: 'blue',
    },
    cctext: {
        color: 'white',
        fontWeight: 'bold',
    },
    ccbutton: {
        backgroundColor: 'blue',
        alignItems: 'center',
        padding: 15,
        marginTop: 50,
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    otpBox: {
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: '#d3d3d3',
        width: 50,
        height: 50,
        textAlign: 'center',
        fontSize: 24,
        marginHorizontal: 5,
        borderRadius: 8,
        marginTop: 30,
    },
    editop: {
        marginTop: -2,
    },
    editstyle: {
        color: 'blue',
        paddingLeft: 30,
        fontSize: 20,
    },
    container: {
        marginTop: 70,
        padding: 30,
        flex: 1,
    },
    smallText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30,
    },
    resendContainer: {
        marginTop: 20,
    },
});

export default Otppage;

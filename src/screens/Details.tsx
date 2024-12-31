import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from '../App';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PhoneInput from 'react-native-phone-number-input';

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

const Details = ({ route }: DetailsProps) => {
  // const { productId } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const phoneInput = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedValue, setFormattedValue] = useState('');

  const handleGetPhoneNumber = () => {
    if (phoneInput.current?.isValidNumber(phoneNumber)) {
      // Extract the country code
      const countryCode = phoneInput.current?.getCallingCode();
      
      // Format the phone number to show only the last 4 digits with asterisks
      const maskedPhoneNumber = formattedValue.replace(/.(?=.{4})/g, '*');
  
      // Combine the country code with the masked phone number
      const formattedPhoneNumber = `+${countryCode}${maskedPhoneNumber}`;
  
      // Navigate to the OTP page with the formatted phone number
      navigation.navigate("otppage", {
        phoneNumber: formattedPhoneNumber
      });
  
    } else {
      console.log('Invalid Phone Number');
    }
  };
  
  

  return (
    <View style={styles.containerPh}>
      <Text style={styles.title}>Add Phone Number</Text>
      <Text style={styles.subtitle}>To initiate the two-factor authentication, provide your phone number below.</Text>
      
      <View style={styles.containerPh}>
        <PhoneInput
          ref={phoneInput}
          defaultValue={phoneNumber}
          defaultCode="US"
          layout="first"
          onChangeText={(text) => {
            setPhoneNumber(text);
          }}
          onChangeFormattedText={(text) => {
            setFormattedValue(text);
          }}
          countryPickerProps={{ withAlphaFilter: true }}
          withDarkTheme
          withShadow
          autoFocus
        />
        <TouchableOpacity style={styles.button} onPress={handleGetPhoneNumber}>
          <Text style={styles.buttonText}>Send Code</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.popToTop()}>
          <Text style={styles.buttonText}>Go back to first screen</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  containerPh: {
    flex: 1,
    padding: 20
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginTop: 50,
    marginLeft: 18
  },
  subtitle: {
    marginRight: 25,
    marginLeft: 18,
    marginTop: 15,
    fontSize: 16,
    color: 'grey',
    marginBottom: 18
  },
  buttonContainer: {
    marginTop: 40,
  },
  button: {
    marginTop: 50,
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Details;

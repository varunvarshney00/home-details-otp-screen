import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, FlatList, TextInput, TouchableOpacity, Alert, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from '../App';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: HomeProps) => {
  const data = [
    { id: 1, title: 'Link your account with your phone number.' },
    { id: 2, title: 'Enter the one-time passcode.' },
    { id: 3, title: 'Secure your account' }
  ];

  const renderItem = ({ item, index }) => (
    <View style={styles.listItem}>
      <Text style={styles.index}>{index + 1}. </Text>
      <Text style={styles.itemTitle}>{item.title}</Text>
    </View>
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert('Invalid Password', 'Password must be at least 6 characters long.');
      return;
    }

    setModalVisible(true);
  };

  const handleGetStarted = () => {
    setModalVisible(false); // Hide the modal
    navigation.navigate("Details");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require('/Users/user/Desktop/navigationtest/navigate/assets/mainimg.png')}
          style={styles.image}
        />
      </View>

      <Text style={styles.header}>Sign In</Text>

      <Text style={styles.body}>
        Please enter your registered email address and password to access your account.
      </Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder='Email Address'
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInputWithIcon}
            placeholder='Password'
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Image
              source={require('/Users/user/Desktop/navigationtest/navigate/assets/eye.png')}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.forgotPassView}>
          <Text style={styles.forgotPassText}>
            Forgot Password?
          </Text>
        </View>
      </View>

      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.to} onPress={handleLogin}>
          <Text style={styles.button}>
            Login
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Image
              source={require('/Users/user/Desktop/navigationtest/navigate/assets/mainimg.png')}
            />

            <Text style={styles.modalText}>Secure your Account</Text>
            <Text style={styles.modaldesc}>Setup two-factor authentication to secure your account in just two steps.</Text>

            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />

            <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
              <Text style={styles.getStartedButtonText}>Get Started</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modaldesc: {
    fontSize: 18,
    paddingBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  index: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemTitle: {
    fontSize: 18,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',  // Position modal at the bottom
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',  // Full width of the screen
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    textAlign: 'left',
    fontSize: 29,
    marginBottom: 10,
    fontWeight: 'bold',
    marginTop: 20,
  },
  getStartedButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',  // Adjust as needed
    marginBottom: 20,
  },
  getStartedButtonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 49,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 5,
    paddingHorizontal: 10,
    marginTop: 25,
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
  forgotPassText: {
    color: 'blue',
    textAlign: 'right',
    width: '80%',  // Aligns with input field width
    marginBottom: 20,
  },
  forgotPassView: {
    alignSelf: 'flex-end',
    marginRight: 43,
    marginTop: 10,
  },
  inputView: {
    alignItems: 'center',
  },
  buttonView: {
    alignItems: 'center',
  },
  to: {
    alignItems: 'center',
    marginTop: 45,
    backgroundColor: 'blue',
    width: '80%',
    height: '23%',
    justifyContent: 'center',
    borderRadius: 10,
  },
  button: {
    fontSize: 20,
    color: 'white',
  },
  textInput: {
    marginTop: 30,
    width: '80%',
    height: 55,
    borderColor: 'gray',
    borderWidth: 2,
    paddingHorizontal: 10,
    color: 'black',
    borderRadius: 8,
  },
  textInputWithIcon: {
    flex: 1,
    color: 'black',
  },
  body: {
    alignItems: 'center',
    marginTop: 10,
    paddingLeft: 42,
    paddingRight: 30,
    color: 'gray',
    fontSize: 20,
  },
  header: {
    paddingLeft: 42,
    fontSize: 45,
    fontWeight: 'bold',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    paddingLeft: 30,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});

export default Home;

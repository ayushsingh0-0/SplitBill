import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
  Animated,
} from "react-native";
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

import bg from "../assets/bg.jpg";
import logo from "../assets/logo.png";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // Animation value for sliding
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { fullName, email, password } = formData;

    // Basic validation
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }
    if (!isLogin && !fullName) {
      Alert.alert("Error", "Full Name is required for signup");
      return;
    }

    try {
      if (isLogin) {
        // Login with email and password
        await signInWithEmailAndPassword(auth, email, password);
        // Navigation to HomeScreen is handled by RootNavigator.js
      } else {
        // Signup with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // Update user profile with full name
        await updateProfile(user, {
          displayName: fullName,
        });
        // Navigation to HomeScreen is handled by RootNavigator.js
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const toggleMode = () => {
    // Animate the slide
    Animated.timing(slideAnim, {
      toValue: isLogin ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsLogin(!isLogin);
      setFormData({
        fullName: "",
        email: "",
        password: "",
      });
    });
  };

  // Interpolate animation for sliding effect
  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width], // Slide from right to left
  });

  return (
    <View style={styles.container}>
      <Image source={bg} style={styles.backgroundImage} />
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.headerText}>Get{"\n"}Started</Text>
        <Text style={styles.subHeaderText}>by filling small details</Text>
      </View>

      {/* Animated Card Container */}
      <View style={styles.cardContainer}>
        <Animated.View
          style={[
            styles.cardWrapper,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          {/* Signup Card */}
          <View style={styles.card}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
              placeholder="Full Name"
              value={formData.fullName}
              onChangeText={(text) => handleInputChange("fullName", text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Email Address"
              value={formData.email}
              onChangeText={(text) => handleInputChange("email", text)}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) => handleInputChange("password", text)}
              secureTextEntry
              style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleMode}>
              <Text style={styles.toggleText}>
                Already have an account? Sign In
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Card */}
          <View style={[styles.card, styles.loginCard]}>
            <Text style={styles.title}>Sign In</Text>
            <TextInput
              placeholder="Email Address"
              value={formData.email}
              onChangeText={(text) => handleInputChange("email", text)}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) => handleInputChange("password", text)}
              secureTextEntry
              style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleMode}>
              <Text style={styles.toggleText}>
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    height: height + 40,
  },
  logo: {
    width: "15%",
    height: "15%",
    resizeMode: "contain",
    alignSelf: "left",
    marginTop: "12%",
    marginLeft: "4%",
  },
  header: {
    alignItems: "center",
  },
  headerText: {
    alignSelf: "left",
    fontSize: 35,
    fontWeight: "900",
    color: "#A7CB74",
    marginTop: "10%",
    marginLeft: "5%",
  },
  subHeaderText: {
    alignSelf: "left",
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginLeft: "5.5%",
  },
  cardContainer: {
    flex: 1,
    overflow: "hidden",
  },
  cardWrapper: {
    flexDirection: "row",
    width: width * 2,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    margin: 20,
    elevation: 5,
    width: width - 40,
  },
  loginCard: {
    alignSelf: "center",
    marginLeft: "auto",
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#333",
    marginBottom: "7%",
  },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#F97316",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  toggleText: {
    color: "#F97316",
    textAlign: "center",
    marginTop: 10,
  },
});

export default LoginScreen;
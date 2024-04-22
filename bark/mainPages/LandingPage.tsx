import React, { useContext } from "react";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  TextInput,
  View,
  Image,
  Text,
} from "react-native";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "@firebase/auth";
import { ref, set } from "@firebase/database";
import { StyleSheet } from "react-native";

export default function LandingPage(props: {
  setLoginStatus: (arg0: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log("User " + user.email + " with uid " + uid + " has logged in");
      props.setLoginStatus(true);
    } else {
      props.setLoginStatus(false);
    }
  });

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((userCredential) => {
        set(ref(FIREBASE_DATABASE, "users/" + userCredential.user.uid), {
          username: email,
          email: email,
        });
      });
      props.setLoginStatus(true);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={require("../assets/logo.png")} style={styles.dogLogo} />
        <Text style={styles.barkText}>BARK.</Text>
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textFields}
            value={email}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textFields}
            secureTextEntry={true}
            value={password}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.loginButtonWrapper}>
            <Button title="Login" onPress={() => signIn()} color="white" />
          </View>
          <View style={styles.createAccountButtonWrapper}>
            <Button
              title="Create Account"
              onPress={() => signUp()}
              color="brown"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#EADDCA",
    alignItems: "center",
    padding: 50,
  },
  topSection: {
    alignItems: "center",
    marginBottom: 130,
  },
  bottomSection: {
    width: "100%",
    alignItems: "center",
  },
  dogLogo: {
    width: 500,
    height: 350,
    resizeMode: "contain",
  },
  barkText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: -80,
  },
  inputContainer: {
    marginBottom: 20,
    width: "90%",
  },
  buttonContainer: {
    width: "60%",
    marginBottom: 0,
  },
  loginButtonWrapper: {
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 10,
    backgroundColor: "#8B4513",
  },
  createAccountButtonWrapper: {
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#8B4513",
  },
  textFields: {
    borderWidth: 3,
    borderColor: "#5C4033",
    borderRadius: 5,
    height: 50,
    marginBottom: 10,
    padding: 3,
    fontSize: 20,
  },
});

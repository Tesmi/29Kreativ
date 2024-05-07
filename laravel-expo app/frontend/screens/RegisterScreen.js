import { useState, useContext } from "react";
import { SafeAreaView, View, StyleSheet, Button, Platform } from "react-native";
import FormTextField from "./components/FormTextField";

import axios from "../utils/axios";
import { register, loadUser } from "../services/AuthService";
import AuthContext from "../contexts/AuthContext";

export default function RegisterScreen({ navigation }) {
  const { setUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState({});

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  async function handleRegister() {
    setError({});

    if (name.length < 3) {
      setError({ name: ["The name must be at least 3 characters."] });
      return;
    }

    if (!validateEmail(email)) {
      setError({ email: ["The email must be a valid email address."] });
      return;
    }

    if (password.length < 6) {
      setError({ password: ["The password must be at least 6 characters."] });
      return;
    }

    if (password !== passwordConfirmation) {
      setError({
        password_confirmation: ["The password confirmation does not match."],
      });
      return;
    }

    try {
      await register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        device_name: `${Platform.OS} ${Platform.Version}`,
      });

      const user = await loadUser();
      setUser(user);
      navigation.replace("Home");
    } catch (error) {
      if (error.response?.status === 422) {
        setError(error.response?.data.errors);
        console.log(error.response?.data.errors);
      }
    }
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.content}>
        <FormTextField
          label="Your Name:"
          value={name}
          onChangeText={(e) => setName(e)}
          errors={error.name}
        />
        <FormTextField
          label="Email address:"
          value={email}
          onChangeText={(e) => setEmail(e)}
          keyboardType="email-address"
          errors={error.email}
        />
        <FormTextField
          label="Password:"
          value={password}
          secureTextEntry={true}
          onChangeText={(e) => setPassword(e)}
          errors={error.password}
        />
        <FormTextField
          label="Password Confirmation:"
          value={passwordConfirmation}
          secureTextEntry={true}
          onChangeText={(e) => setPasswordConfirmation(e)}
          errors={error.password_confirmation}
        />
        <Button title="Register" onPress={handleRegister} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
    rowGap: 16,
  },
});

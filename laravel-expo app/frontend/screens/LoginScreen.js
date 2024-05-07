import { useState, useContext } from "react";
import { SafeAreaView, View, StyleSheet, Button, Platform } from "react-native";
import FormTextField from "./components/FormTextField";

import axios from "../utils/axios";
import { login, loadUser } from "../services/AuthService";
import AuthContext from "../contexts/AuthContext";

export default function LoginScreen({ navigation }) {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  async function handleLogin() {
    setError({});

    try {
      await login({
        email,
        password,
        device_name: `${Platform.OS} ${Platform.Version}`,
      });

      const user = await loadUser();
      setUser(user);

      console.log(user);
    } catch (error) {
      if (error.response?.status === 422) {
        setError(error.response?.data.errors);
      }
    }
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.content}>
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
        <Button title="Login" onPress={handleLogin} />
        <Button
          title="Create an account"
          onPress={() => navigation.navigate("Create account")}
        />
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

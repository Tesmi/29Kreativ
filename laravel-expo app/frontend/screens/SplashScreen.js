import { SafeAreaView, Text, StyleSheet, View } from "react-native";

export default function SplashScreen() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.heading}>Loading...</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

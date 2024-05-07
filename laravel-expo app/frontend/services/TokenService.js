import * as SecureStore from "expo-secure-store";

let token = null;

export async function setToken(newToken) {
  token = newToken;

  if (newToken) {
    await SecureStore.setItemAsync("token", newToken);
  } else {
    await SecureStore.deleteItemAsync("token");
  }
}

export async function getToken() {
  if (token) {
    return token;
  }

  token = await SecureStore.getItemAsync("token");

  return token;
}

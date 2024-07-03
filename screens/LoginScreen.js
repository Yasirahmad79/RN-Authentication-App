import React, { useContext, useState } from "react";
import { Alert } from "react-native";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import AuthContent from "../components/Auth/AuthContent";
import { login } from "../utility/auth";
import { AuthContext } from "../store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginScreen({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  const loginHandler = async ({ email, password }) => {
    try {
      setIsAuthenticating(true);
      const token = await login({ email, password });
      await AsyncStorage.setItem("token", token); 
      authCtx.authenticate(token);
      setIsAuthenticating(false);
      navigation.navigate("Welcome");
    } catch (error) {
      Alert.alert("Login failed", error.message || "Something went wrong");
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;

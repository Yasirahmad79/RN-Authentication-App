import axios from "axios";

const URL_API_KEY = "AIzaSyCjQVOvThLFY3YaKRIfy9RVMq6DaRaKTq8";

const authenticate = async ({ mode, email, password }) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${URL_API_KEY}`;
  try {
    const response = await axios.post(url, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
    const token = response.data.idToken;
    return token;
  } catch (error) {
    throw error.response.data.error; // Throw Firebase specific error message
  }
};

export const createUser = async ({ email, password }) => {
  try {
    const userInfo = await authenticate({ mode: "signUp", email, password });
    return userInfo;
  } catch (error) {
    throw error;
  }
};

export const login = async ({ email, password }) => {
  try {
    const userInfo = await authenticate({
      mode: "signInWithPassword",
      email,
      password,
    });
    return userInfo;
  } catch (error) {
    throw error;
  }
};

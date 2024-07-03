import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../utility/auth';
import { useContext, useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { AuthContext } from '../store/auth-context';

function SignupScreen({navigation}) {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const authCtx = useContext(AuthContext)
  const signUpHandler = async ({ email, password }) => {
    setIsAuthenticating(true)
    try {
      const token = await createUser({ email, password });
      authCtx.authenticate(token)
      navigation.replace('Login')
    } catch (error) {
      Alert.alert('Signup failed', error.message || 'Something went wrong');
      setIsAuthenticating(false)
    }
  };
  if (isAuthenticating) {
    return <LoadingOverlay message='creating user...' />
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;

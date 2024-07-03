import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../store/auth-context';
import axios from 'axios';

function WelcomeScreen() {
  const [fetchedMessege, setFetchedMessege] = useState('');
  const authCtx = useContext(AuthContext)
  const token = authCtx.token;
  useEffect(()=> {
    axios.get('https://expense-tracker-app-f4834-default-rtdb.firebaseio.com/messege.json?auth='+ token).then(response => {
      setFetchedMessege(response.data)
    })
  },[token]);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>{fetchedMessege}</Text>
      <Text>You authenticated successfully!</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

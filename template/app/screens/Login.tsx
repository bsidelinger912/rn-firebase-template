import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Button, TextInput, Title, Text} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

import {Theme, useCustomTheme} from '../theme';

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    errorMessage: {
      color: theme.colors.error,
      marginVertical: theme.spacing.medium,
    },
  });

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState<string>();

  const theme = useCustomTheme();
  const styles = createStyles(theme);

  // const {t} = useTranslation();

  const login = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, pw);
    } catch (e: any) {
      const userFacingMessage = e.message.split(']')[1] as string;
      setError(userFacingMessage);
    }
  };

  return (
    <SafeAreaView>
      <Title>Login</Title>
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        label="Password"
        value={pw}
        onChangeText={text => setPw(text)}
      />
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      <Button onPress={login}>Log in</Button>
    </SafeAreaView>
  );
};

export default Login;

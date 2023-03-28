import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {Text, ActivityIndicator, TextInput, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

import {useTodos, useAddTodo} from '../collections/todos';
import {Theme, useCustomTheme} from '../theme';

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    headerWrapper: {
      marginBottom: 20,
      padding: theme.spacing.medium,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

const Home: React.FC = () => {
  const [newTodo, setNewTodo] = useState('');

  const theme = useCustomTheme();
  const styles = createStyles(theme);

  const {data, loading} = useTodos();
  const [invoke, {loading: addTodoLoading, error: addTodoError}] = useAddTodo();

  const addTodo = () => {
    setNewTodo('');
    invoke({text: newTodo});
  };

  const logout = async () => {
    try {
      await auth().signOut();
      console.log('User signed out!');
    } catch (e) {
      console.error('error logging out', e);
    }
  };

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.headerWrapper}>
        <Text>My Todo App</Text>
        <Button onPress={logout}>Logout</Button>
      </View>

      <TextInput
        label="Add a Todo"
        value={newTodo}
        onChangeText={text => setNewTodo(text)}
      />

      <Button disabled={addTodoLoading || !!addTodoError} onPress={addTodo}>
        Add +
      </Button>

      {data?.map(place => (
        <View key={place.id}>
          <Text>{place.text}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
};

export default Home;

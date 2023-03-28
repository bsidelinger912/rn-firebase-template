import firestore from '@react-native-firebase/firestore';
import {Todo} from './types';

export default firestore().collection<Omit<Todo, 'id'>>('Todos');

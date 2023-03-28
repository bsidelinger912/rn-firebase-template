import {useState} from 'react';

import {
  DataHookMutation,
  DataHookError,
  DataHookMutationOptions,
} from '../../../types/shared';
import {Todo} from '../types';
import Collection from '../Collection';
import logger from '../../../logger';
import {useAuth} from '../../../auth/AuthProvider';

export default function useAddTodo(
  options?: DataHookMutationOptions,
): DataHookMutation<Omit<Todo, 'id' | 'userId'>> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<DataHookError>();

  const auth = useAuth();

  const invoke = async (args: Omit<Todo, 'id' | 'userId'>) => {
    setLoading(true);

    try {
      await Collection.add({
        userId: auth.user.uid,
        ...args,
      });

      options?.onSuccess?.();
    } catch (e: any) {
      setError({message: e.message, code: e.code});
      options?.onError?.({message: e.message, code: e.code});
      logger.error(e);
    } finally {
      setLoading(false);
    }
  };

  return [invoke, {loading, error}];
}

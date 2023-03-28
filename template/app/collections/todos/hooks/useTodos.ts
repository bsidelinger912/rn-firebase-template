import {useEffect, useState} from 'react';

import {DataHookResult} from '../../../types/shared';
import logger from '../../../logger';
import {useAuth} from '../../../auth/AuthProvider';

import Collection from '../Collection';
import {Todo} from '../types';

export default function useTodos(): DataHookResult<Todo[]> {
  const [data, setData] = useState<Todo[]>();
  const [loading, setLoading] = useState(true);

  const {user} = useAuth();

  useEffect(() => {
    const subscriber = Collection.where('userId', '==', user.uid).onSnapshot(
      querySnapshot => {
        if (querySnapshot) {
          const mappedData = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }));

          setData(mappedData);
          setLoading(false);
        }
      },
      e => {
        logger.error(e);
      },
    );

    return () => subscriber();
  }, [user.uid]);

  return {data, loading};
}

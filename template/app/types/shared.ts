export interface ItemBase {
  id: string;
  userId: string;
}

export interface DataHookError {
  message: string;
  code: string;
}

export interface DataHookResult<T> {
  loading: boolean;
  error?: DataHookError;
  data?: T;
}

export type DataHookMutation<T> = [(args: T) => void, DataHookResult<null>];

export interface DataHookMutationOptions {
  onError?: (e: DataHookError) => void;
  onSuccess?: () => void;
}

# rtk-query-hooked

Easily reactable, fully typed.

`rtk-query-hooked` is a utility library for simplifying the use of RTK Query hooks by providing you with a tiny layer of abstracion for query/mutation events and types.

Passed events do not need to be memoized as they are always fresh internally, forget about useCallback and useEffect problems when reacting to a query/mutation state, handlers for events can be passed without dependency worries, making the API similar to tanstack/react-query.

Be able to easily infer data that an RTK Query hook returns with UseQueryData and UseMutationData types. (Can be difficult to achieve otherwise)

## Installation

`npm install rtk-query-hooked`

## Usage

### useQuery

The `useQuery` hook is a wrapper around the RTK Query hook that provides additional event handlers and simplifies the usage.

#### Import

`import { useQuery } from 'rtk-query-hooked';`

#### Usage Example

`import { useQuery } from 'rtk-query-hooked';`
`import { useGetSomethingQuery } from './api';`
`import { toast } from './toast';`

`const MyComponent = () => {`
`  const { data, error, isLoading } = useQuery({`
`    hook: useGetSomethingQuery,`
`    request: { id: 1 },`
`    onSuccess: (data) => toast.success('Fetched ' + data.name + ' successfully.'),`
`    onError: (error) => toast.error('Error fetching data: ', error.message),`
`  });`

`  if (isLoading) return <div>Loading...</div>;`
`  if (error) return <div>Error: {error.message}</div>;`

`  return data ? <pre>Updated Data: {JSON.stringify(data, null, 2)}</pre> : null`
`};`

### useMutation

The `useMutation` hook is a wrapper around the RTK Query mutation hook that provides additional event handlers and simplifies the usage.

#### Import

`import { useMutation } from 'rtk-query-hooked';`

#### Usage Example

`import { useMutation } from 'rtk-query-hooked';`
`import { useUpdateSomethingMutation } from './api';`
`import { toast } from './toast';`

`const MyComponent = () => {`
`  const [trigger, { data, error, isLoading }] = useMutation({`
`    hook: useUpdateSomethingMutation,`
`    onSuccess: (data) => toast.success('Updated ' + data.name + ' successfully.'),`
`    onError: (error) => toast.error('Error fetching data: ', error.message),`
`  });`

`  const handleUpdate = () => {`
`    trigger({ id: 1, value: 'newValue' });`
`  };`

`  if (isLoading) return <div>Updating...</div>;`
`  if (error) return <div>Error: {error.message}</div>;`

`  return (`
`    <div>`
`      <button onClick={handleUpdate}>Update</button>`
`      {data ? <pre>Updated Data: {JSON.stringify(data, null, 2)}</pre>} : null`
`    </div>`
`  );`
`};`

## API

### `useQuery`

#### Props

- `hook`: The RTK Query hook to be used.
- `request`: The request parameters for the query.
- `options`: (Optional) Additional options for the query.
- `onSettled`: (Optional) Callback when the query is settled.
- `onSuccess`: (Optional) Callback when the query is successful.
- `onError`: (Optional) Callback when the query fails.

#### Returns

The same response object returned by the RTK Query hook.

### `useMutation`

#### Props

- `hook`: The RTK Query mutation hook to be used.
- `onSettled`: (Optional) Callback when the mutation is settled.
- `onSuccess`: (Optional) Callback when the mutation is successful.
- `onError`: (Optional) Callback when the mutation fails.

#### Returns

An array containing the trigger function and the response object from the RTK Query mutation hook.

## Types

### `UseQueryProps`

`type UseQueryProps<QueryArg, BaseQuery extends BaseQueryFn, ResultType> = {`
`  hook: RTKQueryHook<QueryArg, BaseQuery, ResultType>;`
`  request:`
`    | Parameters<RTKQueryHook<QueryArg, BaseQuery, ResultType>>[0]`
`    | (() => Parameters<RTKQueryHook<QueryArg, BaseQuery, ResultType>>[0]);`
`  options?:`
`    | Parameters<RTKQueryHook<QueryArg, BaseQuery, ResultType>>[1]`
`    | (() => Parameters<RTKQueryHook<QueryArg, BaseQuery, ResultType>>[1]);`
`} & RTKHookedEvents<UseQueryData<QueryArg, BaseQuery, ResultType>>;`

### `UseMutationProps`

`type UseMutationProps<QueryArg, BaseQuery extends BaseQueryFn, ResultType> = {`
`  hook: RTKMutationHook<QueryArg, BaseQuery, ResultType>;`
`} & RTKHookedEvents<UseMutationData<QueryArg, BaseQuery, ResultType>>;`

### `RTKQueryHook`

A type for the `useQuery` hook from RTK Query with generics and advanced typing.

### `RTKMutationHook`

A type for the `useMutation` hook from RTK Query with generics and advanced typing.

### `UseQueryData`

The data returned by the `useQuery` hook.

### `UseMutationData`

The data returned by the `useMutation` hook.

### `RTKHookedEvents`

A type for event handlers: `onSettled`, `onSuccess`, and `onError`.

## License

[MIT](LICENSE)

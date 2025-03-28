import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';
import { Provider } from 'react-redux';
import authReducer from "./store/index";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// https://docs.expo.dev/router/reference/troubleshooting/#expo_router_app_root-not-defined

const persistConfig = { key: 'root', storage: AsyncStorage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

const persistor = persistStore(store);

export function App() {
  const ctx = require.context('./app');
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ExpoRoot context={ctx} />
      </PersistGate>
    </Provider>
  );
}

registerRootComponent(App);

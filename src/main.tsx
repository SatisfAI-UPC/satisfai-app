import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {NextUIProvider} from "@nextui-org/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import store, {persistor} from "./shared/services/GlobalStore.ts";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    <NextUIProvider>
                        <App />
                    </NextUIProvider>
                </QueryClientProvider>
            </PersistGate>
        </Provider>
    </StrictMode>,
)

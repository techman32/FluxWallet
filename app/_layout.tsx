import { Stack } from 'expo-router'
import { WalletProvider } from './context/WalletContext'

export default function RootLayout() {
  return (
    <WalletProvider>
      <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </WalletProvider>
  )
}

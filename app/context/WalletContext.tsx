import 'react-native-get-random-values'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import * as SecureStore from 'expo-secure-store'
import { Keypair } from '@solana/web3.js'

type WalletContextType = {
  keypair: Keypair | null
  publicKey: string | null
  createWallet: () => Promise<void>
  importWallet: (secretKey: Uint8Array) => Promise<void>
  clearWallet: () => Promise<void>
  isLoaded: boolean
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

const WALLET_KEY = 'user_wallet_secret_key'

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [keypair, setKeypair] = useState<Keypair | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadWallet = async () => {
      const storedKey = await SecureStore.getItemAsync(WALLET_KEY)
      if (storedKey) {
        try {
          const secretArray = JSON.parse(storedKey) as number[]
          const secretKey = Uint8Array.from(secretArray)
          const restored = Keypair.fromSecretKey(secretKey)
          setKeypair(restored)
        } catch (e) {
          console.error('Ошибка при восстановлении кошелька:', e)
        }
      }
      setIsLoaded(true)
    }

    loadWallet()
  }, [])

  const createWallet = async () => {
    const kp = Keypair.generate()
    setKeypair(kp)
    await SecureStore.setItemAsync(WALLET_KEY, JSON.stringify(Array.from(kp.secretKey)))
  }

  const importWallet = async (secretKey: Uint8Array) => {
    const kp = Keypair.fromSecretKey(secretKey)
    setKeypair(kp)
    await SecureStore.setItemAsync(WALLET_KEY, JSON.stringify(Array.from(secretKey)))
  }

  const clearWallet = async () => {
    await SecureStore.deleteItemAsync(WALLET_KEY)
    setKeypair(null)
  }

  return (
    <WalletContext.Provider
      value={{
        keypair,
        publicKey: keypair?.publicKey.toBase58() || null,
        createWallet,
        importWallet,
        clearWallet,
        isLoaded,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (!context) throw new Error('useWallet must be used within WalletProvider')
  return context
}

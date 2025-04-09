import 'react-native-get-random-values'
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { useWallet } from './context/WalletContext'

export default function Index() {
  const router = useRouter()
  const { createWallet, publicKey, isLoaded } = useWallet()

  useEffect(() => {
    if (isLoaded && publicKey) {
      router.replace('/(tabs)/home')
    }
  }, [isLoaded, publicKey])

  const handleCreate = async () => {
    await createWallet()
    Alert.alert('Кошелек создан', `Адрес: ${publicKey}`)
    router.replace('/(tabs)/home')
  }

  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Загрузка кошелька...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добро пожаловать!</Text>
      <Button title="Создать кошелек" onPress={handleCreate} />
      <View style={{ marginTop: 10 }} />
      <Button title="Импортировать" onPress={() => Alert.alert('Импорт')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
})

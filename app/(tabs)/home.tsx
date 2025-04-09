import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { ArrowDown, ArrowUp, QrCode, Search, User } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useWallet } from '../context/WalletContext'
import * as SecureStore from 'expo-secure-store'
import { useRouter } from 'expo-router'

export default function Home() {
  const { publicKey, clearWallet } = useWallet()
  const router = useRouter()

  const formatAddress = (address: string | null) => {
    if (!address) return ''
    return `${address.slice(0, 5)}...${address.slice(-4)}`
  }

  const handleDeleteWallet = async () => {
    Alert.alert('Удалить кошелек?', 'Вы уверены, что хотите удалить кошелек?', [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: async () => {
          await SecureStore.deleteItemAsync('secretKey')
          clearWallet()
          router.replace('/')
        },
      },
    ])
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <TouchableOpacity>
            <User size={24} color="#000000" style={styles.userIcon} />
          </TouchableOpacity>
          <Text>{formatAddress(publicKey)}</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <QrCode size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Search size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Общий баланс</Text>
          <Text style={styles.balanceAmount}>$ 1,240,480.50</Text>
          <Text style={styles.balanceChange}>+$1,250.30 (5.2%)</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionButton, styles.receiveButton]}>
            <ArrowDown size={24} color="#fff" />
            <Text style={styles.receiveButtonText}>Получить</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.sendButton]}>
            <ArrowUp size={24} color="#000" />
            <Text style={styles.sendButtonText}>Отправить</Text>
          </TouchableOpacity>
        </View>

        {/* 👇 Кнопка удаления кошелька */}
        <TouchableOpacity onPress={handleDeleteWallet} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Удалить кошелек</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 12,
  },
  balanceCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 16,
    rowGap: 12,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#666',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '700',
  },
  balanceChange: {
    fontSize: 14,
    color: '#34C759',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    columnGap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  receiveButton: {
    backgroundColor: '#000',
  },
  sendButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
  },
  receiveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
  sendButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
  deleteButton: {
    marginTop: 24,
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FF3B30',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
})

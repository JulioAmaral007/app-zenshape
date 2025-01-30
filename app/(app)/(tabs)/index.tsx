import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { ScreenWrapper } from '@/components/ScreenWrapper'
import { Typo } from '@/components/Typo'
import { colors } from '@/constants/theme'
import { useRouter } from 'expo-router'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

export default function HomeScreen() {
  const router = useRouter()

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Workout" style={{ marginVertical: 10 }} />

        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Typo size={24} color={colors.neutral100} fontWeight={500}>
              Quick Start
            </Typo>
            <Button
              onPress={() => router.navigate('/(modals)/workoutModal')}
              style={styles.darkButton}
            >
              <Text style={styles.buttonText}>Start Empty Workout</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  proBadge: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  refreshButton: {
    color: '#fff',
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    color: '#fff',
    fontSize: 24,
  },
  darkButton: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  routineButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  halfButton: {
    flex: 1,
  },
  routineItem: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 8,
  },
  routineTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  routineSubtitle: {
    color: '#666',
    marginTop: 4,
  },
  startButton: {
    backgroundColor: '#0066ff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  startButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  navItem: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  navItemActive: {
    borderTopWidth: 2,
    borderTopColor: '#0066ff',
  },
  navText: {
    color: '#fff',
    marginTop: 4,
    fontSize: 12,
  },
  navTextActive: {
    color: '#0066ff',
  },
})

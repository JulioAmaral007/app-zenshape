import { BackButton } from '@/components/BackButton'
import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { ModalWrapper } from '@/components/ModalWrapper'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

interface Set {
  id: number
  kg: string
  reps: string
}

export default function NewExerciseScreen() {
  const [exerciseTitle, setExerciseTitle] = useState('')
  const [sets, setSets] = useState<Set[]>([{ id: 1, kg: '', reps: '' }])
  const router = useRouter()

  const addSet = () => {
    const newSet: Set = {
      id: sets.length + 1,
      kg: '',
      reps: '',
    }
    setSets([...sets, newSet])
  }

  const updateSet = (id: number, field: 'kg' | 'reps', value: string) => {
    const updatedSets = sets.map(set => (set.id === id ? { ...set, [field]: value } : set))
    setSets(updatedSets)
  }

  const saveExercise = () => {
    // Aqui você pode implementar a lógica para salvar o exercício
    console.log('Exercício salvo:', { title: exerciseTitle, sets })
    router.back()
  }

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header title="Exercise" leftIcon={<BackButton />} />

        <ScrollView style={styles.content}>
          <Input
            placeholder="Exercise title"
            placeholderTextColor="#666"
            value={exerciseTitle}
            onChangeText={setExerciseTitle}
          />

          <View style={styles.setSection}>
            <View style={styles.setHeader}>
              <Text style={styles.setHeaderText}>SET</Text>
              <Text style={styles.setHeaderText}>KG</Text>
              <Text style={styles.setHeaderText}>REPS</Text>
            </View>
            {sets.map((set, index) => (
              <View key={set.id} style={styles.setRow}>
                <Text style={styles.setText}>{index + 1}</Text>
                <Input
                  value={set.kg}
                  onChangeText={value => updateSet(set.id, 'kg', value)}
                  keyboardType="numeric"
                  placeholder="-"
                />
                <Input
                  value={set.reps}
                  onChangeText={value => updateSet(set.id, 'reps', value)}
                  keyboardType="numeric"
                  placeholder="-"
                />
              </View>
            ))}
          </View>

          <Button style={styles.addButton} onPress={addSet}>
            <Text style={styles.addButtonText}>+ Add Set</Text>
          </Button>
        </ScrollView>
      </View>
    </ModalWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 8,
  },
  cancelButtonText: {
    color: '#0066ff',
    fontSize: 16,
  },
  saveButton: {
    padding: 8,
  },
  saveButtonText: {
    color: '#0066ff',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  exerciseImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    color: '#0066ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exerciseNotes: {
    color: '#666',
    marginTop: 4,
  },
  moreButton: {
    padding: 8,
  },
  moreButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  timerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timerText: {
    color: '#0066ff',
    marginLeft: 8,
  },
  setSection: {
    marginBottom: 16,
  },
  setHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  setHeaderText: {
    color: '#666',
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  setText: {
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  setInput: {
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  addExerciseButton: {
    backgroundColor: '#0066ff',
    padding: 16,
    borderRadius: 8,
  },
  addExerciseButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
})

import { CaloriesProgress } from '@/components/CaloriesProgress'
import { Header } from '@/components/Header'
import { HorizontalCalendar } from '@/components/HorizontalCalendar'
import { MacroProgress } from '@/components/MacroProgress'
import { ScreenWrapper } from '@/components/ScreenWrapper'
import { Typo } from '@/components/Typo'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

type DayOfWeek = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'

const macrosByDay: Record<
  DayOfWeek,
  { value: string; total: string; label: string; color: string; icon: string }[]
> = {
  Sunday: [
    { value: '120', total: '300', label: 'Proteína\nrestante', color: '#FF4B4B', icon: '🍗' },
    { value: '150', total: '300', label: 'Carboidratos\nrestantes', color: '#FFB946', icon: '🌾' },
    { value: '30', total: '70', label: 'Gorduras\nrestantes', color: '#4B9DFF', icon: '💧' },
  ],
  Monday: [
    { value: '90', total: '300', label: 'Proteína\nrestante', color: '#FF4B4B', icon: '🍗' },
    { value: '200', total: '300', label: 'Carboidratos\nrestantes', color: '#FFB946', icon: '🌾' },
    { value: '50', total: '70', label: 'Gorduras\nrestantes', color: '#4B9DFF', icon: '💧' },
  ],
  Tuesday: [
    { value: '100', total: '300', label: 'Proteína\nrestante', color: '#FF4B4B', icon: '🍗' },
    { value: '180', total: '300', label: 'Carboidratos\nrestantes', color: '#FFB946', icon: '🌾' },
    { value: '40', total: '70', label: 'Gorduras\nrestantes', color: '#4B9DFF', icon: '💧' },
  ],
  Wednesday: [
    { value: '110', total: '300', label: 'Proteína\nrestante', color: '#FF4B4B', icon: '🍗' },
    { value: '170', total: '300', label: 'Carboidratos\nrestantes', color: '#FFB946', icon: '🌾' },
    { value: '35', total: '70', label: 'Gorduras\nrestantes', color: '#4B9DFF', icon: '💧' },
  ],
  Thursday: [
    { value: '130', total: '300', label: 'Proteína\nrestante', color: '#FF4B4B', icon: '🍗' },
    { value: '160', total: '300', label: 'Carboidratos\nrestantes', color: '#FFB946', icon: '🌾' },
    { value: '45', total: '70', label: 'Gorduras\nrestantes', color: '#4B9DFF', icon: '💧' },
  ],
  Friday: [
    { value: '140', total: '300', label: 'Proteína\nrestante', color: '#FF4B4B', icon: '🍗' },
    { value: '150', total: '300', label: 'Carboidratos\nrestantes', color: '#FFB946', icon: '🌾' },
    { value: '50', total: '70', label: 'Gorduras\nrestantes', color: '#4B9DFF', icon: '💧' },
  ],
  Saturday: [
    { value: '150', total: '300', label: 'Proteína\nrestante', color: '#FF4B4B', icon: '🍗' },
    { value: '140', total: '300', label: 'Carboidratos\nrestantes', color: '#FFB946', icon: '🌾' },
    { value: '55', total: '70', label: 'Gorduras\nrestantes', color: '#4B9DFF', icon: '💧' },
  ],
}

export default function DietScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }
  const formattedDay = format(selectedDate, 'EEEE', { locale: enUS })
  const macros = macrosByDay[formattedDay as DayOfWeek] || macrosByDay.Sunday // Dados padrão para domingo.

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Diet" />

        {/* Calendar Days */}
        <HorizontalCalendar onDateSelect={handleDateSelect} />

        {/* Selected Date Display */}
        <Typo fontWeight="bold" size={24} style={styles.selectedDate}>
          {format(selectedDate, "EEEE, d 'de' MMMM", { locale: enUS })}
        </Typo>

        {/* Calories Progress */}
        <CaloriesProgress current={1626} total={3000} />

        {/* Macros Progress */}
        <View style={styles.macroContainer}>
          {macros.map((macro, index) => (
            <MacroProgress
              key={index.toString()}
              value={macro.value}
              total={macro.total}
              label={macro.label}
              color={macro.color}
              icon={macro.icon}
            />
          ))}
        </View>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  selectedDate: {
    marginVertical: 10,
    textAlign: 'center',
  },
  caloriesProgress: {
    marginTop: 20,
  },
  macroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  macroProgress: {
    flex: 1,
    marginHorizontal: 5,
  },
})

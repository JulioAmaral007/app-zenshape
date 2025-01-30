import { colors } from '@/constants/theme'
import { addDays, format, startOfWeek } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type DayProps = {
  date: Date
  isSelected: boolean
  onSelect: (date: Date) => void
}

export function Day({ date, isSelected, onSelect }: DayProps) {
  const dayOfWeek = format(date, 'EEEEE', { locale: ptBR }).toUpperCase()
  const dayOfMonth = format(date, 'd')

  return (
    <TouchableOpacity
      style={[styles.dayContainer, isSelected && styles.selectedDay]}
      onPress={() => onSelect(date)}
    >
      <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{dayOfWeek}</Text>
      <View style={[styles.dateCircle, isSelected && styles.selectedDateCircle]}>
        <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>{dayOfMonth}</Text>
      </View>
    </TouchableOpacity>
  )
}

type HorizontalCalendarProps = {
  onDateSelect: (date: Date) => void
}

export function HorizontalCalendar({ onDateSelect }: HorizontalCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [weekDates, setWeekDates] = useState<Date[]>([])

  useEffect(() => {
    const today = new Date()
    const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 0 })
    const dates = Array.from({ length: 15 }, (_, i) => addDays(startOfCurrentWeek, i))
    setWeekDates(dates)
  }, [])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    onDateSelect(date)
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {weekDates.map(date => (
        <Day
          key={date.toISOString()}
          date={date}
          isSelected={date.toDateString() === selectedDate.toDateString()}
          onSelect={handleDateSelect}
        />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 15,
    maxHeight: 100,
  },
  dayContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  dayText: {
    fontSize: 14,
    color: colors.white,
    marginBottom: 4,
  },
  dateCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.white,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    color: colors.white,
  },
  selectedDay: {
    opacity: 1,
  },
  selectedDateCircle: {
    backgroundColor: colors.primary,
    borderStyle: 'solid',
  },
  selectedDayText: {
    fontWeight: 'bold',
  },
  selectedDateText: {
    color: colors.black,
  },
})

import { colors } from '@/constants/theme'
import type { ConfirmationModalProps } from '@/types'
import { Modal, StyleSheet, View } from 'react-native'
import { Button } from './Button'
import { Typo } from './Typo'

export function ConfirmationModal({
  visible,
  title,
  message,
  onConfirm,
  onClose,
  confirmText = 'Deletar',
  cancelText = 'Cancelar',
  loading = false,
}: ConfirmationModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Typo size={22} fontWeight="bold" color={colors.rose} style={{ textAlign: 'center' }}>
            {title}
          </Typo>

          <Typo size={14} color={colors.neutral100} style={{ textAlign: 'center' }}>
            {message}
          </Typo>

          <View style={styles.buttonContainer}>
            <Button style={{ flex: 1, backgroundColor: colors.neutral300 }} onPress={onClose}>
              <Typo color={colors.neutral900} size={18} fontWeight="bold">
                {cancelText}
              </Typo>
            </Button>

            <Button
              style={{ flex: 1, backgroundColor: colors.rose }}
              onPress={onConfirm}
              loading={loading}
            >
              <Typo color={colors.neutral100} size={18} fontWeight="bold">
                {confirmText}
              </Typo>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.neutral800,
    borderRadius: 20,
    padding: 20,
    width: '80%',
    gap: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
})

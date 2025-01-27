import { colors } from '@/constants/theme'
import type { LogoutModalProps } from '@/types'
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { Button } from './Button'
import { Typo } from './Typo'

export function LogoutModal({ visible, onClose, onConfirm }: LogoutModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Typo size={22} fontWeight="bold" color={colors.rose} style={{ textAlign: 'center' }}>
              Are you sure?
            </Typo>
            <Typo
              size={14}
              color={colors.neutral100}
              fontWeight="400"
              style={{ textAlign: 'center' }}
            >
              Do you really want to log out? You will need to sign in again to access your account.
            </Typo>

            <View style={styles.buttonContainer}>
              <Button style={{ flex: 1, backgroundColor: colors.neutral300 }} onPress={onClose}>
                <Typo
                  color={colors.neutral900}
                  size={18}
                  fontWeight="bold"
                  style={{ textAlign: 'center' }}
                >
                  Cancel
                </Typo>
              </Button>

              <Button style={{ flex: 1, backgroundColor: colors.rose }} onPress={onConfirm}>
                <Typo
                  color={colors.neutral100}
                  size={18}
                  fontWeight="bold"
                  style={{ textAlign: 'center' }}
                >
                  Log Out
                </Typo>
              </Button>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: colors.neutral800,
    borderRadius: 20,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
})

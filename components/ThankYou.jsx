import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ThankYou = () => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.thankYouModalView}>
        <Text style={styles.thankYouText}>Thank You!</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ThankYou;

const styles = StyleSheet.create({
  thankYouModalView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  thankYouText: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 20,
    color: "white",
  },

  // ... other styles ...
});

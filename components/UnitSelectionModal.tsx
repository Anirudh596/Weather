import React, { useState } from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";
import { useTemperature } from "@/hooks/TemperatureContext";

interface UnitSelectionModalProps {
  visible: boolean;
  onClose: () => void;
}

const UnitSelectionModal: React.FC<UnitSelectionModalProps> = ({
  visible,
  onClose,
}) => {
  const { unit, toggleUnit } = useTemperature();

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Select Temperature Unit</Text>
          <Button
            title={`Current: ${unit} (Tap to switch)`}
            onPress={() => {
              toggleUnit();
              onClose();
            }}
          />
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default UnitSelectionModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
});

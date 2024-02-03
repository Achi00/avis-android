import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";

const cardValues = [
  {
    key: "customer_focus",
    label: "Customer Focus",
    BgColor: "#00629F",
    textColor: "#dc9346",
  },
  {
    key: "ownership",
    label: "Ownership",
    BgColor: "#f5a623",
    textColor: "#D4002A",
  },
  {
    key: "innovation",
    label: "Innovation",
    BgColor: "#e1ded9",
    textColor: "#00629f",
  },
  {
    key: "integrity",
    label: "Integrity",
    BgColor: "#65615D",
    textColor: "#e1ded9",
  },
  {
    key: "passion",
    label: "Passion",
    BgColor: "#d0021b",
    textColor: "#fff",
  },
];

const cardsWithDummy =
  cardValues.length % 2 === 0
    ? cardValues
    : [...cardValues, { key: "dummy", BgColor: "transparent" }];

const Cards = ({ userId, onSelect, setShowCards }) => {
  const renderCard = ({ item }) => {
    // Handle the dummy card
    if (item.key === "dummy") {
      return <View style={[styles.card, { backgroundColor: item.BgColor }]} />;
    }

    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: item.BgColor }]}
        onPress={() => onSelect(userId, item.key)}
      >
        <Text style={[styles.cardText, { color: item.textColor }]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Modal transparent={true} animationType="slide" visible={true}>
      <View style={styles.modalView}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.headerText}>AVIS</Text>
        </View>
        <View style={styles.cardContainer}>
          {cardsWithDummy.map((card) => renderCard({ item: card }))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "red",
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    margin: 10,
    width: "45%", // Adjust this value to account for the margin
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: "white",
  },
});

export default Cards;

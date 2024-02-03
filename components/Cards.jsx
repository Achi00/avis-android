import { useState } from "react";
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

const Cards = ({ userId, onSelect, setShowCards }) => {
  const [showThankYou, setShowThankYou] = useState(false);
  const closeCards = () => {
    setShowCards(false);
  };
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={true}
      onRequestClose={closeCards} // Android requires this
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>AVIS</Text>
          <TouchableOpacity style={styles.closeButton} onPress={closeCards}>
            <Text style={styles.closeButtonText}>←</Text>
          </TouchableOpacity>
        </View>
        {cardValues.map((card) => (
          <TouchableOpacity
            key={card.key}
            style={[styles.card, { backgroundColor: card.BgColor }]}
            onPress={() => onSelect(userId, card.key)}
          >
            <Text style={[styles.cardText, { color: card.textColor }]}>
              {card.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    paddingTop: 150,
  },
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "red",
    padding: 15,
    zIndex: 1,
  },
  headerText: {
    textAlign: "left",
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
  },
  card: {
    margin: 10,
    padding: 20,
    width: 250,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeButton: {
    position: "absolute",
    top: -20,
    right: 20,
    padding: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 54,
    fontWeight: "bold",
    color: "white",
  },
});

export default Cards;

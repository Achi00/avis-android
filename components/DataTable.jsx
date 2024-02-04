import React, { useState, useEffect, useCallback, memo } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
} from "react-native";
import { styles, cardStyles, thankYouStyles } from "../styles/index";
import Cards from "./Cards";

const TableHeader = () => (
  <View style={styles.headerRow}>
    <Text style={[styles.headerCell, styles.nameHeader]}>Ονοματεπώνυμο</Text>
    <Text style={[styles.headerCell, styles.divisionHeader]}>Διεύθυνση</Text>
    <Text style={[styles.headerCell, styles.locationHeader]}>Τοποθεσία</Text>
  </View>
);

const UserRow = memo(({ name, division, location }) => (
  <View style={styles.row}>
    <Text style={styles.cell}>{name}</Text>
    <Text style={styles.cell}>{division}</Text>
    <Text style={styles.cell}>{location}</Text>
  </View>
));

const debounce = (func, delay) => {
  let inDebounce;
  return function (...args) {
    const context = this;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

const DataTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const [showCards, setShowCards] = useState(false);
  // search
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://192.168.100.198:8080/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to load users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(users); // Initialize filtered users
  }, [users]);

  const debouncedSearch = useCallback(
    debounce((searchText) => {
      if (searchText) {
        const filtered = users.filter((user) =>
          user.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredUsers(filtered);
      } else {
        setFilteredUsers(users);
      }
    }, 300),
    [users] // Add `users` as a dependency
  );

  useEffect(() => {
    debouncedSearch(searchText);
  }, [searchText, debouncedSearch]);

  // Update handleSearchChange to only update the searchText state
  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const handleRowClick = useCallback((userId) => {
    setSelectedUserId(userId);
    setShowCards(true);
  }, []);

  // Close the thank you modal
  const closeThankYouModal = () => {
    setShowThankYou(false);
  };

  // update value in database after user chooses card
  const handleCardSelect = async (userId, cardValue) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://192.168.100.198:8080/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ value: cardValue }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Clone the response before reading it
      const clonedResponse = response.clone();

      // Now you can read the response text for logging
      const responseText = await clonedResponse.text();

      // And you can still read the response as JSON afterward
      const updatedUser = await response.json();

      // Update the client-side state
      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, ...updatedUser } : user
      );
      setUsers(updatedUsers);

      setShowThankYou(true); // Show the thank you message
    } catch (error) {
      console.error("Error updating interest:", error);
      // Handle the error, e.g., show an alert or set an error state
    }
    setLoading(false);
    setShowCards(false); // Hide the cards component regardless of the outcome
  };

  const renderItem = useCallback(
    ({ item }) => {
      const handlePress = () => handleRowClick(item.id);
      return (
        <TouchableOpacity onPress={handlePress}>
          <UserRow
            name={item.name}
            division={item.division}
            location={item.location}
          />
        </TouchableOpacity>
      );
    },
    [handleRowClick]
  );

  if (loading) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.fullscreen}>
      <View style={styles.header}>
        <Text style={styles.headerText}>AVIS</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={handleSearchChange}
        />
      </View>
      <TableHeader />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        initialNumToRender={10} // Adjust based on your needs
        maxToRenderPerBatch={10} // Adjust based on your needs
        windowSize={5} // Adjust based on your needs
      />

      {showCards && selectedUserId && (
        <Cards
          userId={selectedUserId}
          setShowCards={setShowCards}
          onSelect={handleCardSelect}
        />
      )}
      <ThankYouModal visible={showThankYou} onClose={closeThankYouModal} />
    </SafeAreaView>
  );
};

export default DataTable;

const ThankYouModal = ({ visible, onClose }) => {
  useEffect(() => {
    let timer;
    if (visible) {
      // Set a timer for 5 seconds
      timer = setTimeout(() => {
        onClose(); // Call the onClose function after 5 seconds
      }, 5000);
    }

    // Clean up the timer if the component unmounts or if visible changes
    return () => clearTimeout(timer);
  }, [visible, onClose]);
  return (
    <SafeAreaView>
      <Modal
        transparent={true}
        visible={visible}
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={thankYouStyles.centeredView}>
          <View style={thankYouStyles.thankYouHeader}>
            <Text style={thankYouStyles.thankYouHeaderText}>AVIS</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={thankYouStyles.thankYouButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
          <Text style={thankYouStyles.thankYouText}>Thank You!</Text>
          <TouchableOpacity
            style={thankYouStyles.thankYouButton}
            onPress={onClose}
          >
            <Text style={thankYouStyles.thankYouButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

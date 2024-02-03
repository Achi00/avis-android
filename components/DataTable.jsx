import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { styles, cardStyles } from "../styles/index";
import Cards from "./Cards";

const TableHeader = () => (
  <View style={styles.headerRow}>
    <Text style={[styles.headerCell, styles.nameHeader]}>Name</Text>
    <Text style={[styles.headerCell, styles.divisionHeader]}>Division</Text>
    <Text style={[styles.headerCell, styles.locationHeader]}>Location</Text>
  </View>
);

const UserRow = ({ name, division, location }) => (
  <View style={styles.row}>
    <Text style={styles.cell}>{name}</Text>
    <Text style={styles.cell}>{division}</Text>
    <Text style={styles.cell}>{location}</Text>
  </View>
);

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

  const handleRowClick = (userId) => {
    setSelectedUserId(userId);
    setShowCards(true);
    console.log("clicked");
  };

  const handleCardSelect = (userId, value) => {
    // Handle card selection logic
    console.log("Card Selected", `User ID: ${userId}, Value: ${value}`);
    setShowCards(false);
  };

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
          onChangeText={setSearchText}
        />
      </View>
      <TableHeader />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRowClick(item.id)}>
            <UserRow
              name={item.name}
              division={item.division}
              location={item.location}
            />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      {showCards && selectedUserId && (
        <View style={cardStyles.container}>
          <Cards
            userId={selectedUserId}
            setShowCards={setShowCards}
            onSelect={handleCardSelect}
          />
          {/* <Text>Nadasdasdsadsme</Text> */}
        </View>
      )}
    </SafeAreaView>
  );
};

export default DataTable;

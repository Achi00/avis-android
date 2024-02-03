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

// Mocking a simplified Cards component
const Cards = ({ userId, onSelect }) => {
  // Placeholder for card selection logic
  return (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.name]}>{name}</Text>
      <Text style={[styles.cell, styles.division]}>{division}</Text>
      <Text style={[styles.cell, styles.location]}>{location}</Text>
    </View>
  );
};

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
  };

  const handleCardSelect = (userId, value) => {
    // Handle card selection logic
    Alert.alert("Card Selected", `User ID: ${userId}, Value: ${value}`);
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

      <FlatList
        data={filteredUsers} // Use filteredUsers here
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <>
            <TableHeader />
            <UserRow
              name={item.name}
              division={item.division}
              location={item.location}
            />
          </>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullscreen: {
    // position: "absolute",
    width: "100%",
    height: "100vh",
    backgroundColor: "#e1ded9",
    flex: 1,
  },
  header: {
    backgroundColor: "red",
    padding: 20,
  },
  headerText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  searchContainer: {
    alignItems: "center",
    padding: 8, // or adjust to your preference
  },
  searchInput: {
    height: 40,
    marginHorizontal: 12,
    marginVertical: 8,
    borderWidth: 1,
    padding: 10,
    width: "50%",
    borderRadius: 10,
    borderColor: "grey",
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "center",
  },
  cell: {
    flex: 1, // Each cell will take up an equal amount of space
    fontSize: 16,
    color: "black",
    padding: 4, // Add padding as needed
  },
  name: {
    flex: 2, // Allocate more space for the name, if desired
  },
  division: {
    flex: 1,
  },
  location: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default DataTable;

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  fullscreen: {
    // position: "absolute",
    width: "100%",
    height: "100vh",
    backgroundColor: "#e1ded9",
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8", // Light grey background for header row
    paddingVertical: 10, // Vertical padding for header row
    // paddingHorizontal: 15, // Horizontal padding for consistency
  },
  headerCell: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    paddingRight: 100, // Center align header text
  },
  // Adjusting these to be specific to make sure it matches the data row
  nameHeader: {
    flex: 2, // Allocate twice the space for name column
  },
  divisionHeader: {
    flex: 1, // Allocate space for division column
  },
  locationHeader: {
    flex: 1, // Allocate space for location column
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
    padding: 8,
  },
  searchInput: {
    height: 40,
    marginHorizontal: 12,
    marginVertical: 8,
    borderWidth: 1,
    padding: 10,
    width: "90%", // Make the search bar wider
    alignSelf: "center", // Center the search bar in the screen
    borderRadius: 10,
    borderColor: "grey",
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "white", // Ensure row background is white
  },
  cell: {
    flex: 1, // Each cell will take up an equal amount of space
    fontSize: 16,
    color: "black",
    textAlign: "center", // Center align text within cells
  },
  name: {
    flex: 2, // Allocate twice the space for name column, matching header
  },
  division: {
    flex: 1, // Matching header
  },
  location: {
    flex: 1, // Matching header
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
export const cardStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, // This will cover the entire screen
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
    zIndex: 10, // Make sure it's above everything else
  },
  headerText: {
    fontSize: 40,
    color: "white", // Make sure the text is visible
  },
});

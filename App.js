import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import DataTable from "./components/DataTable";

export default function App() {
  console.log("hi");
  return (
    <View style={styles.container}>
      <DataTable />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

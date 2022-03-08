import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { GlobalStyles } from './App.style';
import { AppNavigation } from './src/navigation';
import { store } from "./src/redux/store";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <StatusBar style='auto' />
        <AppNavigation />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: GlobalStyles.statusBarHeight,
  },
});

// src/components/ErrorScreen.tsx

import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type ErrorScreenProps = {
  message?: string;
  onRetry?: () => void;
};

const ErrorScreen: React.FC<ErrorScreenProps> = ({
  message = "Something went wrong.",
  onRetry,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <MaterialIcons name="error-outline" size={64} color="#E53E3E" />
        <Text style={styles.title}>Oops!</Text>
        <Text style={styles.message}>{message}</Text>
        {onRetry && (
          <TouchableOpacity
            style={styles.button}
            onPress={onRetry}
            testID="retry-button"
          >
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 16,
    color: "#E53E3E",
  },
  message: {
    fontSize: 16,
    color: "#555555",
    textAlign: "center",
    marginTop: 8,
  },
  button: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: "#E53E3E",
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ErrorScreen;

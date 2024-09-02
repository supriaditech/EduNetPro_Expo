import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";

export default function Pembahasan() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleStyle}>Pembahasan</Text>
      <View style={styles.contentContainer}>
        <View style={styles.cardStyle}>
          <ScrollView>
            <Text style={styles.questionTitle}>Soal Pertama</Text>
            <Text style={styles.questionText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum...
            </Text>
          </ScrollView>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.promptText}>
          Jika Masih Ada Pertanyaan Silahkan Ajukan di Kolom Berikut Ini:
        </Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Silahkan Masukkan Pertanyaan Anda"
            style={styles.textInput}
          />
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Kirim</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#043259",
  },
  titleStyle: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: "#FFFFFF",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  contentContainer: {
    paddingHorizontal: 20,
    flex: 2,
    height: "100%",
  },
  cardStyle: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
    height: "100%",
  },
  questionTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    textAlign: "justify",
  },
  questionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    textAlign: "justify",
  },
  inputContainer: {
    padding: 20,
    gap: 8,
  },
  promptText: {
    fontFamily: "Poppins-Medium",
    color: "#FFFFFF",
    fontSize: 12,
  },
  inputWrapper: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  textInput: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    flex: 4,
  },
  submitButton: {
    backgroundColor: "#00B50C",
    flex: 1,
    padding: 8,
    borderRadius: 4,
  },
  submitButtonText: {
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    fontSize: 12,
    color: "#FFFFFF",
  },
});

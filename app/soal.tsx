import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import materiData from "../materi.json"; // Pastikan path file sesuai
import { useLocalSearchParams } from "expo-router";

export default function Soal() {
  let { id } = useLocalSearchParams();
  if (Array.isArray(id)) {
    id = id[0];
  }
  const materi = materiData.materi.find((item) => item.id === parseInt(id));

  if (!materi) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleStyle}>Materi tidak ditemukan</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleStyle}>Soal</Text>
      <ScrollView style={styles.scrollViewStyle}>
        {materi.soal.map((soal, index) => (
          <View key={soal.id} style={styles.cardStyle}>
            <Text style={{ fontFamily: "Poppins-Bold" }}>
              Soal No. {index + 1}
            </Text>
            <Text style={{ fontFamily: "Poppins-Regular", fontSize: 12 }}>
              {soal.pertanyaan}
            </Text>
            {/* Pilihan Ganda */}
            {Object.entries(soal.pilihan).map(([key, value]) => (
              <View key={key} style={styles.optionContainer}>
                <Text style={{ fontFamily: "Poppins-Regular", fontSize: 12 }}>
                  {key}.{"  "}
                </Text>
                <Text style={{ fontFamily: "Poppins-Regular", fontSize: 12 }}>
                  {value}
                </Text>
              </View>
            ))}
          </View>
        ))}
        <TouchableOpacity>
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Kirim</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
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
  scrollViewStyle: {
    paddingHorizontal: 20,
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
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  submitButtonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    textAlign: "center",
    color: "#043259",
  },
});

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import materiData from "../materi.json"; // Pastikan path file sesuai

export default function ListMateri() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.titleStyle}>Daftar Materi</Text>

      {/* Search Materi */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="Cari Materi..." style={styles.inputStyle} />
      </View>

      {/* List Materi */}
      <ScrollView
        style={styles.scrollViewStyle}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Card */}
        {materiData.materi.map((materi) => (
          <Link
            href={{ pathname: "/materi", params: { id: materi.id } }}
            asChild
            key={materi.id}
          >
            <TouchableOpacity>
              <View style={styles.cardStyle}>
                {/* Image */}
                <View style={styles.imageStyle}>
                  <Text>Image</Text>
                </View>
                {/* Judul Materi */}
                <Text style={styles.materiTitle}>{materi.judul}</Text>

                {/* Desc */}
                <Text style={styles.textDescStyle}>{materi.desc}</Text>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleStyle: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: "#FFFFFF",
    paddingHorizontal: 20,
  },
  searchContainer: {
    paddingHorizontal: 20,
  },
  scrollViewStyle: {
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    rowGap: 20,
  },
  cardStyle: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    gap: 8,
  },
  inputStyle: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#043259",
    gap: 20,
  },
  imageStyle: {
    aspectRatio: 16 / 9,
    backgroundColor: "green",
    borderRadius: 10,
  },
  materiTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
  },
  textDescStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    textAlign: "justify",
  },
});

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import materiData from "../materi.json"; // Pastikan path file sesuai
import { images } from "../assets/images";

export default function ListMateri() {
  const [searchQuery, setSearchQuery] = useState(""); // State untuk menyimpan query pencarian

  // Filter materi berdasarkan judul yang sesuai dengan searchQuery
  const filteredMateri = materiData.materi.filter((materi: any) =>
    // eslint-disable-next-line prettier/prettier
    materi.judul.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.titleStyle}>Daftar Materi</Text>

      {/* Search Materi */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Cari Materi..."
          style={styles.inputStyle}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)} // Update state saat user mengetik
        />
      </View>

      {/* List Materi */}
      <ScrollView
        style={styles.scrollViewStyle}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Jika tidak ada hasil pencarian */}
        {filteredMateri.length === 0 ? (
          <Text style={styles.noResultText}>
            Tidak ada materi yang ditemukan.
          </Text>
        ) : (
          filteredMateri.map((materi: any) => (
            <Link
              href={{ pathname: "/materi", params: { id: materi.id } }}
              asChild
              key={materi.id}
            >
              <TouchableOpacity>
                <View style={styles.cardStyle}>
                  {/* Image */}
                  <View style={styles.imageStyle}>
                    <Image
                      source={images[materi.image]}
                      alt="gambar"
                      resizeMode="cover"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </View>
                  {/* Judul Materi */}
                  <Text style={styles.materiTitle}>{materi.judul}</Text>

                  {/* Desc */}
                  <Text style={styles.textDescStyle}>{materi.desc}</Text>
                </View>
              </TouchableOpacity>
            </Link>
          ))
        )}
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
    marginBottom: 20,
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
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    overflow: "hidden",
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
  noResultText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 20,
  },
});

import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import materiData from "../materi.json"; // Pastikan path file sesuai

export default function Materi() {
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
      <Text style={styles.titleStyle}>Detail Materi</Text>

      <ScrollView
        style={styles.scrollViewStyle}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View key={materi.id} style={styles.cardStyle}>
          <Text style={styles.materiTitle}>{materi.judul}</Text>
          {materi.subBab.map((subBab: any) => (
            <View key={subBab.id} style={styles.subBabContainer}>
              <Text style={styles.subBabTitle}>{subBab.judul}</Text>
              {subBab.konten.map((konten: any, index: number) => {
                if (konten.tipe === "paragraf") {
                  return (
                    <Text key={index} style={styles.paragrafText}>
                      {"\t"} {"\t"} {"\t"}
                      {konten.isi}
                    </Text>
                  );
                } else if (konten.tipe === "poin") {
                  return (
                    <View key={index} style={styles.poinContainer}>
                      <Text style={styles.poinTitle}>{konten.judul}</Text>
                      {konten.subPoin?.map((sub: any, subIndex: number) => (
                        <View key={subIndex}>
                          <Text style={styles.subPoinTitle}>• {sub.judul}</Text>
                          <Text style={styles.paragrafText}>
                            {"\t"} {"\t"} {"\t"}
                            {sub.isi}
                          </Text>
                          {sub.gambar && (
                            <Image
                              source={{ uri: sub.gambar }}
                              style={styles.imageStyle}
                            />
                          )}
                        </View>
                      ))}
                      {konten.gambar?.map(
                        (gambar: any, gambarIndex: number) => (
                          <Image
                            key={gambarIndex}
                            source={{ uri: gambar }}
                            style={styles.imageStyle}
                          />
                        ),
                      )}
                    </View>
                  );
                } else if (konten.tipe === "numbering") {
                  return (
                    <View key={index} style={styles.numberingContainer}>
                      {konten.items.map((item: any, itemIndex: number) => (
                        <View key={itemIndex} style={styles.numberingItem}>
                          <Text style={styles.numberingTitle}>
                            {item.number}. {item.judul}
                          </Text>
                          <Text style={styles.paragrafText}>
                            {"\t"} {"\t"} {"\t"}
                            {item.isi}
                          </Text>
                        </View>
                      ))}
                    </View>
                  );
                } else if (konten.tipe === "gambar") {
                  return (
                    <Image
                      key={index}
                      source={{ uri: konten.gambar }}
                      style={styles.imageStyle}
                    />
                  );
                }
                return null;
              })}
            </View>
          ))}
          <Link href={{ pathname: "/soal", params: { id: materi.id } }} asChild>
            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: "#043259",
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins-Bold",
                    fontSize: 16,
                    textAlign: "center",
                    color: "#FFFFFF",
                  }}
                >
                  Lihat Soal
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        </View>
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
  scrollViewContent: {
    rowGap: 32,
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
  materiTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    marginBottom: 10,
  },
  subBabContainer: {
    marginBottom: 10,
  },
  subBabTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    marginBottom: 5,
  },
  paragrafText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    textAlign: "justify",
    marginBottom: 5,
  },
  poinContainer: {
    marginBottom: 10,
  },
  poinTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    marginBottom: 5,
  },
  subPoinTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    marginBottom: 3,
  },
  numberingContainer: {
    marginBottom: 10,
  },
  numberingItem: {
    marginBottom: 5,
  },
  numberingTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    marginBottom: 3,
  },
  imageStyle: {
    width: "100%",
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
});

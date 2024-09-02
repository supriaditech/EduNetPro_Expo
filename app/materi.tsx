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
import { images } from "../assets/images";

type ImageKeys = keyof typeof images;

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
              <Text style={styles.subBabTitle}>{subBab.judulSubBab}</Text>
              {subBab.konten.map((konten: any, index: number) => {
                if (konten.tipe === "paragraf") {
                  return (
                    <View key={index}>
                      {konten.isi.map((paragraf: any) => (
                        <View key={paragraf.id}>
                          {paragraf.teks && (
                            <Text style={styles.paragrafText}>
                              {paragraf.teks}
                            </Text>
                          )}
                          {paragraf.gambar && (
                            <Image
                              source={images[paragraf.gambar as ImageKeys]}
                              style={styles.imageStyle}
                            />
                          )}
                        </View>
                      ))}
                    </View>
                  );
                } else if (konten.tipe === "point") {
                  return (
                    <View key={index} style={styles.poinContainer}>
                      {konten.items.map((item: any, itemIndex: number) => (
                        <View key={itemIndex}>
                          <Text style={styles.subPoinTitle}>
                            • {item.judul}
                          </Text>
                          {item.isi.map((poinIsi: any) => (
                            <View key={poinIsi.id}>
                              {poinIsi.teks && (
                                <Text style={styles.paragrafText}>
                                  {poinIsi.teks}
                                </Text>
                              )}
                              {poinIsi.gambar && (
                                <Image
                                  source={images[poinIsi.gambar]}
                                  style={styles.imageStyle}
                                />
                              )}
                            </View>
                          ))}
                        </View>
                      ))}
                    </View>
                  );
                } else if (konten.tipe === "numbering") {
                  return (
                    <View key={index} style={styles.numberingContainer}>
                      {konten.items.map((item: any, itemIndex: number) => (
                        <View key={itemIndex} style={styles.numberingItem}>
                          <Text style={styles.numberingTitle}>
                            {index}. {item.judul}
                          </Text>
                          {item.isi.map((numberIsi: any) => (
                            <View key={numberIsi.id}>
                              {numberIsi.teks && (
                                <Text style={styles.paragrafText}>
                                  {numberIsi.teks}
                                </Text>
                              )}
                              {numberIsi.gambar && (
                                <Image
                                  source={images[numberIsi.gambar]}
                                  style={styles.imageStyle}
                                />
                              )}
                            </View>
                          ))}
                        </View>
                      ))}
                    </View>
                  );
                }
                return null;
              })}
            </View>
          ))}
          <Link href={{ pathname: "/soal", params: { id: materi.id } }} asChild>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkButtonText}>Lihat Soal</Text>
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
  linkButton: {
    backgroundColor: "#043259",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  linkButtonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    textAlign: "center",
    color: "#FFFFFF",
  },
});

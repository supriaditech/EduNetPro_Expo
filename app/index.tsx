import { Link } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
          padding: 20,
        }}
      >
        <View>
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 250, height: 250, aspectRatio: 1 / 1 }}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 20,
              textAlign: "center",
              color: "#043259",
            }}
          >
            Selamat Datang di Aplikasi {"\n"} Edu Net Pro!
          </Text>
        </View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 32,
            paddingVertical: 8,
            backgroundColor: "#043259",
            borderRadius: 8,
          }}
        >
          <Link href={"/list-materi"}>
            <Text
              style={{
                color: "#FFFFFF",
                fontFamily: "Poppins-Bold",
                fontSize: 18,
              }}
            >
              Mari Mulai Belajar
            </Text>
          </Link>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#FFFFFF",
  },
});

import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Button,
  Pressable,
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
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 32,
            paddingVertical: 8,
            backgroundColor: "#043259 ",
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontFamily: "Poppins-Bold",
              fontSize: 18,
            }}
          >
            Mari Mulai Belajar
          </Text>
        </Pressable>
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

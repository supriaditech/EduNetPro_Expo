import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Api from "@/service/Api";

export default function Pembahasan() {
  const { pembahasanData } = useLocalSearchParams(); // Ambil parameter pembahasanData
  const [pertanyakan, setPertanyakan] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [jawaban, setJawaban] = useState("");
  // Parse kembali data JSON yang dikirim sebagai string

  // Decode dan parse id menjadi objek JavaScript
  let soal = null;
  if (typeof pembahasanData === "string") {
    try {
      soal = JSON.parse(decodeURIComponent(pembahasanData));
    } catch (e) {
      console.error("Failed to parse soal:", e);
    }
  } else if (Array.isArray(pembahasanData)) {
    // Jika 'pembahasanData' adalah array, kita ambil elemen pertama
    try {
      soal = JSON.parse(decodeURIComponent(pembahasanData[0]));
    } catch (e) {
      console.error("Failed to parse soal:", e);
    }
  }

  const handleJawab = async () => {
    setJawaban("Loading...");
    setLoading(true);
    const api = new Api();
    api.url = "artficial-intelegence/ask";
    api.body = {
      prompt: pertanyakan,
    };
    try {
      const resp = await api.call();

      // Jika respons mengandung JSON sebagai string, kita perlu mem-parsing
      if (resp && resp.data) {
        setJawaban(resp.data);
        // Arahkan ke halaman pembahasan dengan data pembahasan

        setLoading(false);
      } else {
        console.error("No data found in response");
        setLoading(false);
      }
    } catch (e) {
      console.error("API call failed:", e);
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleStyle}>Pembahasan</Text>
      <View style={styles.contentContainer}>
        <View style={styles.cardStyle}>
          {pertanyakan === "" ? (
            <ScrollView>
              <Text style={styles.questionTitle}>Soal Pembahasan</Text>
              <Text style={styles.questionText}>
                <Text style={styles.boldText}>Pertanyaan: </Text>
                {soal.pertanyaan}
              </Text>

              <Text style={styles.questionText}>
                Jawaban Benar: {soal.benar}
              </Text>
              <Text style={styles.questionText}>
                <Text style={styles.boldText}>Jawaban: </Text>{" "}
                {soal.jawaban.key}. {soal.jawaban.text}
              </Text>
              {/* {renderJawaban(soal)} */}
              <Text style={styles.questionText}>
                <Text style={styles.boldText}>Pembahasan: </Text>
                {soal.pembahasan}
              </Text>
            </ScrollView>
          ) : (
            <ScrollView>
              <Text style={styles.questionText2}>{pertanyakan}</Text>
              <Text style={styles.questionText3}>{jawaban}</Text>
            </ScrollView>
          )}
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
            value={pertanyakan}
            onChangeText={(text) => setPertanyakan(text)}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => handleJawab()}
          >
            {loading && <ActivityIndicator />}
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
  questionText2: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    textAlign: "justify",
    backgroundColor: "#26E467",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  questionText3: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    textAlign: "justify",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 0.5,
  },
  boldText: {
    fontFamily: "Poppins-Bold",
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    fontSize: 12,
    color: "#FFFFFF",
  },
});

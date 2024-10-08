import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import materiData from "../materi.json"; // Pastikan path file sesuai
import { useLocalSearchParams, useRouter } from "expo-router";
import Api from "@/service/Api";

interface SelectedAnswers {
  [key: string]: string;
}

export default function Soal() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  let { id } = useLocalSearchParams();
  if (Array.isArray(id)) {
    id = id[0];
  }
  const materi = materiData.materi.find((item) => item.id === parseInt(id));

  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
  const [submitted, setSubmitted] = useState(false);
  if (!materi) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleStyle}>Soal tidak ditemukan</Text>
      </SafeAreaView>
    );
  }

  const handleAnswerSelect = (questionId: number, key: string) => {
    if (!submitted) {
      setSelectedAnswers({
        ...selectedAnswers,
        [questionId]: key,
      });
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handlePembahasan = async (soal: any) => {
    setLoading(true);
    const api = new Api();
    api.url = "artficial-intelegence/ask";
    api.body = {
      prompt: `Saya memiliki pertanyaan berikut: "${soal.pertanyaan}". Jawaban yang benar adalah "${soal.kunciJawaban}". Berikut adalah opsi jawabannya: ${soal.opsi.map((o: any) => `(${o.key}) ${o.teks}`).join(", ")}. Saya ingin Anda memberikan penjelasan secara detail dalam format JSON seperti ini: { "pertanyaan": "${soal.pertanyaan}", "jawaban": " jawabnnya pilih dari opsi yang benar serta tampilkan key nya dan text nya", "pembahasan": "Pembahasan detail berdasarkan soal tersebut" }.`,
    };
    try {
      const resp = await api.call();

      // Jika respons mengandung JSON sebagai string, kita perlu mem-parsing
      if (resp && resp.data) {
        const parsedData = JSON.parse(resp.data); // Parse string JSON menjadi objek

        // Arahkan ke halaman pembahasan dengan data pembahasan
        router.push({
          pathname: "/pembahasan",
          params: {
            pembahasanData: JSON.stringify(parsedData), // Kirim data sebagai string JSON
          },
        });
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
      <Text style={styles.titleStyle}>Soal</Text>
      <ScrollView style={styles.scrollViewStyle}>
        {materi.soal.map((soal, index) => {
          const userAnswer = selectedAnswers[soal.id];
          const isCorrect = userAnswer === soal.kunciJawaban;

          return (
            <View key={soal.id} style={styles.cardStyle}>
              <Text style={styles.questionNumber}>Soal No. {index + 1}</Text>
              <Text style={styles.questionText}>{soal.pertanyaan}</Text>
              {soal.opsi.map((option) => {
                const isSelected = selectedAnswers[soal.id] === option.key;
                const isCorrectAnswer = option.key === soal.kunciJawaban;

                return (
                  <TouchableOpacity
                    key={option.key}
                    style={[
                      styles.optionContainer,
                      submitted && isCorrectAnswer && styles.correctOption,
                      submitted &&
                        isSelected &&
                        !isCorrect &&
                        styles.incorrectOption,
                      isSelected && !submitted && styles.selectedOption,
                    ]}
                    onPress={() => handleAnswerSelect(soal.id, option.key)}
                  >
                    <Text style={styles.optionText}>
                      {option.key}. {option.teks}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {submitted && (
                <View style={styles.resultContainer}>
                  <View
                    style={[
                      styles.resultBox,
                      { backgroundColor: isCorrect ? "#d4edda" : "#f8d7da" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.resultText,
                        { color: isCorrect ? "#155724" : "#721c24" },
                      ]}
                    >
                      {isCorrect ? "Jawaban Kamu Benar" : "Jawaban Kamu Salah"}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.discussionButton}
                    onPress={() => handlePembahasan(soal)}
                  >
                    {loading ? (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <ActivityIndicator />
                        <Text style={styles.discussionButtonText}>
                          Lihat Pembahasan
                        </Text>
                      </View>
                    ) : (
                      <Text style={styles.discussionButtonText}>
                        Lihat Pembahasan
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}
        <TouchableOpacity onPress={handleSubmit}>
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
  questionNumber: {
    fontFamily: "Poppins-Bold",
  },
  questionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    textAlign: "justify",
  },
  optionContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
  },
  optionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  selectedOption: {
    backgroundColor: "#c0e8f9",
  },
  correctOption: {
    backgroundColor: "#d4edda",
  },
  incorrectOption: {
    backgroundColor: "#f8d7da",
  },
  resultContainer: {
    paddingVertical: 20,
    gap: 8,
  },
  resultBox: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  resultText: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  discussionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#043259",
    borderRadius: 4,
  },
  discussionButtonText: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#FFFFFF",
  },
  submitButton: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  submitButtonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    textAlign: "center",
    color: "#043259",
  },
});

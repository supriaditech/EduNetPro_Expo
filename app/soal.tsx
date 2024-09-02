import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import materiData from "../materi.json"; // Pastikan path file sesuai
import { useLocalSearchParams } from "expo-router";

export default function Soal() {
  let { id } = useLocalSearchParams();
  if (Array.isArray(id)) {
    id = id[0];
  }
  const materi = materiData.materi.find((item) => item.id === parseInt(id));

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!materi) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleStyle}>Soal tidak ditemukan</Text>
      </SafeAreaView>
    );
  }

  const handleAnswerSelect = (questionId: any, key: any) => {
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleStyle}>Soal</Text>
      <ScrollView style={styles.scrollViewStyle}>
        {materi.soal.map((soal, index) => {
          const userAnswer = selectedAnswers[soal.id];
          const isCorrect = userAnswer === soal.kunciJawaban;

          return (
            <View key={soal.id} style={styles.cardStyle}>
              <Text style={{ fontFamily: "Poppins-Bold" }}>
                Soal No. {index + 1}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 12,
                  textAlign: "justify",
                }}
              >
                {soal.pertanyaan}
              </Text>
              {/* Pilihan Ganda */}
              {soal.opsi.map((option) => {
                const isSelected = selectedAnswers[soal.id] === option.key;
                const isCorrectAnswer = option.key === soal.kunciJawaban;

                return (
                  <TouchableOpacity
                    key={option.key}
                    style={[
                      styles.optionContainer,
                      submitted && isCorrectAnswer && styles.correctOption, // Highlight jawaban yang benar
                      submitted &&
                        isSelected &&
                        !isCorrect &&
                        styles.incorrectOption, // Highlight jawaban yang salah
                      isSelected && !submitted && styles.selectedOption, // Highlight jawaban yang dipilih sebelum dikirim
                    ]}
                    onPress={() => handleAnswerSelect(soal.id, option.key)}
                  >
                    <Text
                      style={{ fontFamily: "Poppins-Regular", fontSize: 12 }}
                    >
                      {option.key}. {option.teks}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {submitted && (
                <View style={{ paddingVertical: 20, gap: 8 }}>
                  {/* Koreksi */}
                  <View
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      backgroundColor: isCorrect ? "#d4edda" : "#f8d7da",
                      borderRadius: 4,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 12,
                        fontFamily: "Poppins-Regular",
                        color: isCorrect ? "#155724" : "#721c24",
                      }}
                    >
                      {isCorrect ? "Jawaban Kamu Benar" : "Jawaban Kamu Salah"}
                    </Text>
                  </View>
                  {/* Lihat Pembahasan */}
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      backgroundColor: "#043259",
                      borderRadius: 4,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 12,
                        fontFamily: "Poppins-Regular",
                        color: "#FFFFFF",
                      }}
                    >
                      Lihat Pembahasan
                    </Text>
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
  optionContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
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

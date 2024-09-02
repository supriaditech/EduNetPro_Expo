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
import { Link, useLocalSearchParams } from "expo-router";

interface SelectedAnswers {
  [key: string]: string;
}

export default function Soal() {
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
                  <Link href={"/pembahasan"} asChild>
                    <TouchableOpacity style={styles.discussionButton}>
                      <Text style={styles.discussionButtonText}>
                        Lihat Pembahasan
                      </Text>
                    </TouchableOpacity>
                  </Link>
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
  },
  submitButtonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    textAlign: "center",
    color: "#043259",
  },
});

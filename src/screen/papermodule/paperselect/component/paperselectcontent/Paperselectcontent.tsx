import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
  ScrollView,
} from "react-native";
import { styles } from "./styles";
import { Icons } from "../../../../../assets/icons";
import { moderateScale } from "../../../../../utils/responsiveSize";
import { Colors } from "../../../../../theme";
import SupPower from "../../../../../component/SupPower";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

/* ===== TYPES ===== */
interface Question {
  id: string;
  label: string;
}

interface Chapter {
  id: number;
  title: string;
  chapterName: string;
  questions: Question[];
}

type SelectedSummary = {
  chapterId: number;
  questionId: string;
  questionMarks: string;
  selectedQuestions: number[];
};

interface Props {
  data: Chapter[];
  // handleNavigate: () => void
  handleNavigate: (payload: {
    chapterId: number;
    questionId: string;
    questionMarks: string;
    label: string;
  }) => void;
  activeChapterId: number | null;
  selectedSummary?: SelectedSummary;
}

/* ===== COMPONENT ===== */
const Paperselectcontent: React.FC<Props> = ({ data, handleNavigate, activeChapterId, selectedSummary }) => {

  // const [activeId, setActiveId] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<number | null>(activeChapterId); 

  useEffect(() => {
    setActiveId(activeChapterId);
  }, [activeChapterId]);

  const toggle = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveId(prev => (prev === id ? null : id));
  };

  if (!data?.length) {
    return <Text style={{ textAlign: "center", fontSize: moderateScale(14), color: Colors.black }}>No Data</Text>;
  }

  console.log('selectedSummary', selectedSummary)
  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.white }}>
      {data.map(item => {
        const isOpen = activeId === item.id;
        return (
          <View key={item.id} style={styles.wrapper}>
            {/* TITLE */}
            {/* <View style={{borderWidth:1, paddingVertical:moderateScale(1)}}> */}
            <TouchableOpacity
              style={styles.titleBox}
              activeOpacity={0.8}
              onPress={() => toggle(item.id)}
            >
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.chaptName}>{item.chapterName}</Text>
              </View>

              <Image
                source={Icons.downArrow}
                style={[
                  styles.arrow,
                  { transform: [{ rotate: isOpen ? "180deg" : "272deg" }] },
                ]}
              />
            </TouchableOpacity>
            {/* </View> */}

            {/* CONTENT */}
            {isOpen && (
              <View style={styles.contentBox}>
                {item.questions.map((question, index) => {
                  const isLast = index === item.questions.length - 1;
                  // console.log('maaaaaaaaa', question)

                  return (
                    <View key={question.id}>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        // onPress={handleNavigate}
                        onPress={() =>
                          handleNavigate({
                            chapterId: item.id,
                            questionId: question.id,
                            questionMarks: question.questionMarks,
                            label: question.label,
                          })
                        }
                      >
                        <Text style={styles.itemText}>
                          {question?.id}. {question.label}
                        </Text>
                        {/* {question.id === selectedSummary.questionId ? } */}
                        <Text style={styles.questionSelectText}>{selectedSummary && selectedSummary?.chapterId === item.id && question.id === selectedSummary.questionId ? selectedSummary?.selectedQuestions?.length ?? 0 : 0}
                        </Text>
                      </TouchableOpacity>
                      {/* 
                    <View style={{flexDirection:"row", borderWidth:1}}>
                      {question.id === selectedSummary.questionId && 
                      <View style={styles.mcqBox}>
                        {selectedSummary?.selectedQuestions.map(item => {
                          return (
                            <View style={styles.powerRow} key={item}>
                              <Text style={styles.baseText}>{item}</Text>
                              <SupPower>{selectedSummary?.questionMarks}</SupPower>
                            </View>
                          )
                        })}
                      </View>
                      }</View> */}
                      {question.id === selectedSummary?.questionId && selectedSummary?.chapterId === item.id && (
                        <View style={styles.mcqBox}>
                          {selectedSummary?.selectedQuestions?.map(item => (
                            <View key={item} style={styles.powerRow}>
                              <Text style={styles.baseText}>{item}</Text>
                              <SupPower>{selectedSummary.questionMarks}</SupPower>
                            </View>
                          ))}
                        </View>
                      )}

                      {!isLast && (
                        <View
                          style={{
                            height: moderateScale(1),
                            backgroundColor: "rgba(0,140,227,0.12)",
                          }}
                        />
                      )}
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Paperselectcontent;

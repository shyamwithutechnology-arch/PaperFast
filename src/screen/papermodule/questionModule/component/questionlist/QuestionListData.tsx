import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import { moderateScale } from '../../../../../utlis/responsiveSize';
import { Colors } from '../../../../../theme';

type Option = {
  id: string;
  label: string;
};

type Question = {
  id: string;
  question: string;
  options: Option[];
  solutionDetails: string,
  shortAnswer: string
};

const QUESTIONS: Question[] = [

  {
    id: '1',
    question: 'What is the successor of 9999?',
    options: [
      { id: 'A', label: '10000' },
      { id: 'B', label: '9998' },
      { id: 'C', label: '9990' },
      { id: 'D', label: '99999' },
    ],
    solutionDetails: `Perimeter = 2(l + b)
= 2(14 + 8)
= 2 × 22
= 44 cm

Area = l × b
= 14 × 8
= 112 cm²`,
    shortAnswer: 'Perimeter = 44 cm, Area = 112 cm²',
  },
  {
    id: '2',
    question: 'What is the successor of 9999?',
    options: [
      { id: 'A', label: '10000' },
      { id: 'B', label: '9998' },
      { id: 'C', label: '9990' },
      { id: 'D', label: '99999' },
    ],
    solutionDetails: `Perimeter = 2(l + b)
= 2(14 + 8)
= 2 × 22
= 44 cm

Area = l × b
= 14 × 8  
= 112 cm²`,
    shortAnswer: 'Perimeter = 44 cm, Area = 112 cm²',
  },
  {
    id: '3',
    question: 'Which is the greatest number?',
    options: [
      { id: 'A', label: '56789' },
      { id: 'B', label: '56987' },
      { id: 'C', label: '56879' },
      { id: 'D', label: '56678' },
    ],
    solutionDetails: `Perimeter = 2(l + b)
= 2(14 + 8)
= 2 × 22
= 44 cm

Area = l × b
= 14 × 8
= 112 cm²`,
    shortAnswer: 'Perimeter = 44 cm, Area = 112 cm²',
  },
  {
    id: '4',
    question: 'What is the successor of 9999?',
    options: [
      { id: 'A', label: '10000' },
      { id: 'B', label: '9998' },
      { id: 'C', label: '9990' },
      { id: 'D', label: '99999' },
    ],

    solutionDetails: `Perimeter = 2(l + b)
= 2(14 + 8)
= 2 × 22
= 44 cm

Area = l × b
= 14 × 8
= 112 cm²`,
    shortAnswer: 'Perimeter = 44 cm, Area = 112 cm²',
  },
];
type Props = {
  selectCheck: 'Options' | 'Solutions';
  selectedMap: any,
  setSelectedMap: any
};

const QuestionListData: React.FC<Props> = ({ selectCheck, selectedMap, setSelectedMap }) => {
  /** 🔁 TOGGLE SELECT / UNSELECT */
  const toggleSelect = useCallback((id: string) => {
    setSelectedMap(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  console.log('ddddddddddd', selectedMap)
  {Object.keys(selectedMap).map(Number).length ?? 0}

  /** 🧱 RENDER ITEM */
  const renderItem = useCallback(
    ({ item, index }: { item: Question; index: number }) => {
      const isSelected = !!selectedMap[item.id];

      return (
        <TouchableOpacity
          activeOpacity={0.85}
          style={[
            styles.card,
            isSelected && styles.cardSelected,
          ]}
          onPress={() => toggleSelect(item.id)}
        >
          {/* QUESTION ROW */}
          <View style={styles.questionRow}>

            <Text style={styles.questionText}>
              {index + 1}.       {item.question}
            </Text>
          </View>

          {/* OPTIONS ROW */}
          <View style={styles.optionsRow}>
            <>
              {isSelected && (
                // <Icon name="check-box" size={moderateScale(20)} color="#1E88E5" />
                <TouchableOpacity style={[styles.chackBox, { backgroundColor: '#1E88E5', borderWidth: 0 }]}>
                  <Icon name="check" size={moderateScale(16)} color={Colors.white} />
                </TouchableOpacity>
              )}
              {!isSelected && (
                <TouchableOpacity style={[styles.chackBox, { backgroundColor: 'white' }]}>
                  <Icon name="check" size={moderateScale(16)} color={Colors.white} />
                </TouchableOpacity>
              )}
              {item.options.map((opt, index) => (
                <Text key={opt.id} style={[styles.optionText, { marginLeft: index === 0 ? moderateScale(-22) : 0 }]}>
                  {opt.id}) {opt.label}
                </Text>
              ))}
            </>
          </View>

          {/* SOLUTION MODE */}
          {selectCheck === 'Solutions' && (
            <View style={styles.solutionBox}>
              <Text style={styles.solutionTitle}>Solution :</Text>

              <Text style={styles.solutionText}>{item.solutionDetails}</Text>

              <Text style={styles.answerText}>
                <Text style={{ fontWeight: '600' }}>Answer: </Text>
                {item.shortAnswer}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      );
    },
    [selectedMap, toggleSelect, selectCheck],
  );

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" /> */}
      <FlatList
        data={QUESTIONS}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        extraData={{ selectedMap, selectCheck }}   // ⭐ REQUIRED
        initialNumToRender={5}
        windowSize={7}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default QuestionListData;


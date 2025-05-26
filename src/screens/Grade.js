import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color, height, padding, user, width} from '../data/variables';
import fonts from '../data/fonts';
import {useAuthStore} from '../data/authStore';
import Header from './components/Header';
import GradeCard from './components/GradeCard';
import GradeCardMini from './components/GradeCardMini';
import YearBox from './components/yearBox';
import SemesterBox from './components/semesterBox';
import {studentAcademicData} from '../data/fetchedData';
import Snackbar from 'react-native-snackbar';

export const gradeToPercentage = grade => {
  switch (grade) {
    case 'O': return 100;
    case 'A+': return 85;
    case 'A': return 75;
    case 'B+': return 65;
    case 'B': return 50;
    case 'C': return 45;
    case 'P': return 37.5;
    case 'F': return 10;
    case 'Ab': return 0;
    default: return 0;
  }
};

const years = [
  {id: 1, year: '1st Year'},
  {id: 2, year: '2nd Year'},
  {id: 3, year: '3rd Year'},
  {id: 4, year: '4th Year'},
];

function getSemesterLabel(n) {
  const suffix = n => {
    if (n % 100 >= 11 && n % 100 <= 13) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  return `${n}${suffix(n)} Semester`;
}

const Grade = () => {
  const [selectedId, setSelectedId] = useState(1);
  const [selectedSemId, setSelectedSemId] = useState(1);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const getSubjects = (data, selectedYearId, selectedSemId) => {
      const year = data.find(y => parseInt(y.id) === selectedYearId);
      if (!year){Snackbar.show({
        text: 'Nothing to see here!!',
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: fonts.m,
        backgroundColor: color.secondary,
      });return [];}
      const semester = year.semesters.find(s => parseInt(s.id) === selectedSemId);
      if (!semester){Snackbar.show({
        text: 'Nothing to see here!!',
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: fonts.m,
        backgroundColor: color.secondary,
      });return [];}
      return semester.subjects;
    };

    const newSubjects = getSubjects(studentAcademicData, selectedId, selectedSemId);
    setSubjects(newSubjects);
    console.log(subjects)
  }, [selectedId, selectedSemId]);

  const logout = async () => {
    const logout = useAuthStore.getState().logout;
    await logout();
  };

  const no = useAuthStore(state => state.regno);

  const renderMiniCard = ({item}) => (
    <GradeCardMini
      subject={item.name}
      grade={item.grade}
      value={gradeToPercentage(item.grade)}
    />
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.background,
        paddingTop: StatusBar.currentHeight + padding,
        paddingHorizontal: padding,
      }}>
      <FlatList
        data={subjects}
        keyExtractor={item => item.id.toString()}
        renderItem={renderMiniCard}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        contentContainerStyle={{paddingBottom:height/6}}
        ListHeaderComponent={
          <>
            <Header />
            <GradeCard name={'Ranbeer'} regno={no} branch={'IT'} cgpa={8.34} />
            <Text style={[styles.desc, {
              fontFamily: fonts.m,
              fontSize: 22,
              marginLeft: padding,
              marginTop: padding,
            }]}>
              Year
            </Text>

            <View style={styles.categoryWrapper}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={years}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{
                  flex: 1,
                  justifyContent:'space-between',
                  alignItems: 'center',
                }}
                renderItem={({item}) => (
                  <Pressable
                    onPress={() => {
                      setSelectedId(item.id);
                      if ((selectedSemId % 2) === 0) {
                        setSelectedSemId(item.id * 2);
                      } else {
                        setSelectedSemId(item.id * 2 - 1);
                      }
                    }}>
                    <YearBox year={item.year} focused={selectedId === item.id} />
                  </Pressable>
                )}
              />

              <View style={{
                marginTop: padding,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
                <Pressable onPress={() => setSelectedSemId(selectedId * 2 - 1)}>
                  <SemesterBox
                    year={getSemesterLabel(selectedId * 2 - 1)}
                    focused={selectedSemId === selectedId * 2 - 1}
                  />
                </Pressable>

                <Pressable onPress={() => setSelectedSemId(selectedId * 2)}>
                  <SemesterBox
                    year={getSemesterLabel(selectedId * 2)}
                    focused={selectedSemId === selectedId * 2}
                  />
                </Pressable>
              </View>
            </View>
          </>
        }
      />
    </View>
  );
};

export default Grade;

const styles = StyleSheet.create({
  desc: {
    color: color.text,
    fontFamily: fonts.s,
  },
  categoryWrapper: {
    marginTop: padding,
  },
});

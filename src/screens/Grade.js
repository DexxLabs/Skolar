import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color, fullname, height, padding, user, width} from '../data/variables';
import fonts from '../data/fonts';
import {useAuthStore} from '../data/authStore';
import Header from './components/Header';
import GradeCard from './components/GradeCard';
import GradeCardMini from './components/GradeCardMini';
import YearBox from './components/yearBox';
import SemesterBox from './components/semesterBox';
import {studentAcademicData} from '../data/fetchedData';
import Snackbar from 'react-native-snackbar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SGPACard from './components/SGPACard';
import * as Animatable from 'react-native-animatable';



//for circular indicator inside grade card mini
const gradeToPercentage = grade => {
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

//data for year flatlist
const years = [
  {id: 1, year: 'First'},
  {id: 2, year: 'Second'},
  {id: 3, year: 'Third'},
  {id: 4, year: 'Fourth'},
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

const getSGPAandCGPA = (semesterId) => {
  for (const year of studentAcademicData) {
    const semester = year.semesters.find((s) => s.id === String(semesterId));
    if (semester) {
      return {
        sgpa: semester.sgpa,
        cgpa: semester.cgpa,
      };
    }
  }
  return { sgpa: null, cgpa: null };
};

const Grade = () => {
  const [selectedId, setSelectedId] = useState(1);
  const [selectedSemId, setSelectedSemId] = useState(1);
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);

  //constants
  const insets = useSafeAreaInsets()
  const semesterData = getSGPAandCGPA(selectedSemId)
  const no = useAuthStore(state => state.regno);

  const getSubjects = (data, selectedYearId, selectedSemId) => {
    const year = data.find(y => parseInt(y.id) === selectedYearId);
    if (!year) {
      Snackbar.show({
        text: 'Nothing to see here!!',
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: fonts.m,
        backgroundColor: color.secondary,
      });
      return [];
    }
  
    const semester = year.semesters.find(s => parseInt(s.id) === selectedSemId);
    if (!semester) {
      Snackbar.show({
        text: 'Nothing to see here!!',
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: fonts.m,
        backgroundColor: color.secondary,
      });
      return [];
    }
  
    return semester.subjects || [];
  };
  
  


useEffect(() => {
  setLoadingSubjects(true);
  setTimeout(() => {
    const newSubjects = getSubjects(studentAcademicData, selectedId, selectedSemId);
    setSubjects(newSubjects);
    setLoadingSubjects(false);
  }, 50); // slight delay smooths transitions
}, [selectedId, selectedSemId]);


  //component for each subject card
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
        paddingTop: insets.top+padding/2,
        paddingHorizontal: padding,
      }}>
      <FlatList
        data={loadingSubjects ? [] : subjects}
        keyExtractor={item => item.id.toString()}
        renderItem={renderMiniCard}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        contentContainerStyle={{paddingBottom:height/6}}
        ListHeaderComponent={
          //header component till year and sgpa card
          <>
            <Header />
            <GradeCard name={fullname} regno={no} branch={'IT'} cgpa={9.34}/>
            <Text style={[styles.desc, {
              fontFamily: fonts.m,
              fontSize: 22,
              marginLeft: padding,
              marginTop: padding,
            }]}>
              Year
            </Text>
              {/*Year Button & Sem Buttom*/}

            <View style={styles.categoryWrapper}>
            <FlatList
              data={years}
              keyExtractor={item => item.id.toString()}
              numColumns={4}
              scrollEnabled={false} 
              columnWrapperStyle={{ flex: 1,gap:6 }} 
              contentContainerStyle={{ marginTop: padding }}
              renderItem={({ item }) => (
                <Pressable
                  style={{ flex: 1 }}
                  onPress={() => {
                    setSelectedId(item.id);
                    setSelectedSemId((item.id - 1) * 2 + 1); 
                  }}>
                <YearBox year={item.year} focused={selectedId === item.id} />
                </Pressable>
  )}
/>
              {/*Semester Button */}

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

              {/*SGPA Card or Result not found */}
              {
  (semesterData?.sgpa != null || semesterData?.cgpa != null)
    ? (
        <SGPACard
          semester={getSemesterLabel(selectedSemId)}
          cgpa={semesterData.cgpa}
          sgpa={semesterData.sgpa}
        />
      )
    : (
        <Animatable.View
          animation="fadeIn"
          duration={500}
          style={{ padding: padding, alignItems: 'center' }}
        >
          <Text style={[styles.desc, {
            fontFamily: fonts.s,
            fontSize: 16,
            color: color.text,
          }]}>
            Results not available yet!
          </Text>
        </Animatable.View>
      )
}
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

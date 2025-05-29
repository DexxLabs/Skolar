import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {color, fullname, height, padding, user, width} from '../data/variables';
import fonts from '../data/fonts';
import {useAuthStore} from '../data/authStore';
import Card from './components/Card';
import Header from './components/Header';
import MiniCard from './components/MiniCard';
import CategoryBox from './components/categoryBox';
import {dummySubjects} from '../data/fetchedData';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

//function to calculate the stats for each subjects
function processSubjects(subjects) {
  return subjects.map(subject => {
    const {attendance: A, total: T} = subject;

    const percentage = ((A / T) * 100).toFixed(2);

    let isBunkable = false;
    let amount = 0;

    if (percentage >= 75) {
      // how many more lectures you can skip without dropping below 75%
      amount = Math.floor((A - 0.75 * T) / 0.75);
      isBunkable = true;
    } else {
      // how many more lectures you must attend consecutively to reach 75%
      // solving: (A + x) / (T + x) = 0.75
      amount = Math.ceil((0.75 * T - A) / 0.25);
      isBunkable = false;
    }

    return {
      id: subject.id,
      subject: subject.subject,
      attendance: A,
      total: T,
      percentage,
      isBunkable,
      amount,
    };
  });
}

//function to get total attendance and percentage for dashboard
const getTotalAttendance = subjects => {
  const totalAttended = subjects.reduce(
    (sum, subject) => sum + subject.attendance,
    0,
  );
  const totalClasses = subjects.reduce(
    (sum, subject) => sum + subject.total,
    0,
  );

  const percentage =
    totalClasses === 0 ? 0 : (totalAttended / totalClasses) * 100;

  return {
    totalAttended,
    totalClasses,
    percentage,
  };
};

const Home = () => {
  const [selectedId, setSelectedId] = useState(1);
  const studentData = processSubjects(dummySubjects);
  const result = getTotalAttendance(dummySubjects);
  const insets = useSafeAreaInsets();

  //fetch registration no --To be replaced by db-fetch
  const no = useAuthStore(state => state.regno);

  //logout function
  const logout = async () => {
    const logout = useAuthStore.getState().logout;
    await logout();
  };

  //attendance card for each subject
  const renderMiniCard = ({item}) => {
    return (
      <MiniCard
        subject={item.subject}
        attendance={item.attendance}
        total={item.total}
        isBunkable={item.isBunkable}
        amount={item.amount}
        value={parseFloat(item.percentage)}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.background,
        paddingTop: insets.top + padding / 2,
        paddingHorizontal: padding,
      }}>
      <FlatList
        data={studentData.filter(subject => subject.id.includes(selectedId))}
        keyExtractor={item => item.id}
        renderItem={renderMiniCard}
        showsVerticalScrollIndicator={false}
        initialNumToRender={1}
        removeClippedSubviews={false}
        ListHeaderComponent={
          //header component till the horizontal flatlist
          <>
            <Header />
            <Card
              attendance={result.totalAttended}
              total={result.totalClasses}
              name={fullname}
              regno={no}
              value={result.percentage}
              branch={'IT'}
            />
            <Text
              style={[
                styles.desc,
                {
                  fontFamily: fonts.m,
                  fontSize: 22,
                  marginLeft: padding,
                  marginTop: padding,
                },
              ]}>
              Subjects
            </Text>
              {/*Subject Horizontal Scroll */}
            <View style={styles.categoryWrapper}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={dummySubjects}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <Pressable
                    onPress={() => {
                      setSelectedId(item.id);
                    }}>
                    <CategoryBox
                      name={item.subject}
                      focused={selectedId == item.id}
                    />
                  </Pressable>
                )}
              />
            </View>
          </>
        }
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  desc: {
    color: color.text,
    fontFamily: fonts.s,
  },
  categoryWrapper: {
    marginTop: padding,
  },
});

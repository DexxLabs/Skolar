import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {color, height, padding, user, width} from '../data/variables';
import fonts from '../data/fonts';
import {useAuthStore} from '../data/authStore';
import Card from './components/Card';
import Header from './components/Header';
import MiniCard from './components/MiniCard';
import CategoryBox from './components/categoryBox';
import { dummySubjects } from '../data/fetchedData';
import GradeCard from './components/GradeCard';


const Grade = () => {
  const [selectedId, setSelectedId] = useState(1);

  const logout = async () => {
    const logout = useAuthStore.getState().logout;
    await logout();
  };

  const no = useAuthStore(state => state.regno);

  const renderMiniCard = ({ item }) => {
    const value = (item.attendance / item.total) * 100;
    return(
    <MiniCard
      subject={item.subject}
      attendance={item.attendance}
      total={item.total}
      isBunkable={item.isBunkable}
      amount={item.amount}
      value={value}
    />
    )
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.background,
        paddingTop: StatusBar.currentHeight + padding,
        paddingHorizontal: padding,
      }}>
      
      <FlatList
        data={dummySubjects.filter((subject)=>subject.id.includes(selectedId))}
        keyExtractor={item => item.id}
        renderItem={renderMiniCard}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        removeClippedSubviews={false}
        extraData={dummySubjects}
        ListHeaderComponent={
          <>
            <Header />
            <GradeCard attendance={60} total={100} name={'Ranbeer'} regno={no} value={60} branch={'IT'}/>
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


            <View style={styles.categoryWrapper}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={dummySubjects}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setSelectedId(item.id);
              }}
            >
              <CategoryBox name={item.subject} focused={selectedId == item.id} />
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

export default Grade;

const styles = StyleSheet.create({
  desc: {
    color: color.text,
    fontFamily: fonts.s,
  },
  categoryWrapper:{
    marginTop:padding
  }
});

/* eslint-disable no-trailing-spaces */
/* eslint-disable dot-notation */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';
import {
  SafeAreaView,
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  Platform,
} from 'react-native';
import { FONTS } from '../../../constants';
import { GQLQuery } from '../../persistence/query/Query';
import ExpandableComponent from './ExpandableComponent';



export default function SubCategoryGraphDetails(props) {
  const content = { ...props };
  const [listDataSource, setListDataSource] = useState(content.content);
  const [multiSelect] = useState(false);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    if (multiSelect) {
      // If multiple select is enabled
      array[index]['isExpanded'] = !array[index]['isExpanded'];
    } else {
      // If single select is enabled
      array.map((_value, placeindex) =>
        placeindex === index
          ? (array[placeindex]['isExpanded'] =
            !array[placeindex]['isExpanded'])
          : (array[placeindex]['isExpanded'] = false),
      );
    }
    setListDataSource(array);
  };


  const [getSubcategories, { loading, error, data }] = useLazyQuery(GQLQuery.GET_SUBCATEGORY_BY_ID);

  console.log(data && data.ExpenseQuery &&  data.ExpenseQuery.GetUserSubCategoryExpenses) 
  const subCategoryArray = data && data.ExpenseQuery &&  data.ExpenseQuery.GetUserSubCategoryExpenses;
  console.log(error)

  function loadSubCategory(id) {
    getSubcategories({
      variables: {
        CategoryId: id,
      }
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Text style={styles.titleText}>Categories Spend</Text>
         
          
        </View>
        <ScrollView>
          {listDataSource.map((item, key) => (
            <ExpandableComponent
              key={item.category_name}
              onClickFunction={() => {
                updateLayout(key);
                loadSubCategory(item.category_Id);
              }}
              subCategory= {subCategoryArray}
              item={item}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontFamily: FONTS.proxima700,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
});

//Dummy content to show
//You can also use dynamic data by calling webservice

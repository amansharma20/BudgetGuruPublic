/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import { COLORS } from '../../../constants';
import Icons from '../../../constants/Icons';


const ExpandableComponent = ({ item, onClickFunction, subCategory }) => {
  //Custom Component for the Expandable List
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  return (
    <View>
      {/*Header of the Expandable List Item*/}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={styles.header}>
        <Text style={styles.headerText}>
          {item.category_name} 
        </Text>
        <Image source={Icons.dropDown} style={{resizeMode: 'contain', width: 20, height: 10}} />
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: 'hidden',
        }}>
        {/*Content under the header of the Expandable List Item*/}
        <View style={styles.separator} />
        {subCategory && subCategory.map((item, key) => (
          <TouchableOpacity
            key={key}
            style={styles.content}
          // onPress={
          //   () => alert('Id: ' + item.id + ' val: ' + item.val)
          // }
          >
            <Text style={styles.text}>
              {item.SubCategoryName}
            </Text>
            <Text style={styles.text}>
              ₹{item.TotalGroupExpense}
            </Text>
          </TouchableOpacity>
        ))}
        <View style={styles.separator} />
      </View>
    </View>
  );
};

export default ExpandableComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'space-between', 
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.black
  },
  separator: {
    height: 0.5,
    backgroundColor: '#F6FBFF',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 17,
    color: COLORS.black,
    paddingHorizontal: 10,
    paddingVertical: 20,
    fontWeight: '600',
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#f2f2f2',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

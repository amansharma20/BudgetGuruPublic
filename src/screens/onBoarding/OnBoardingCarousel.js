/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useState, useCallback, useRef} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {icons, SIZES} from '../../../constants';
import CommonButton from '../../components/buttons/CommonButton';

const OnBoardingCarousel = ({images, descriptions, onPress, titlesText}) => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const windowWidth = useWindowDimensions().width;

  const onFlatlistUpdate = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
    console.log(viewableItems);
  }, []);

  const flatlistRef = useRef();

  const onPressFunction = () => {
    console.log(activeIndex);
    if (activeIndex < 2) {
      flatlistRef.current.scrollToIndex({index: activeIndex + 1});
    } else {
      navigation.navigate('WelcomeScreen');
    }
  };

  return (
    <View>
      <FlatList
        ref={flatlistRef}
        data={images}
        renderItem={({item}) => (
          <View>
            <View
              style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <View
                style={[
                  styles.image,
                  {
                    width: windowWidth,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <Image
                  source={{uri: item}}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                    marginTop: 0,
                  }}
                />
              </View>
            </View>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={windowWidth - 0}
        snapToAlignment={'center'}
        decelerationRate={'fast'}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
        onViewableItemsChanged={onFlatlistUpdate}
        scrollEnabled={false}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 30,
          paddingHorizontal: 0,
        }}>
        <View style={styles.dots}>
          {images.map((image, index) => (
            <View
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === activeIndex ? '#2A46FF' : '#B5BFFF',
                  width: index === activeIndex ? 22 : 5,
                  height: index === activeIndex ? 5 : 5,
                },
              ]}
            />
          ))}
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={onPressFunction}>
           <Image source={icons.nextButton} style={{width: 120, height: 60}} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    // height: HEIGHT / 1.8,
    resizeMode: 'cover',
    // borderBottomLeftRadius: 54,
    // borderTopLeftRadius: 54,
  },
  dots: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
  },
  dot: {
    borderRadius: 10,
    margin: 5,
  },
  buttonText: {
    color: '#3511A3',
    fontSize: 20,
    fontWeight: '400',
  },
  subtitleText: {
    fontSize: 20,
    color: '#838383',
    paddingHorizontal: SIZES.padding,
    fontWeight: '500',
  },
  titleText: {
    fontSize: 30,
    color: '#484848',
    fontWeight: '400',
    paddingHorizontal: SIZES.padding,
    marginRight: 60,
  },
  subtitleTextContainer: {paddingTop: SIZES.padding2},
  titleTextContainer: {
    marginBottom: 55,
    paddingTop: SIZES.padding2,
    borderTopRightRadius: 65,
    marginTop: 15,
  },
});

export default OnBoardingCarousel;

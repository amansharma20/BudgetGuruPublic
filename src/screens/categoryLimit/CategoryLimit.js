/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FONTS, images } from '../../../constants';
import CommonButton from '../../components/buttons/CommonButton';
import Slider from '@react-native-community/slider';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function CategoryLimit() {
    const navigation = useNavigation();

    const [shopping, setShopping] = useState(0);
    const [travel, setTravel] = useState(0);
    const [groceries, setGroceries] = useState(0);
    const [entertainment, setEntertainment] = useState(0);
    const [others, setOthers] = useState(0);


    return (
        <ScrollView style={styles.container}>
            <Image source={images.detailsInputBg} style={styles.background} />
            <View style={styles.textContainer}>
                <Text style={styles.headerText}>Category{'\n'}Limit</Text>
                <Text style={styles.subtitleText}>Please enter your{'\n'}category limit</Text>
            </View>
            <View style={{ paddingHorizontal: 24, marginTop: 16 }}>
                <View style={styles.itemContainer}>
                    <View style={styles.topRowContainer}>
                        <Text>
                            Shopping
                        </Text>
                        <Text style={{ fontSize: 12 }}>
                            {shopping.toFixed()} %
                        </Text>
                    </View>
                    <Slider
                        style={{ width: '100%', height: 40, }}
                        minimumValue={0}
                        maximumValue={100}
                        minimumTrackTintColor="#223EFE"
                        maximumTrackTintColor="#223EFE"
                        thumbTintColor="#223EFE"
                        onSlidingComplete={(value) => setShopping(value)}
                    />
                    <View style={styles.percentTextContainer}>
                        <Text style={styles.percentText}>
                            0%
                        </Text>
                        <Text style={styles.percentText}>
                            100%
                        </Text>
                    </View>
                </View>

                <View style={styles.itemContainer}>
                    <View style={styles.topRowContainer}>
                        <Text>
                            Travel
                        </Text>
                        <Text style={{ fontSize: 12 }}>
                            {travel.toFixed()} %
                        </Text>
                    </View>
                    <Slider
                        style={{ width: '100%', height: 40, }}
                        minimumValue={0}
                        maximumValue={100}
                        minimumTrackTintColor="#223EFE"
                        maximumTrackTintColor="#223EFE"
                        thumbTintColor="#223EFE"
                        onSlidingComplete={(value) => setTravel(value)}
                    />
                    <View style={styles.percentTextContainer}>
                        <Text style={styles.percentText}>
                            0%
                        </Text>
                        <Text style={styles.percentText}>
                            100%
                        </Text>
                    </View>
                </View>

                <View style={styles.itemContainer}>
                    <View style={styles.topRowContainer}>
                        <Text>
                            Groceries
                        </Text>
                        <Text style={{ fontSize: 12 }}>
                            {groceries.toFixed()} %
                        </Text>
                    </View>
                    <Slider
                        style={{ width: '100%', height: 40, }}
                        minimumValue={0}
                        maximumValue={100}
                        minimumTrackTintColor="#223EFE"
                        maximumTrackTintColor="#223EFE"
                        thumbTintColor="#223EFE"
                        onSlidingComplete={(value) => setGroceries(value)}
                    />
                    <View style={styles.percentTextContainer}>
                        <Text style={styles.percentText}>
                            0%
                        </Text>
                        <Text style={styles.percentText}>
                            100%
                        </Text>
                    </View>
                </View>

                <View style={styles.itemContainer}>
                    <View style={styles.topRowContainer}>
                        <Text>
                            Entertainment
                        </Text>
                        <Text style={{ fontSize: 12 }}>
                            {entertainment.toFixed()} %
                        </Text>
                    </View>
                    <Slider
                        style={{ width: '100%', height: 40, }}
                        minimumValue={0}
                        maximumValue={100}
                        minimumTrackTintColor="#223EFE"
                        maximumTrackTintColor="#223EFE"
                        thumbTintColor="#223EFE"
                        onSlidingComplete={(value) => setEntertainment(value)}
                    />
                    <View style={styles.percentTextContainer}>
                        <Text style={styles.percentText}>
                            0%
                        </Text>
                        <Text style={styles.percentText}>
                            100%
                        </Text>
                    </View>
                </View>

                <View style={styles.itemContainer}>
                    <View style={styles.topRowContainer}>
                        <Text>
                            Others
                        </Text>
                        <Text style={{ fontSize: 12 }}>
                            {others.toFixed()} %
                        </Text>
                    </View>
                    <Slider
                        style={{ width: '100%', height: 40 }}
                        minimumValue={0}
                        maximumValue={100}
                        minimumTrackTintColor="#223EFE"
                        maximumTrackTintColor="#223EFE"
                        thumbTintColor="#223EFE"
                        onSlidingComplete={(value) => setOthers(value)}
                    />
                    <View style={styles.percentTextContainer}>
                        <Text style={styles.percentText}>
                            0%
                        </Text>
                        <Text style={styles.percentText}>
                            100%
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ margin: 20, }}>
                <CommonButton children={'Continue'} onPress={() => { navigation.navigate('HomeScreen') }} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    background: {
        height: 200,
        width: 150,
        resizeMode: 'cover',
        alignSelf: 'flex-end',
        position: 'absolute',
    },
    headerText: {
        fontSize: 28,
        fontFamily: FONTS.montserrat700,
        color: '#262626',
    },
    subtitleText: {
        color: '#9D9D9D',
        fontSize: 18,
        fontFamily: FONTS.montserrat500,
    },
    textContainer: {
        left: 30,
        marginTop: 60,
    },
    itemContainer: {
        width: '100%', height: 80, borderRadius: 10, paddingVertical: 6,
        paddingHorizontal: 20, marginTop: 12, elevation: 5, backgroundColor: '#ffffff',
    },
    percentTextContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: -8,
    },
    percentText: {
        fontSize: 12,
        color: '#8C8C8C',
        fontFamily: FONTS.montserrat400,
    },
    topRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

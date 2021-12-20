/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Text, Platform, ImageBackground } from 'react-native';
import { FONTS, images, SIZES } from '../../../constants';
import * as Progress from 'react-native-progress';
import { Responsive } from '../../utils/layouts/Layout';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';

const Knowledge = (props) => {
    const knowledge = props.knowledge;
    const navigation = useNavigation();
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('KnowledgeDetails', {knowledge: knowledge})}>

            <ImageBackground source={images.knowledgeImageBg} style={styles.container} imageStyle={{ resizeMode: 'cover' }} >
                <View style={{ justifyContent: 'space-around', flex: 1 }}>
                    <View style={styles.textContainer}>
                        <Text style={styles.topText}>{knowledge.Title}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.typeOfText}>{knowledge.SubTitle}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text numberOfLines={2} style={styles.chaptersText}>Read More</Text>
                        <View style={styles.progressBarContainer}>
                            <Progress.Bar
                                progress={100 / 100}
                                width={Responsive.width(36)}
                                unfilledColor={'#eff0f2'}
                                borderWidth={0}
                                height={5}
                                color={'#4DCEF2'}
                            />
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    container: {
        marginRight: 8,
        marginLeft: 8,
        marginBottom: 16,
        paddingHorizontal: SIZES.padding2,
        marginVertical: SIZES.padding2,
        elevation: 7,
        borderRadius: 16,
        width: 240,
        height: 144,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    topText: {
        fontSize: 12,
        color: '#4DCEF2',
        fontFamily: FONTS.montserrat500,
    },
    typeOfText: {
        fontSize: 21,
        color: '#ffffff',
        fontFamily: FONTS.montserrat700,
        width: 120,
    },
    chaptersText: {
        color: '#DCE1FF',
        fontFamily: FONTS.montserrat500,
        fontSize: 12,
    },
    progressBarContainer: {
        marginTop: 6,
        alignItems: 'center',
    },
});

export default Knowledge;

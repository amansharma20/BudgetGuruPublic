/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import CommonHeader from '../../components/headers/CommonHeader';
import { COLORS, FONTS, icons, SIZES } from '../../../constants';
import { format } from 'date-fns';
import { applicationProperties } from '../../application.properties';


export default function KnowledgeDetails(props) {
    const createdDate = props.route.params.knowledge.CreatedDateTimeUtc;
    const Description = props.route.params.knowledge.Description;
    const Title = props.route.params.knowledge.Title;
    const SubTitle = props.route.params.knowledge.SubTitle;
    const ImageURL = props.route.params.knowledge.LogoStoragePath;
    console.log(applicationProperties.imageUrl + ImageURL);

    return (
        <View style={styles.container}>
            <CommonHeader Children="Knowledge" style={{
                marginTop: Platform.select({
                    ios: 0,
                    android: 0,
                    paddingTop: 30,
                }),
            }} />
            <View style={styles.body}>
                <View style={styles.mainContainer}>
                    <View>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>
                                {Title}
                            </Text>
                            <Text style={styles.dateText}>
                                {format(new Date(createdDate), 'MMMM do, yyyy')}
                            </Text>
                        </View>
                        <Text style={styles.subText}>
                            {SubTitle}
                        </Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{
                                uri: (applicationProperties.imageUrl + ImageURL),
                            }}
                            style={styles.image}
                        />
                    </View>
                    <View>
                        <Text style={styles.contentText}>
                            {Description}
                        </Text>
                    </View>
                </View>
                <View style={styles.footerContainer}>
                    <View style={styles.socialIconContainer}>
                        <TouchableOpacity>
                            <Image source={icons.twitter} style={styles.socialIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={icons.insta} style={[styles.socialIcon, { marginHorizontal: 30 }]} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={icons.yt} style={styles.socialIcon} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    body: {
        flex: 1,
        backgroundColor: COLORS.primary,
        justifyContent: 'space-between',
    },
    mainContainer: {
        backgroundColor: '#ffffff',
        flex: 1,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: SIZES.padding,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 28,
        fontFamily: FONTS.montserrat500,
        color: '#262626',
    },
    dateText: {
        fontSize: 14,
        fontFamily: FONTS.montserrat500,
        color: '#262626',
    },
    subText: {
        color: '#808080',
        fontFamily: FONTS.montserrat400,
        fontSize: 16,
    },
    imageContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    image: { height: 150, width: 300, borderRadius: 10, resizeMode: 'contain' },
    footerContainer: {
        backgroundColor: '#ffffff',
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderColor: '#D7D7D7',
        justifyContent: 'flex-start'
    },
    contentText: {
        fontSize: 14,
        color: '#666666',
        fontFamily: FONTS.proxima400,
    },
    socialIconContainer: { flexDirection: 'row' },
    socialIcon: { width: 20, height: 20, resizeMode: 'contain' },
});

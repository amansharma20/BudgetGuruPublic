/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CategorySpendHeader from '../../components/headers/CategorySpendHeader';
import { icons } from '../../../constants';
import TermsHeader from '../../components/headers/TermsHeader';

export default function About() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TermsHeader Children="About" />
            <View style={{ backgroundColor: '#364ffb', flex: 1 }}>
                <View style={{ backgroundColor: '#ffffff', flex: 1, borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 16 }}>
                    <Text style={{fontSize: 14, color: '#757575', lineHeight: 26}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus in tempor nullam turpis pulvinar sapien eu. Convallis eu varius feugiat amet. Facilisis iaculis ligula sagittis euismod. Enim varius diam volutpat, ipsum. Lectus et justo, iaculis amet, semper donec. Id consectetur potenti magna purus aliquam. Luctus sit pellentesque eu morbi sagittis facilisis. Sit faucibus egestas ut leo volutpat in tincidunt.
                        Egestas in augue varius sed id ut dapibus. Nec tempor et dui tellus tristique urna lectus convallis. Ipsum euismod quisque dictum pharetra suspendisse eu ut nunc. Pharetra mattis elit tristique tellus ut tincidunt sed vestibulum sagittis. Nisi, enim, vehicula tristique et. Tincidunt aenean arcu tellus neque, odio. Amet ullamcorper egestas tincidunt nibh lacinia aliquam sit neque. Sit scelerisque iaculis vulputate natoque nunc vitae. Vel pulvinar ultricies tincidunt lectus aliquet ipsum tristique. Luctus sed lectus habitasse amet lectus sed dolor vitae. Quam amet turpis odio at diam dolor volutpat sagittis. Dui a morbi enim convallis vel justo. Imperdiet diam neque tristique nec, enim sed scelerisque montes, non. Ultricies nulla semper massa consectetur.
                        A cras sit nulla at scelerisque. Diam congue in adipiscing id non faucibus aliquam ut nulla
                    </Text>
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
});

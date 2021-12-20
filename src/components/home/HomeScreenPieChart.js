/* eslint-disable prettier/prettier */
import React from 'react';
import { PieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import { View } from 'react-native';

class HomeScreenPieChart extends React.PureComponent {
    render() {
        const data = [
            {
                key: 1,
                amount: 10000,
                svg: { fill: '#0263FF' },
            },
            {
                key: 2,
                amount: 5000,
                svg: { fill: '#FF7723' },
            },
            {
                key: 3,
                amount: 5000,
                svg: { fill: '#8E30FF' },
            },
            {
                key: 4,
                amount: 0,
                svg: { fill: '#313054' },
            },
            {
                key: 5,
                amount: 0,
                svg: { fill: '#FD7350' },
            },
        ];

        // const Labels = ({slices, height, width}) => {
        //   return slices.map((slice, index) => {
        //     const {labelCentroid, pieCentroid, data} = slice;
        //     return (
        //       <Text
        //         key={index}
        //         x={pieCentroid[0]}
        //         y={pieCentroid[1]}
        //         fill={'white'}
        //         textAnchor={'middle'}
        //         alignmentBaseline={'middle'}
        //         fontSize={24}
        //         stroke={'black'}
        //         strokeWidth={0.2}>
        //         {data.amount}
        //       </Text>
        //     );
        //   });
        // };

        return (
            <View style={{alignItems: 'center'}}>
                <PieChart
                    style={{ height: 200, backgroundColor: '#ffffff', borderRadius: 1000, width: 200, padding: 8, elevation: 5 }}
                    valueAccessor={({ item }) => item.amount}
                    data={data}
                    spacing={0}
                    innerRadius={'70%'}
                    outerRadius={'95%'}>
                    {/* <Labels /> */}
                </PieChart>
                <Text style={{
                    
                }}>
                    text text text
                </Text>
            </View>
        );
    }
}

export default HomeScreenPieChart;

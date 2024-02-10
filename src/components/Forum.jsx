
import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'

const ContentCard = (content) => {
    return (
        <View style={styles.box}>
            <View>
                <Text style={{ fontSize: 20, color: 'black', fontWeight:'bold'}}>
                    tehre is some taiwe sdfi nsa fids ksdfaskldf sdjfij nisdjf nfifeio nfdjsnfoi fndjkns f
                </Text>
            </View>
        </View>
    )
}

export default function Forum() {

    const [content, setContent] = React.useState({});

    React.useEffect(()=>{
        // getting the content of the card...
    }) 

    return (
        <ScrollView style={{ overflow: 'scroll'}}>
            <View style={{overflow: 'scroll'}}>
                <ContentCard/>
                <ContentCard/>
                <ContentCard/>
                <ContentCard/>
                <ContentCard/>
                <ContentCard/>
                <ContentCard/>
                <ContentCard/>
                <ContentCard/>
                <ContentCard/>
            </View>

            <View style={styles.add}>
                 <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>ADD</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    box: {
        width: '100%',
        display: 'flex',
        padding: 10,
        backgroundColor: '#ECECEC'
    },
    add: {
        backgroundColor: 'black',
        color: 'white',
        height: 80,
        width: 80,
        position: 'fixed',
        top: 0,

        borderRadius: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
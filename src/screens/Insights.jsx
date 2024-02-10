import * as React from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';



export default function Insight({ navigation, route }) {
    const { userId } = route.params

    const [percentage, setPercentage] = React.useState({
        Dating: "",
        Education : "",
        Entertainment: "",
        Music: "",
        Productivity: "",
    })

    React.useEffect(() => {
        const handlePercentage = async () => {
            try {
                console.log(userId)
                const response = await axios.post('http://192.168.211.76:8090/api/users/percentageRoutebyCategory', { userId });
                const data = response.data.percentageByCategory

                setPercentage((prev) => ({
                    ...prev,
                    'Dating': data.Dating,
                    'Education': data.Education,
                    'Entertainment': data.Entertainment,
                    'Music': data.Music,
                    'Productivity': data.Productivity,
                }))

            } catch (error) {
                return console.log('some error occured', error)
            }
        }

        handlePercentage();
    }, [])
  

    return (
        <ScrollView>
            <View>
                <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold', textAlign: 'center', fontFamily: 'Inter', marginBottom: 20, marginTop: 10}}>
                    Your Spending Chart
                </Text>

                <View >
                    <View style={[styles.categoryContainer]}> 
                        <View style={[styles.box, { backgroundColor: 'orange'}]}></View>
                        <View style={[styles.bottomBorder, {display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10}]}>
                            <Text style={[styles.category]}>Movie Streaming</Text>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18}}>{percentage.Entertainment}%</Text>
                        </View>
                    </View>

                    <View style={[styles.categoryContainer]}> 
                        <View style={[styles.box, {backgroundColor: 'purple' }]}></View>
                        <View style={[styles.bottomBorder, {display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10}]}>
                            <Text style={[styles.category]}>Music Streaming</Text>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18}}>{percentage.Music}%</Text>
                        </View>
                    </View>

                    <View style={[styles.categoryContainer]}> 
                        <View style={[styles.box, { backgroundColor: '#ff1493' }]}></View>
                        <View style={[styles.bottomBorder, {display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10}]}>
                            <Text style={[styles.category]}>Dating</Text>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18}}>{percentage.Dating}%</Text>
                        </View>
                    </View>

                    <View style={[styles.categoryContainer]}>
                        <View style={[styles.box, { backgroundColor: 'green' }]}></View>
                        <View style={[styles.bottomBorder, {display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10}]}>
                            <Text style={[styles.category]}>Education</Text>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18}}>{percentage.Education}%</Text>
                        </View>
                    </View>

                    <View style={[styles.categoryContainer]}>
                        <View style={[styles.box, { backgroundColor: 'blue' }]}></View>
                        <View style={[styles.bottomBorder, {display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10}]}>
                            <Text style={[styles.category]}>Productivity</Text>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18}}>{percentage.Productivity}%</Text>
                        </View>
                    </View>
                </View>
            </View>


            <View style={{marginTop: 60, marginBottom: 40, display: 'flex', justifyContent: 'center', backgroundColor: '#D5D2D2', paddingTop: 20, paddingBottom: 30}}>
                <Text style={{ textAlign:'center', fontSize:28, color: 'black', fontWeight: 'bold'}}>Insights for you</Text>
                <Text style={{ textAlign: 'center', fontSize: 20, color: 'black', fontWeight: '600', marginTop: 19}}>this will be replaced by the string i am receiving from the backend</Text>
            </View>


            <View>
                <Text style={styles.trend}>
                    Apps that you used Most
                </Text>
                <View>
                    <View></View>
                    <View></View>
                    <View></View>
                    <View></View>
                </View>

                <Text style={styles.trend}>
                    Apps that you used Least
                </Text>

                <View>
                    <View></View>
                    <View></View>
                    <View></View>
                    <View></View>
                </View>
            </View>

            <View>
                <View style={{display: 'flex', flexDirection: 'column', backgroundColor: 'black', height: 55, width: 180, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 30}}>
                    <TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold'}}>Community</Text>
                    </TouchableOpacity>
                </View>
                <Text>
                    Budget Analysis
                </Text>

                <View>
                    <Text>
                        Entertainment
                    </Text>
                    <View>
                        <Text>Alloted</Text>
                        <Text>Spent</Text>
                    </View>
                </View>

                <View>
                    <Text>Music</Text>
                    <View>
                        <Text>Alloted</Text>
                        <Text>Spent</Text>
                    </View>
                </View>

                <View>
                    <Text>Dating</Text>
                    <View>
                        <Text>Alloted</Text>
                        <Text>Spent</Text>
                    </View>
                </View>

                <View>
                    <Text>Education</Text>
                    <View>
                        <Text>Alloted</Text>
                        <Text>Spent</Text>
                    </View>
                </View>

                <View>
                    <Text>Productivity</Text>
                    <View>
                        <Text>Alloted</Text>
                        <Text>Spent</Text>
                    </View>
                </View>
            </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    box: {
        width: 40,
        height: 40,
        backgroundColor: 'pink',
        margin: 5,
    },
    category: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        paddingBottom: 8
    },
    categoryContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        marginLeft: 10,
        marginRight: 10,
    },
    bottomBorder: {
        borderBottomWidth: 2,
        borderBottomColor: 'gray',
        width: 320
    },
    trend: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
        fontWeight: '600'
    },
    buttonComp: {
        width: 30
    }
})
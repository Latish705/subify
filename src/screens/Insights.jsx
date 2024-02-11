import * as React from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function Insight({navigation, route}) {
  const {userId} = route.params;

  const [percentage, setPercentage] = React.useState({
    Dating: '',
    Education: '',
    Entertainment: '',
    Music: '',
    Productivity: '',
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'http://172.16.30.20:8090/api/users/percentageRoutebyCategory',
          {userId},
        );
        const data = response.data.percentageByCategory;

        setPercentage(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCommunity = () => {
    navigation.navigate('Community');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Your Spending Chart</Text>

        {Object.entries(percentage).map(([category, value]) => (
          <View key={category} style={styles.categoryContainer}>
            <View
              style={[
                styles.box,
                {backgroundColor: getColorForCategory(category)},
              ]}></View>
            <View style={styles.bottomBorder}>
              <Text style={styles.category}>{category}</Text>
              <Text style={styles.percentage}>{value}%</Text>
            </View>
          </View>
        ))}

        <View style={styles.insightsContainer}>
          <Text style={styles.heading}>Insights for you</Text>
          <Text style={styles.insightsText}>
            Replace this text with insights received from the backend
          </Text>
        </View>

        {/* Additional sections for app usage trends, budget analysis, etc. */}

        <TouchableOpacity style={styles.button} onPress={handleCommunity}>
          <Text style={styles.buttonText}>Community</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const getColorForCategory = category => {
  // Define colors for each category
  const categoryColors = {
    Dating: 'orange',
    Education: 'green',
    Entertainment: 'purple',
    Music: '#ff1493',
    Productivity: 'blue',
  };

  // Return color for the given category, defaulting to black if not found
  return categoryColors[category] || 'black';
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  box: {
    width: 40,
    height: 40,
    marginEnd: 10,
  },
  bottomBorder: {
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  category: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  percentage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  insightsContainer: {
    backgroundColor: '#D5D2D2',
    padding: 20,
    marginTop: 60,
  },
  insightsText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    marginTop: 19,
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 15,
    marginVertical: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

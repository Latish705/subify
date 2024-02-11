import * as React from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
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

  const [topPlatforms, setTopPlatforms] = React.useState([]);

  React.useEffect(() => {
    const fetchPercentage = async () => {
      try {
        const response = await axios.post(
          'http://192.168.211.76:8090/api/users/percentageRoutebyCategory',
          {userId},
        );
        const data = response.data.percentageByCategory;
        setPercentage(data);
      } catch (error) {
        console.log('Error fetching percentage:', error);
      }
    };

    const fetchTopPlatforms = async () => {
      try {
        const response = await axios.post(
          'http://192.168.211.76:8090/api/users/topPlatformsByTime',
          {userId},
        );
        setTopPlatforms(response.data.topPlatforms);
      } catch (error) {
        console.log('Error fetching top platforms:', error);
      }
    };

    fetchPercentage();
    fetchTopPlatforms();
  }, []);

  const handleCommunity = () => {
    // Navigate to the Community screen
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
              ]}
            />
            <View style={styles.bottomBorder}>
              <Text style={styles.category}>{category}</Text>
              <Text style={styles.percentage}>{value}%</Text>
            </View>
          </View>
        ))}

        <View style={styles.insightsContainer}>
          <Text style={styles.insightsText}>Insights for you</Text>
          <Text style={styles.insightsText}>
            This will be replaced by the string received from the backend
          </Text>
        </View>

        <View style={styles.appTrendsContainer}>
          <Text style={styles.trend}>Apps that you used Most</Text>
          <View style={styles.platformImagesContainer}>
            {topPlatforms.map((platform, index) => (
              <Image
                key={index}
                style={styles.platformImage}
                source={{uri: platform.logoImage}}
              />
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCommunity}>
          <Text style={styles.buttonText}>Community</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const getColorForCategory = category => {
  const categoryColors = {
    Dating: 'orange',
    Education: 'green',
    Entertainment: 'purple',
    Music: '#ff1493',
    Productivity: 'blue',
  };
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
  appTrendsContainer: {
    marginTop: 60,
    marginBottom: 40,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#D5D2D2',
  },
  trend: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  platformImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  platformImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
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

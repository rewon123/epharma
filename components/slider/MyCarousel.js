import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform,
    ScrollView,
} from 'react-native';



const { width: screenWidth } = Dimensions.get('window');

const MyCarousel =  props => {
    const [entries, setEntries] = useState([]);
    const [activeSlide, setActiveSlide] = useState([]);
    const carouselRef = useRef(null);
    

    useEffect(() => {
        let data = {
            "phone": '01710369877',
            "email": 'adn_ice@yahoo.com',
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        return fetch("http://api.epharma.com.bd:82/api/home", requestOptions)
            .then(response => response.json())
            .then((result) => {
                setEntries(result.advertisement)
            });
    }, []);

    const renderItem = ({ item, index }, parallaxProps) => {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: `${item.image}` }}
                    containerStyle={styles.imageContainer}
                    parallaxFactor={0}
                    {...parallaxProps}
                />
            </View>
        );
    };


    function pagination() {
        return (
            <Pagination
                dotsLength={entries.length}
                activeDotIndex={activeSlide}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    marginTop: -50,
                    backgroundColor: '#022F6D'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.4}
            />
        );
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Carousel
                    ref={carouselRef}
                    sliderWidth={screenWidth+13}
                    itemWidth={screenWidth-15}
                    data={entries}
                    renderItem={renderItem}
                    hasParallaxImages={true}
                    autoplay={true}
                    loop={true}
                    autoplayDelay={500}
                    autoplayInterval={3000}
                    onSnapToItem={(index) => setActiveSlide(index)}
                />
                {pagination()}
            </View>
        </ScrollView>
    );
};

export default MyCarousel;

const styles = StyleSheet.create({
    item: {
        height: 200,
        marginTop: 10,
        marginRight:'1%'
    },
    imageContainer: {
        flex: 1,
        marginRight:'3%',
        // marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
});


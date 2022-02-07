import React, { useEffect, useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Product_details from '../../views/product_details/Product_details';

const Products = (props) => {
    const [productDetaill, setProductDetaill] = useState([])
    const [products, setEntries] = useState([]);
console.log(productDetaill);

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
                setEntries(result.featured_products)
            });
    }, [6969]);

    const pushF = (details) => {
        Navigation.push(props.props.componentId, {
            component: {
                name: 'productsDetails',
                passProps: { details,setProductDetaill },
                options: {
                    topBar: {
                        backButton: { color: '#ffffff' },
                        background: { color: '#0083c1' },
                        title: {
                            component: {
                                name: 'topbar'
                            }
                        },
                        rightButtons: {
                            id:'cartIcon',
                            icon: require('../../assets/Shopping-Cart-icon.png')
                        },
                        sideMenu: {
                            left: {
                                visible: false
                            }
                        }
                    }
                }
            }
        })
    }

    const Card = ({ plant }) => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => pushF(plant, 'sad')} >
                <View style={style.card}>
                    <View
                        style={{
                            alignItems: 'center',
                        }}>
                        <Image
                            source={{ uri: `${plant.images}` }}
                            style={{ width: 150, height: 150, }}
                        />
                    </View>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 13, marginTop: 10, color: '#0083c1' }}>
                            {plant.title.substring(0, 50)}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                marginTop: 5,
                            }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                ৳ {plant.sale_price}
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', textDecorationLine: 'line-through', textDecorationStyle: 'solid', }}>
                                {plant.regular_price}
                            </Text>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ marginHorizontal: 8 }}>
            <SafeAreaView>
                <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 16 }}> Featured Products</Text>
                <FlatList
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: 10,
                        paddingBottom: 20,
                    }}
                    numColumns={2}
                    data={products}
                    renderItem={({ item }) => {
                        return <Card plant={item} />;
                    }}
                />
            </SafeAreaView>
        </View>
    );
};
const style = StyleSheet.create({
    card: {
        justifyContent: 'space-around',
        width: 170,
        height: 250,
        backgroundColor: 'white',
        marginHorizontal: 2,
        borderRadius: 10,
        marginBottom: 10,
        padding: 15,
    },
});

export default Products;
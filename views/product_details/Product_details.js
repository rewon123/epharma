import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Button } from 'react-native';
import { connect } from 'react-redux';

const Product_details = (props) => {
    const [products, setEntries] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const addToCart = (details) => {
        // console.log({details, quantity})
        details.quantity = quantity;
        props.addItemToCart(details);
    }

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
    }, []);

    const Card = ({ plant }) => {
        return (
            <TouchableOpacity activeOpacity={0.8} >
                <View style={style.card}>
                    <View
                        style={{
                            alignItems: 'center',
                        }}>
                        <Image
                            source={{ uri: `${plant.images}` }}
                            style={{ width: 140, height: 140, }}
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
        <View>
            <View>
                <ScrollView>
                    <SafeAreaView>
                        <View>
                            <View style={{ padding: 10, backgroundColor: 'white' }}>
                                <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>{props.details.title}</Text>
                                <Text style={{ fontSize: 16, color: 'black' }}>{props.details.cat_type}: {props.details.cat_name}</Text>
                                <Image
                                    style={{ width: '70%', height: 270, }}
                                    source={{ uri: `${props.details.images}` }}
                                />
                                <View style={{ flexDirection: 'row' }}>
                                    {
                                        quantity <= 1 ? <TouchableOpacity style={{
                                            backgroundColor: '#0083c1', height: 35, width: 60, borderBottomLeftRadius: 15,
                                            borderTopLeftRadius: 15, justifyContent: 'center', alignItems: 'center'
                                        }}>
                                            <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>-</Text>
                                        </TouchableOpacity> : <TouchableOpacity style={{
                                            backgroundColor: '#0083c1', height: 35, width: 60, borderBottomLeftRadius: 15,
                                            borderTopLeftRadius: 15, justifyContent: 'center', alignItems: 'center'
                                        }}
                                            onPress={() => setQuantity(quantity - 1)}
                                        >
                                                <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>-</Text>
                                            </TouchableOpacity>
                                    }

                                    <TouchableOpacity style={{ backgroundColor: 'lightgrey', height: 35, width: 60, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>{quantity}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        backgroundColor: '#0083c1', height: 35, width: 60, justifyContent: 'center', alignItems: 'center', borderBottomRightRadius: 15,
                                        borderTopRightRadius: 15,
                                    }}
                                        onPress={() => setQuantity(quantity + 1)}
                                    >
                                        <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>+</Text>
                                    </TouchableOpacity>
                                    <View style={{ marginHorizontal: 25 }}>
                                        <TouchableOpacity style={{
                                            backgroundColor: '#0083c1', height: 35, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 15,
                                        }}
                                            onPress={() => addToCart(props.details)}
                                        >
                                            <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>Add to cart</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ marginTop: 10, fontSize: 16, color: 'orange', fontWeight: 'bold' }}> ৳{props.details.sale_price}</Text>
                                    <Text style={{ marginTop: 10, marginLeft: 15, fontSize: 15, fontWeight: 'bold', textDecorationLine: 'line-through', textDecorationStyle: 'solid', }}>
                                        {props.details.regular_price}
                                    </Text>
                                </View>
                                <Text style={{ marginTop: 10, fontSize: 16, color: 'grey', fontWeight: 'bold' }}>Highlights</Text>
                                <View style={{ margin: 10 }}>
                                    <Text style={{ fontSize: 16, color: 'black' }}>{props.details.description}</Text>
                                </View>
                                <Text style={{ marginTop: 10, fontSize: 16, color: 'grey', fontWeight: 'bold' }}>Related products</Text>
                                <View style={{ margin: 0 }}>
                                    <View style={{ marginHorizontal: 4 }}>
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
                                    </View>
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </View>
            {/* <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end',marginHorizontal:10}}>
                <TouchableOpacity style={{borderRadius:50,backgroundColor:'#0083c1',width:50,height:50,alignItems:'center',justifyContent:'center',marginBottom:10}}>
                    <Image style={{width:35,height:35,}}tintColor="white" source={require('../../assets/Shopping-Cart-icon.png')}/>
                </TouchableOpacity>
            </View> */}
        </View>
    );
};
const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
    }
}


const style = StyleSheet.create({
    card: {
        justifyContent: 'space-around',
        width: 150,
        height: 250,
        backgroundColor: 'white',
        marginHorizontal: 2,
        borderRadius: 10,
        marginBottom: 10,
        padding: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
    },
});
export default connect(null, mapDispatchToProps)(Product_details);
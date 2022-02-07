import React, { Component, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Image,
    TouchableOpacity
} from "react-native";
import { connect } from 'react-redux'
import { useEffect } from "react";

const Cart = (props) => {
    const [cart, setCart] = useState(1)
    const checkOutItemHandler = (productId, productQuantity) => {
        // const newCart = cart.map(item => {
        //     if (item.id == productId) {
        //         item.quantity = productQuantity;
        //     }
        //     return item;
        // })

        // const filteredCart = newCart.filter(item => item.quantity > 0)
        setCart(productId);
        console.log(cart, 'data')
    }

  

    // const [quantity, setQuantity] = useState(1);
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        totalPrice = totalPrice + product.price * cart.quantity;
    }


    const renderItem = ({ item }) => (
        <View style={{ alignContent: 'center', backgroundColor: '#f2f2f2', margin: 10, borderRadius: 10, paddingBottom: 10 }}>
            <View style={{ flexDirection: 'row', }}>
                <View>
                    <Image style={{ width: 80, height: 80, margin: 2 }} source={{ uri: `${item.images}` }} />
                </View>
                <View style={{ marginLeft: 5 }} >
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            item.quantity <= 1 ? <TouchableOpacity style={{
                                backgroundColor: '#0083c1', height: 30, width: 35, borderBottomLeftRadius: 15,
                                borderTopLeftRadius: 15, justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>-</Text>
                            </TouchableOpacity> : <TouchableOpacity style={{
                                backgroundColor: '#0083c1', height: 30, width: 35, borderBottomLeftRadius: 15,
                                borderTopLeftRadius: 15, justifyContent: 'center', alignItems: 'center'
                            }}
                                onClick={() => checkOutItemHandler(item.id, (item.quantity - 1))}
                            >
                                    <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>-</Text>
                                </TouchableOpacity>
                        }
                        <TouchableOpacity style={{ backgroundColor: 'white', height: 30, width: 50, justifyContent: 'center', alignItems: 'center', borderColor: '#ddd', borderWidth: 1, }}>
                            <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>{item.quantity}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: '#0083c1', height: 30, width: 35, justifyContent: 'center', alignItems: 'center', borderBottomRightRadius: 15,
                            borderTopRightRadius: 15,
                        }}
                            // onPress={() => setQuantity(quantity + 1)}
                            onClick={() => checkOutItemHandler(item.id, (item.quantity + 1))}
                        >
                            <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>+</Text>
                        </TouchableOpacity>
                        <View style={{ marginLeft: 5 }}>
                            <Text style={{ color: '#FFA500', fontWeight: 'bold', fontSize: 16 }}>${item.quantity * item.sale_price.toFixed(2)}</Text>
                            <Text style={{ color: 'grey', fontSize: 16, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>${item.regular_price}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View
                style={{
                    marginLeft: 10,
                    borderBottomColor: 'black',
                    borderBottomWidth: 0.8,
                    width: '95%',
                }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{}}>
                    <Text style={{ color: 'grey', fontSize: 16, textDecorationStyle: 'solid', }}>Per MRP: {item.regular_price}</Text>
                    <Text style={{ color: '#FFA500', fontWeight: 'bold', fontSize: 16, }}>Discount {item.cat_discount_percentage}%</Text>
                </View>
                <View style={{ height: '80%', width: 1, backgroundColor: 'black', marginTop: 5 }}></View>
                <TouchableOpacity onPress={() => props.removeItem(item)} style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Image style={{ width: 35, height: 35 }} source={require('../../assets/remove.png')} />
                    <Text style={{ color: 'blue', fontSize: 16 }}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={props.cartItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#f2f2f2', margin: 10, borderRadius: 10, paddingBottom: 10 }}>
                <Text style={{ color: 'blue', fontSize: 16, }}> Total Price  </Text>
                <Text style={{ color: 'blue', fontSize: 16 }}> = {totalPrice}</Text>
            </View>
        </SafeAreaView>
    );
}

//  -----------
const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}

// -----------
const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product })
    }
}


// ---------
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    title: {
        fontSize: 18,
        width: "72%",
        flexWrap: 'wrap'
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
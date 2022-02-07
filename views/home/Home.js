import React, { Component } from 'react';
import { Text, View, KeyboardAvoidingView, TextInput, StyleSheet, Image, ScrollView, Button, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import MyCarousel from '../../components/slider/MyCarousel';
import Products from '../../components/products/Products';


class Home extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }


    navigationButtonPressed({ buttonId }) {
        if (buttonId === 'sideBar') {
            Navigation.mergeOptions(this.props.componentId, {
                sideMenu: {
                    left: {
                        visible: true,
                    }
                }
            });
        }
        if (buttonId === 'cartIcon') {
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'cart',
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
                                id: 'cartIcon',
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
    }

    render() {
        return (
            <View style={{ backgroundColor: '#e0e0e0' }}>
                <View style={styles.SectionStyle}>
                    <TextInput
                        style={{ flex: 1, paddingLeft: 10 }}
                        placeholder="Search Medicine... ঔষধ সার্চ করুন"
                        underlineColorAndroid="transparent"
                    />
                    <Image
                        source={require('../../assets/search.png')} //Change your icon image here
                        style={styles.ImageStyle}
                    />
                </View>
                <ScrollView style={{ height: '90%' }} showsVerticalScrollIndicator={false}>
                    <MyCarousel />
                    <View style={{ marginTop: -45 }}>
                        <View style={{ backgroundColor: 'white', padding: 10, marginHorizontal: 10, borderRadius: 15 }}>
                            <View>
                                <Text style={{ color: 'gray', fontWeight: 'bold' }}>Categories</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 30, marginTop: 10 }}>
                                <View style={{ marginHorizontal: 10, padding: 0, alignItems: 'center' }}>
                                    <Image style={{ width: 50, height: 50 }} source={require('../../assets/drawable/personal_care.png')} />
                                    <Text style={{ color: 'gray', fontSize: 14 }}> Personal Care </Text>
                                </View>
                                <View style={{ marginHorizontal: 10, padding: 0, alignItems: 'center' }}>
                                    <Image style={{ width: 50, height: 50 }} source={require('../../assets/drawable/diabetic_care.png')} />
                                    <Text style={{ color: 'gray', fontSize: 14 }}> Diabetic Care </Text>
                                </View>
                                <View style={{ marginHorizontal: 10, padding: 0, alignItems: 'center' }}>
                                    <Image style={{ width: 50, height: 50 }} source={require('../../assets/drawable/health_conditions.png')} />
                                    <Text style={{ color: 'gray', fontSize: 14 }}> Health Conditions </Text>
                                </View>
                            </View>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <View style={{ marginHorizontal: 10, padding: 0, alignItems: 'center' }}>
                                    <Image style={{ width: 50, height: 50 }} source={require('../../assets/drawable/women_care.png')} />
                                    <Text style={{ color: 'gray', fontSize: 14 }}> Womer Care </Text>
                                </View>
                                <View style={{ marginHorizontal: 10, padding: 0, marginLeft: 30, alignItems: 'center' }}>
                                    <Image style={{ width: 50, height: 50 }} source={require('../../assets/drawable/baby_care.png')} />
                                    <Text style={{ color: 'gray', fontSize: 14 }}> Baby Care </Text>
                                </View>
                                <View style={{ marginHorizontal: 10, padding: 0, alignItems: 'center', marginLeft: 25 }}>
                                    <Image style={{ width: 50, height: 50 }} source={require('../../assets/drawable/sexual_wellness.png')} />
                                    <Text style={{ color: 'gray', fontSize: 14 }}> Sexual Wellness </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'white', padding: 10, marginHorizontal: 10, borderRadius: 15, marginTop: 15, }}>
                        <View style={{ paddingLeft: 10 }}>
                            <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 16 }}>Quick Order</Text>
                            <Text style={{ color: 'gray', fontSize: 16 }}>{`Upload doctor's prescripton
and we will add the medicines 
for you!`} </Text>
                            <TouchableOpacity style={{ width: 90, marginTop: 10, borderRadius: 8, paddingVertical: 10, color: '#fff', textAlign: 'center', backgroundColor: '#68a0cf', borderRadius: 10, alignItems: "center" }}>
                                <Text style={{ color: '#fff', fontSize: 16 }}>Upload</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }} >
                            <Image source={require('../../assets/drawable/pres_upload.png')} style={{ height: 115, width: 100, marginLeft: 6 }} />
                        </View>
                    </View>
                    <Image style={{ height: 150, margin: 10, borderRadius: 10 }} source={{ uri: `https://epharma.com.bd/storage/mobile_banner/epharma-banners-01.jpg` }} />
                    <Products props={this.props} />
                </ScrollView>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#000',
        height: 50,
        borderRadius: 5,
        margin: 10,
    },
    ImageStyle: {
        padding: 8,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    }
})
export default Home;
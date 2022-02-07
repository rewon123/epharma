import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Home from './views/home/Home';
import Sidebar from './components/sidebar/Sidebar';
import TopBar from './components/topbar/TopBar';
import Product_details from './views/product_details/Product_details';
import Cart from './views/Cart/Cart';
import { Provider } from 'react-redux';

Navigation.registerComponent('Home', () => (props) =>
    <Provider store={store}>
        <Home {...props} />
    </Provider>,
    () => Home);
Navigation.registerComponent('Side', () => Sidebar);
Navigation.registerComponent('topbar', () => TopBar);
Navigation.registerComponent('productsDetails', () => (props) =>
    <Provider store={store}>
        <Product_details {...props} />
    </Provider>,
    () => Product_details);
Navigation.registerComponent('cart', () => (props) =>
    <Provider store={store}>
        <Cart {...props} />
    </Provider>,
    () => Cart);


Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setRoot({
        root: {
            sideMenu: {
                center: {
                    stack: {
                        children: [
                            {
                                component: {
                                    name: 'Home',
                                    options: {
                                        topBar: {
                                            background: { color: '#0083c1' },
                                            leftButtons: {
                                                id: 'sideBar',
                                                icon: require('./assets/menu.png')
                                            },
                                            rightButtons: {
                                                id: 'cartIcon',
                                                icon: require('./assets/Shopping-Cart-icon.png')
                                            },
                                            title: {
                                                component: {
                                                    name: 'topbar'
                                                }
                                            }
                                        }
                                    },
                                }
                            },
                        ]
                    }
                },
                left: {
                    component: {
                        name: 'Side'
                    }
                }
            }
        }
    });
});
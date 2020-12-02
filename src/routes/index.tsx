import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { AntDesign } from '@expo/vector-icons';
import { DrawerComponent } from '../components/DrawerComponent';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

/* [Pages] */
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Settings from '../pages/Settings';
import PlusMessage from '../components/PlusMessage';
import AddMessage from '../pages/AddMessage';
import Search from '../pages/Search';

const DashboardNavigator = createSwitchNavigator({
  Dashboard
});


const SettingsNavigator = createSwitchNavigator({
  Settings
});

const SearchNavigator = createSwitchNavigator({
  Search
});


const Drawer = createDrawerNavigator({
  Resumo: DashboardNavigator,
  Buscar: SearchNavigator,
  Sair: SettingsNavigator
},
  {
    contentComponent: DrawerComponent,
    'drawerOpenRoute': 'DrawerOpen',
    'drawerCloseRoute': 'DrawerClose',
    'drawerToggleRoute': 'DrawerToggle',
    navigationOptions: {
      gesturesEnabled: false,
    },
  });




const createBottomBar = createMaterialBottomTabNavigator(
  {
    Dashboard: {
      screen: DashboardNavigator,

      navigationOptions: {
        tabBarIcon: (state) => {
          return <AntDesign name="home" size={25} color={state.focused ? '#73DA86' : '#B1B1B1'} />
        },
      }
    },
    Buscar: {
      screen: Search,
      navigationOptions: {
        tabBarIcon: (state) => {
          return <AntDesign name="search1" size={25} color={state.focused ? '#73DA86' : '#B1B1B1'} />
        },
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: (state) => {
          return <AntDesign name="setting" size={25} color={state.focused ? '#73DA86' : '#B1B1B1'} />
        },
      }
    },

  },
  {
    labeled: false,

    initialRouteName: 'Dashboard',
    activeColor: '#73DA86',

    inactiveColor: '#B1B1B1',
    barStyle: { backgroundColor: '#fff', borderTopColor: '#B1B1B1', borderTopWidth: 1 },
  }
);

const Main = createStackNavigator({
  Default: {
    screen: createBottomBar,
    navigationOptions: ({ navigation }) => ({
      title: `Diário de Obra`,
      headerStyle: {
        backgroundColor: '#228855'
      },
      headerTitleStyle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '300',
      },
      headerRight: <PlusMessage onPress={() => navigation.navigate('addMessage')} />
    }),

  },
  addMessage: {
    screen: AddMessage,
    navigationOptions: () => ({
      title: 'Adicionar história'
    })
  },
}, {
  initialRouteName: 'Default',
  cardStyle: {
    backgroundColor: '#E9EBEE'
  }
})

const navigation = createSwitchNavigator({
  Login,
  Main: Main
},
  {
    initialRouteName: 'Login',
  });

export default createAppContainer(navigation);
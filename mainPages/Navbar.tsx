import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './Home'
import Profile from './Profile'
import Chat from './Chat'
import Other from './Other'

const Tab = createBottomTabNavigator();


export default function Navbar(){
    return(
        <Tab.Navigator>
            <Tab.Screen name = "Home" component={Home} />
            <Tab.Screen name = "Other" component = {Other} />
            <Tab.Screen name = "Chat" component={Chat} />
            <Tab.Screen name = "Profile" component={Profile} />
        </Tab.Navigator>
    )
}
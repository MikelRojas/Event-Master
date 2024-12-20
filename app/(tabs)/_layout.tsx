import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
        <Tabs.Screen
            name="createEvents"
            options={{
                title: 'Create Events',
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'add' : 'add-outline'} color={color} />
                ),
            }}
        />
        <Tabs.Screen
            name="events"
            options={{
                title: 'Events',
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'book' : 'book-outline'} color={color} />
                ),
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                title: 'Profile',
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
                ),
            }}
        />
    </Tabs>
  );
}

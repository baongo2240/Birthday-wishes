
import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import React from 'react';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      route: '/(home)',
      label: 'Birthday',
      icon: 'heart.fill',
      color: colors.primary,
    },
    {
      route: '/profile',
      label: 'About',
      icon: 'person.fill',
      color: colors.secondary,
    },
  ];

  if (Platform.OS === 'ios') {
    return (
      <>
        <NativeTabs>
          <NativeTabs.Screen
            name="(home)"
            options={{
              title: 'Birthday 💖',
              tabBarIcon: ({ focused, color }) => (
                <Icon name={focused ? 'heart.fill' : 'heart'} color={color} />
              ),
              tabBarActiveTintColor: colors.primary,
              tabBarInactiveTintColor: colors.textSecondary,
            }}
          />
          <NativeTabs.Screen
            name="profile"
            options={{
              title: 'About ✨',
              tabBarIcon: ({ focused, color }) => (
                <Icon name={focused ? 'person.fill' : 'person'} color={color} />
              ),
              tabBarActiveTintColor: colors.primary,
              tabBarInactiveTintColor: colors.textSecondary,
            }}
          />
        </NativeTabs>
      </>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(home)" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}

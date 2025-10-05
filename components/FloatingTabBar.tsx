
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { useRouter, usePathname } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { useTheme } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/styles/commonStyles';

export interface TabBarItem {
  route: string;
  label: string;
  icon: string;
  color: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerWidth?: number;
  borderRadius?: number;
  bottomMargin?: number;
}

const { width } = Dimensions.get('window');

export default function FloatingTabBar({
  tabs,
  containerWidth = width * 0.7,
  borderRadius = 25,
  bottomMargin = 34,
}: FloatingTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  // Create animated values for each tab at the component level
  const animatedValues = React.useMemo(() => 
    tabs.map(() => useSharedValue(0)), 
    [tabs.length]
  );

  const handleTabPress = (route: string, index: number) => {
    console.log(`Navigating to: ${route}`);
    router.push(route as any);
    
    // Animate the pressed tab
    animatedValues[index].value = withSpring(1, {
      duration: 200,
      dampingRatio: 0.8,
    });
    
    // Reset other tabs
    animatedValues.forEach((value, i) => {
      if (i !== index) {
        value.value = withSpring(0, {
          duration: 200,
          dampingRatio: 0.8,
        });
      }
    });
  };

  const isActiveRoute = (route: string) => {
    if (route === '/(home)') {
      return pathname === '/' || pathname.startsWith('/(tabs)/(home)');
    }
    return pathname === route || pathname.startsWith(route);
  };

  // Custom hook for animated style
  const useTabAnimatedStyle = (index: number) => {
    return useAnimatedStyle(() => {
      const scale = interpolate(animatedValues[index].value, [0, 1], [1, 1.2]);
      const translateY = interpolate(animatedValues[index].value, [0, 1], [0, -2]);
      
      return {
        transform: [{ scale }, { translateY }],
      };
    });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { bottom: bottomMargin }]} edges={['bottom']}>
      <View style={[styles.container, { width: containerWidth }]}>
        <BlurView
          intensity={Platform.OS === 'ios' ? 100 : 80}
          tint="light"
          style={[
            styles.tabBar,
            {
              borderRadius,
              backgroundColor: Platform.OS === 'ios' ? 'transparent' : colors.card + 'E6',
            },
          ]}
        >
          {tabs.map((tab, index) => {
            const isActive = isActiveRoute(tab.route);
            const animatedStyle = useTabAnimatedStyle(index);
            
            return (
              <TouchableOpacity
                key={tab.route}
                style={styles.tabItem}
                onPress={() => handleTabPress(tab.route, index)}
                activeOpacity={0.7}
              >
                <Animated.View style={[styles.tabContent, animatedStyle]}>
                  <IconSymbol
                    name={tab.icon as any}
                    size={24}
                    color={isActive ? colors.primary : colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.tabLabel,
                      {
                        color: isActive ? colors.primary : colors.textSecondary,
                        fontWeight: isActive ? '600' : '500',
                      },
                    ]}
                  >
                    {tab.label}
                  </Text>
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </BlurView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: colors.highlight + '40',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tabContent: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Nunito_500Medium',
  },
});

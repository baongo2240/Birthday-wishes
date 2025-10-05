
import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Platform,
  Animated,
  Dimensions
} from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { GlassView } from "expo-glass-effect";
import { useTheme } from "@react-navigation/native";
import { colors, commonStyles } from "@/styles/commonStyles";
import * as Haptics from 'expo-haptics';
import { 
  useFonts,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';

const { width, height } = Dimensions.get('window');

export default function BirthdayScreen() {
  const theme = useTheme();
  const [heartAnimation] = useState(new Animated.Value(1));
  const [confettiVisible, setConfettiVisible] = useState(false);
  const [loveCount, setLoveCount] = useState(0);
  
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  // Birthday messages
  const birthdayMessages = [
    "🎂 Wishing you the most amazing birthday filled with joy and laughter!",
    "🌟 May this special day bring you endless happiness and beautiful memories!",
    "💖 Hope your birthday is as wonderful and special as you are!",
    "🎉 Celebrating you today and always - you deserve all the happiness in the world!",
    "🌸 May your new year be filled with love, success, and incredible adventures!",
    "✨ You light up every room you enter - have the most magical birthday!",
    "🎈 Sending you warm birthday wishes and lots of virtual hugs!",
    "🌺 May this birthday mark the beginning of your best year yet!"
  ];

  // Animate heart on mount
  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(heartAnimation, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(heartAnimation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };
    pulse();
  }, [heartAnimation]);

  const handleSendLove = () => {
    console.log('Sending love! 💕');
    
    // Haptic feedback
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    // Increment love count
    setLoveCount(prev => prev + 1);
    
    // Show confetti effect
    setConfettiVisible(true);
    setTimeout(() => setConfettiVisible(false), 2000);
    
    // Heart animation
    Animated.sequence([
      Animated.timing(heartAnimation, {
        toValue: 1.5,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(heartAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderConfetti = () => {
    if (!confettiVisible) return null;
    
    const confettiEmojis = ['🎉', '🎊', '💖', '🌟', '✨', '🎂', '🎈', '🌸'];
    
    return (
      <View style={styles.confettiContainer}>
        {Array.from({ length: 20 }).map((_, index) => (
          <Text 
            key={index} 
            style={[
              styles.confettiEmoji,
              {
                left: Math.random() * width,
                animationDelay: `${Math.random() * 2}s`,
              }
            ]}
          >
            {confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)]}
          </Text>
        ))}
      </View>
    );
  };

  if (!fontsLoaded) {
    return (
      <View style={[commonStyles.container, { backgroundColor: colors.background }]}>
        <Text style={commonStyles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Happy Birthday! 🎂",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.primary,
          headerTitleStyle: {
            fontFamily: 'Nunito_700Bold',
            fontSize: 18,
          },
        }}
      />
      
      <ScrollView 
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderConfetti()}
        
        {/* Main Birthday Greeting */}
        <View style={styles.heroSection}>
          <Animated.View style={[styles.heartContainer, { transform: [{ scale: heartAnimation }] }]}>
            <Text style={styles.heartEmoji}>💖</Text>
          </Animated.View>
          
          <Text style={[commonStyles.title, styles.birthdayTitle]}>
            Happy Birthday!
          </Text>
          
          <Text style={[commonStyles.subtitle, styles.nameText]}>
            Beautiful Soul ✨
          </Text>
          
          <Text style={[commonStyles.text, styles.mainMessage]}>
            Today is all about celebrating the amazing person you are! 
            May this special day bring you endless joy, laughter, and all the happiness your heart can hold. 🌟
          </Text>
        </View>

        {/* Interactive Love Button */}
        <View style={styles.interactionSection}>
          <TouchableOpacity 
            style={styles.loveButton}
            onPress={handleSendLove}
            activeOpacity={0.8}
          >
            <GlassView style={styles.loveButtonGlass} glassEffectStyle="regular">
              <Text style={styles.loveButtonEmoji}>💕</Text>
              <Text style={styles.loveButtonText}>Send Love</Text>
              {loveCount > 0 && (
                <Text style={styles.loveCounter}>+{loveCount}</Text>
              )}
            </GlassView>
          </TouchableOpacity>
        </View>

        {/* Birthday Messages Section */}
        <View style={styles.messagesSection}>
          <Text style={[commonStyles.subtitle, styles.sectionTitle]}>
            Birthday Wishes 🎈
          </Text>
          
          {birthdayMessages.map((message, index) => (
            <View key={index} style={[commonStyles.card, styles.messageCard]}>
              <Text style={[commonStyles.text, styles.messageText]}>
                {message}
              </Text>
            </View>
          ))}
        </View>

        {/* Special Birthday Quote */}
        <View style={[commonStyles.card, styles.quoteCard]}>
          <Text style={styles.quoteEmoji}>🌸</Text>
          <Text style={[commonStyles.text, styles.quoteText]}>
            "A birthday is just the first page of a new chapter in the beautiful story of your life. 
            May this chapter be filled with love, adventure, and dreams coming true!"
          </Text>
          <Text style={styles.quoteEmoji}>🌸</Text>
        </View>

        {/* Bottom spacing for tab bar */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
  },
  heartContainer: {
    marginBottom: 20,
  },
  heartEmoji: {
    fontSize: 80,
    textAlign: 'center',
  },
  birthdayTitle: {
    fontSize: 36,
    color: colors.primary,
    marginBottom: 10,
    textShadowColor: colors.highlight,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  nameText: {
    fontSize: 28,
    color: colors.secondary,
    marginBottom: 20,
  },
  mainMessage: {
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  interactionSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  loveButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  loveButtonGlass: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary + '20',
  },
  loveButtonEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  loveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    fontFamily: 'Nunito_600SemiBold',
  },
  loveCounter: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.accent,
    marginLeft: 10,
    fontFamily: 'Nunito_700Bold',
  },
  messagesSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  messageCard: {
    marginBottom: 15,
    backgroundColor: colors.card,
    borderColor: colors.highlight,
    borderWidth: 1,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'left',
  },
  quoteCard: {
    backgroundColor: colors.highlight + '30',
    borderColor: colors.secondary,
    borderWidth: 2,
    alignItems: 'center',
    marginBottom: 20,
  },
  quoteEmoji: {
    fontSize: 30,
    marginVertical: 10,
  },
  quoteText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    fontStyle: 'italic',
    color: colors.text,
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height,
    zIndex: 1000,
    pointerEvents: 'none',
  },
  confettiEmoji: {
    position: 'absolute',
    fontSize: 24,
    top: -50,
    animation: 'fall 3s linear infinite',
  },
  bottomSpacing: {
    height: 100, // Space for floating tab bar
  },
});

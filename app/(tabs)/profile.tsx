
import { GlassView } from "expo-glass-effect";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { IconSymbol } from "@/components/IconSymbol";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, commonStyles } from "@/styles/commonStyles";
import { Stack } from "expo-router";

export default function ProfileScreen() {
  const theme = useTheme();

  return (
    <>
      <Stack.Screen
        options={{
          title: "About This App ✨",
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
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.headerEmoji}>🎂</Text>
          <Text style={[commonStyles.title, styles.appTitle]}>
            Birthday Celebration
          </Text>
          <Text style={[commonStyles.text, styles.appDescription]}>
            A special app created with love to celebrate someone amazing! 💖
          </Text>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={[commonStyles.subtitle, styles.sectionTitle]}>
            Made with Love 💕
          </Text>
          
          <View style={[commonStyles.card, styles.featureCard]}>
            <Text style={styles.featureEmoji}>🌟</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Heartfelt Messages</Text>
              <Text style={styles.featureDescription}>
                Beautiful birthday wishes crafted especially for you
              </Text>
            </View>
          </View>

          <View style={[commonStyles.card, styles.featureCard]}>
            <Text style={styles.featureEmoji}>💖</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Interactive Love</Text>
              <Text style={styles.featureDescription}>
                Tap to send love and see magical confetti animations
              </Text>
            </View>
          </View>

          <View style={[commonStyles.card, styles.featureCard]}>
            <Text style={styles.featureEmoji}>🎉</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Celebration Vibes</Text>
              <Text style={styles.featureDescription}>
                Designed with beautiful colors and smooth animations
              </Text>
            </View>
          </View>
        </View>

        {/* Personal Message Section */}
        <View style={[commonStyles.card, styles.personalCard]}>
          <Text style={styles.personalEmoji}>💌</Text>
          <Text style={[commonStyles.subtitle, styles.personalTitle]}>
            A Personal Note
          </Text>
          <Text style={[commonStyles.text, styles.personalMessage]}>
            This app was created as a small gesture to show how special you are. 
            Every detail was designed with care, from the warm colors to the gentle animations. 
            I hope it brings a smile to your face and makes your birthday even more wonderful! 🌸
          </Text>
          <Text style={styles.signature}>
            With love and best wishes ✨
          </Text>
        </View>

        {/* Tech Info */}
        <View style={styles.techSection}>
          <Text style={[commonStyles.text, styles.techInfo]}>
            Built with React Native & Expo
          </Text>
          <Text style={[commonStyles.text, styles.techInfo]}>
            Designed with Nunito font & beautiful animations
          </Text>
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
  headerSection: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
  },
  headerEmoji: {
    fontSize: 60,
    marginBottom: 15,
  },
  appTitle: {
    color: colors.primary,
    marginBottom: 10,
  },
  appDescription: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 24,
  },
  featuresSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 20,
  },
  featureEmoji: {
    fontSize: 30,
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 5,
    fontFamily: 'Nunito_600SemiBold',
  },
  featureDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 18,
    fontFamily: 'Nunito_400Regular',
  },
  personalCard: {
    backgroundColor: colors.highlight + '20',
    borderColor: colors.secondary,
    borderWidth: 2,
    alignItems: 'center',
    marginBottom: 30,
    padding: 25,
  },
  personalEmoji: {
    fontSize: 40,
    marginBottom: 15,
  },
  personalTitle: {
    color: colors.secondary,
    marginBottom: 15,
  },
  personalMessage: {
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  signature: {
    fontSize: 16,
    fontStyle: 'italic',
    color: colors.primary,
    fontFamily: 'Nunito_500Medium',
  },
  techSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  techInfo: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 5,
  },
  bottomSpacing: {
    height: 100, // Space for floating tab bar
  },
});

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  measurements: {
    height: number;
    weight: number;
    chest: number;
    waist: number;
    hips: number;
    shoulder: number;
    armLength: number;
    inseam: number;
  };
}

interface UserContextType {
  profile: UserProfile | null;
  updateProfile: (profile: UserProfile) => void;
  isProfileComplete: () => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const defaultProfile: UserProfile = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  zipCode: '',
  country: '',
  measurements: {
    height: 0,
    weight: 0,
    chest: 0,
    waist: 0,
    hips: 0,
    shoulder: 0,
    armLength: 0,
    inseam: 0
  }
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Load profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    if (profile) {
      localStorage.setItem('userProfile', JSON.stringify(profile));
    }
  }, [profile]);

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  const isProfileComplete = () => {
    if (!profile) return false;
    const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'zipCode', 'country'];
    return requiredFields.every(field => profile[field as keyof UserProfile] !== '') &&
           Object.values(profile.measurements).every(value => value > 0);
  };

  const value: UserContextType = {
    profile,
    updateProfile,
    isProfileComplete
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
// Sitters models

export type AvailabilityType = "full_time" | "part_time";
export type BackgroundCheckStatus = "pending" | "approved" | "rejected";
export type CancellationPolicy = "flexible" | "moderate" | "strict";
export type HomeOwnership = "own" | "rent";
export type HomeType = "house" | "apartment" | "condo" | "farm";
export type LeashType = "standard" | "retractable" | "long_line";
export type PayoutMethod = "bank_transfer" | "paypal" | "stripe";
export type PottyBreakFrequency = "every_hour" | "every_2_hours" | "every_4_hours" | "every_8_hours";
export type SleepingArrangement = "in_bed" | "in_crate" | "in_own_bed" | "anywhere";
export type WalkDuration = "30_min" | "60_min";
export type WalkType = "private" | "group";
export type WeatherPolicy = "rain_or_shine" | "no_extreme_weather";
export type YardSize = "none" | "small" | "medium" | "large";

export interface SitterPersonalInfoUpdate {
  full_name: string;
  date_of_birth: string; // date
  profile_photo?: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
}

export interface SitterLocationUpdate {
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  service_radius_km: number;
  availability_type: AvailabilityType;
  available_days: string[];
  available_time_slots: Record<string, any>;
  blackout_dates: string[]; // date
}

export interface SitterBoardingUpdate {
  base_price: number;
  boarding_max_pets: number;
  boarding_overnight_supervision: boolean;
  boarding_allowed_pet_types: string[];
  boarding_daily_walks: number;
  boarding_potty_break_freq: PottyBreakFrequency;
  boarding_sleeping_arrangement: SleepingArrangement;
  boarding_separation_policy: boolean;
}

export interface SitterWalkingUpdate {
  walking_duration: WalkDuration;
  walking_type: WalkType;
  walking_max_dogs: number;
  walking_leash_type: LeashType;
  walking_gps_tracking: boolean;
  walking_weather_policy: WeatherPolicy;
}

export interface SitterExperienceUpdate {
  years_of_experience: number;
  pet_experience_types: string[];
  breeds_experience: string[];
  size_experience: string[];
  puppy_experience: boolean;
  senior_pet_experience: boolean;
  medication_experience: boolean;
  behavioral_experience: string[];
  first_aid_certified: boolean;
  vet_clinic_reference?: string;
}

export interface SitterHomeUpdate {
  home_type: HomeType;
  home_ownership: HomeOwnership;
  fenced_yard: boolean;
  yard_size: YardSize;
  pets_in_home: boolean;
  own_pets_details: Record<string, any>;
  children_in_home: boolean;
  smoking_home: boolean;
  crate_available: boolean;
  cameras_in_home: boolean;
}

export interface SitterContentUpdate {
  headline: string;
  bio: string;
  care_routine_description?: string;
  training_philosophy?: string;
  photo_gallery: string[];
  intro_video?: string;
}

export interface SitterPricingUpdate {
  additional_pet_price: number;
  puppy_rate: number;
  holiday_rate: number;
  long_stay_discount: number;
  cancellation_policy: CancellationPolicy;
  payout_method: PayoutMethod;
}

export interface SitterProfileResponse {
  id: string; // uuid
  user_id: string; // uuid
  full_name?: string;
  onboarding_step: number;
  background_check_status: BackgroundCheckStatus;
  created_at: string; // date-time
  date_of_birth?: string; // date
  profile_photo?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  country?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  service_radius_km?: number;
  availability_type?: AvailabilityType;
  available_days: string[];
  available_time_slots: Record<string, any>;
  blackout_dates: string[]; // date
  years_of_experience: number;
  pet_experience_types: string[];
  breeds_experience: string[];
  size_experience: string[];
  puppy_experience: boolean;
  senior_pet_experience: boolean;
  medication_experience: boolean;
  behavioral_experience: string[];
  first_aid_certified: boolean;
  vet_clinic_reference?: string;
  home_type?: HomeType;
  home_ownership?: HomeOwnership;
  fenced_yard: boolean;
  yard_size?: YardSize;
  pets_in_home: boolean;
  own_pets_details: Record<string, any>;
  children_in_home: boolean;
  smoking_home: boolean;
  crate_available: boolean;
  cameras_in_home: boolean;
  headline?: string;
  bio?: string;
  care_routine_description?: string;
  training_philosophy?: string;
  photo_gallery: string[];
  intro_video?: string;
  base_price: number;
  additional_pet_price: number;
  puppy_rate: number;
  holiday_rate: number;
  long_stay_discount: number;
  cancellation_policy?: CancellationPolicy;
  payout_method?: PayoutMethod;
  payout_verified: boolean;
}

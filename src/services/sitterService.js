import apiClient from '../api/api';
import type {
  SitterProfileResponse,
  SitterPersonalInfoUpdate,
  SitterLocationUpdate,
  SitterBoardingUpdate,
  SitterWalkingUpdate,
  SitterExperienceUpdate,
  SitterHomeUpdate,
  SitterContentUpdate,
  SitterPricingUpdate,
} from '../models/sitters';

export const getMyProfile = (): Promise<SitterProfileResponse> => {
  return apiClient.get('/sitters/me');
};

export const updatePersonalInfo = (data: SitterPersonalInfoUpdate): Promise<SitterProfileResponse> => {
  return apiClient.patch('/sitters/personal-info', data);
};

// New function for uploading the profile photo
export const uploadProfilePhoto = async (imageUri: string) => {
  const formData = new FormData();
  
  // The backend needs to know the name of the file field, e.g., 'file'
  // It also needs the file data itself.
  formData.append('file', {
    uri: imageUri,
    name: `photo_${Date.now()}.jpg`,
    type: 'image/jpeg',
  });

  // Make a POST request to the upload endpoint
  return apiClient.post('/sitters/profile-photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateLocation = (data: SitterLocationUpdate): Promise<SitterProfileResponse> => {
  return apiClient.patch('/sitters/location', data);
};

export const updateBoarding = (data: SitterBoardingUpdate): Promise<SitterProfileResponse> => {
  return apiClient.patch('/sitters/services/boarding', data);
};

export const updateWalking = (data: SitterWalkingUpdate): Promise<SitterProfileResponse> => {
  return apiClient.patch('/sitters/services/walking', data);
};

export const updateExperience = (data: SitterExperienceUpdate): Promise<SitterProfileResponse> => {
  return apiClient.patch('/sitters/experience', data);
};

export const updateHome = (data: SitterHomeUpdate): Promise<SitterProfileResponse> => {
  return apiClient.patch('/sitters/home', data);
};

export const updateContent = (data: SitterContentUpdate): Promise<SitterProfileResponse> => {
  return apiClient.patch('/sitters/content', data);
};

export const updatePricing = (data: SitterPricingUpdate): Promise<SitterProfileResponse> => {
  return apiClient.patch('/sitters/pricing', data);
};

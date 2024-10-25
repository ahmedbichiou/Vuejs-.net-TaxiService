// src/data.js
import { ref } from 'vue';

export const calendarValue = ref(null);
export const departure = ref(null);
export const destination = ref(null);
export const loading = ref([false, false]);
export const interacted = ref(false);

export const dropdownValues = [
  'Hammamet',
  'Tunis',
  'Tunis Carthage Airport',
  'Monastir Airport',
  'Sousse',
  'Monastir',
  'Enfidha Hammamet Airport',
  'Zaghouan',
  'Nabeul',
  'Korba',
  'Kélibia',
  'El Haouaria',
  'Borj Cédria',
  'Kairouan',
  'Tozeur',
  'El Jem',
  'Zarzis',
  'Djerba',
  'Beja',
  'Tabarka',
  'Sfax',
  'Port La Goulette'
];

export const filteredDepartures = ref([]);
export const filteredDestinations = ref([]);

export const inputNumberAdults = ref(1);
export const inputNumberChildren = ref(0);
export const inputNumberBabies = ref(0);

export const hours = ref(null);
export const minutes = ref(null);

export const transfers = ref([
    // From Tunis Carthage Airport
    { id: 1, start: 'Tunis Carthage Airport', destination: 'Hammamet', price4Seater: 40, price8Seater: 50 },
    { id: 2, start: 'Tunis Carthage Airport', destination: 'Enfidha Airport', price4Seater: 60, price8Seater: 70 },
    { id: 3, start: 'Tunis Carthage Airport', destination: 'Sousse', price4Seater: 65, price8Seater: 75 },
    { id: 4, start: 'Tunis Carthage Airport', destination: 'Monastir Airport', price4Seater: 55, price8Seater: 70 },
    { id: 5, start: 'Tunis Carthage Airport', destination: 'Gammarth', price4Seater: 20, price8Seater: 30 },
    { id: 6, start: 'Tunis Carthage Airport', destination: 'Sidi Bou Said', price4Seater: 20, price8Seater: 30 },
    { id: 7, start: 'Tunis Carthage Airport', destination: 'La Marsa', price4Seater: 20, price8Seater: 30 },
    { id: 8, start: 'Tunis Carthage Airport', destination: 'Zaghouan', price4Seater: 40, price8Seater: 50 },
    { id: 9, start: 'Tunis Carthage Airport', destination: 'Korba', price4Seater: 60, price8Seater: 70 },
    { id: 10, start: 'Tunis Carthage Airport', destination: 'Kélibia', price4Seater: 70, price8Seater: 80 },
    { id: 11, start: 'Tunis Carthage Airport', destination: 'El Haouaria', price4Seater: 85, price8Seater: 95 },
    { id: 12, start: 'Tunis Carthage Airport', destination: 'Borj Cédria', price4Seater: 30, price8Seater: 40 },
    { id: 13, start: 'Tunis Carthage Airport', destination: 'Kairouan', price4Seater: 80, price8Seater: 90 },
    { id: 14, start: 'Tunis Carthage Airport', destination: 'Tunis City Center', price4Seater: 17, price8Seater: 20 },
    { id: 15, start: 'Tunis Carthage Airport', destination: 'Tozeur', price4Seater: 150, price8Seater: 180 },
    { id: 16, start: 'Tunis Carthage Airport', destination: 'El Jem', price4Seater: 100, price8Seater: 120 },
    { id: 17, start: 'Tunis Carthage Airport', destination: 'Zarzis', price4Seater: 170, price8Seater: 200 },
    { id: 18, start: 'Tunis Carthage Airport', destination: 'Djerba', price4Seater: 200, price8Seater: 230 },
    { id: 19, start: 'Tunis Carthage Airport', destination: 'Nabeul', price4Seater: 45, price8Seater: 55 },
    { id: 20, start: 'Tunis Carthage Airport', destination: 'Mahdia', price4Seater: 100, price8Seater: 120 },
    { id: 21, start: 'Tunis Carthage Airport', destination: 'Beja', price4Seater: 100, price8Seater: 120 },
    { id: 22, start: 'Tunis Carthage Airport', destination: 'Tabarka', price4Seater: 140, price8Seater: 160 },
    { id: 23, start: 'Tunis Carthage Airport', destination: 'Sfax', price4Seater: 120, price8Seater: 140 },
    { id: 24, start: 'Tunis Carthage Airport', destination: 'Port La Goulette', price4Seater: 25, price8Seater: 35 },
    
    // From Enfidha Airport
    { id: 25, start: 'Enfidha Hammamet Airport', destination: 'Hammamet', price4Seater: 30, price8Seater: 40 },
    { id: 26, start: 'Enfidha Hammamet Airport', destination: 'Sousse', price4Seater: 35, price8Seater: 45 },
    { id: 27, start: 'Enfidha Hammamet Airport', destination: 'Tunis City Center', price4Seater: 60, price8Seater: 70 },
    { id: 28, start: 'Enfidha Hammamet Airport', destination: 'Nabeul', price4Seater: 40, price8Seater: 50 },
    { id: 29, start: 'Enfidha Hammamet Airport', destination: 'Monastir Airport', price4Seater: 40, price8Seater: 50 },
    { id: 30, start: 'Enfidha Hammamet Airport', destination: 'Zaghouan', price4Seater: 40, price8Seater: 50 },
    { id: 31, start: 'Enfidha Hammamet Airport', destination: 'Mahdia', price4Seater: 70, price8Seater: 80 },
    { id: 32, start: 'Enfidha Hammamet Airport', destination: 'Korba', price4Seater: 60, price8Seater: 70 },
    { id: 33, start: 'Enfidha Hammamet Airport', destination: 'Kélibia', price4Seater: 70, price8Seater: 80 },
    { id: 34, start: 'Enfidha Hammamet Airport', destination: 'El Haouaria', price4Seater: 85, price8Seater: 95 },
    { id: 35, start: 'Enfidha Hammamet Airport', destination: 'Djerba', price4Seater: 180, price8Seater: 200 },
    { id: 36, start: 'Enfidha Hammamet Airport', destination: 'Kairouan', price4Seater: 60, price8Seater: 70 },
    { id: 37, start: 'Enfidha Hammamet Airport', destination: 'Borj Cédria', price4Seater: 55, price8Seater: 65 },
    { id: 38, start: 'Enfidha Hammamet Airport', destination: 'Tabarka', price4Seater: 160, price8Seater: 180 },
    { id: 39, start: 'Enfidha Hammamet Airport', destination: 'Beja', price4Seater: 140, price8Seater: 160 },
    { id: 40, start: 'Enfidha Hammamet Airport', destination: 'Tozeur', price4Seater: 145, price8Seater: 175 },
    { id: 41, start: 'Enfidha Hammamet Airport', destination: 'Zarzis', price4Seater: 170, price8Seater: 190 },
    { id: 42, start: 'Enfidha Hammamet Airport', destination: 'El Jem', price4Seater: 90, price8Seater: 110 },
    { id: 43, start: 'Enfidha Hammamet Airport', destination: 'Sfax', price4Seater: 100, price8Seater: 130 },
  
    // From Monastir Airport
    { id: 44, start: 'Monastir Airport', destination: 'Hammamet', price4Seater: 42, price8Seater: 50 },
    { id: 45, start: 'Monastir Airport', destination: 'Nabeul', price4Seater: 55, price8Seater: 65 },
    { id: 46, start: 'Monastir Airport', destination: 'Mahdia', price4Seater: 40, price8Seater: 50 },
    { id: 47, start: 'Monastir Airport', destination: 'Tunis City Center', price4Seater: 70, price8Seater: 80 },
    { id: 48, start: 'Monastir Airport', destination: 'Djerba', price4Seater: 180, price8Seater: 200 },
    { id: 49, start: 'Monastir Airport', destination: 'Kairouan', price4Seater: 50, price8Seater: 60 },
    { id: 50, start: 'Monastir Airport', destination: 'Sousse', price4Seater: 30, price8Seater: 40 },
    { id: 51, start: 'Monastir Airport', destination: 'Borj Cédria', price4Seater: 70, price8Seater: 80 },
    { id: 52, start: 'Monastir Airport', destination: 'Tozeur', price4Seater: 150, price8Seater: 170 },
    { id: 53, start: 'Monastir Airport', destination: 'Korba', price4Seater: 80, price8Seater: 90 },
    { id: 54, start: 'Monastir Airport', destination: 'Tabarka', price4Seater: 170, price8Seater: 190 },
    { id: 55, start: 'Monastir Airport', destination: 'Kélibia', price4Seater: 100, price8Seater: 120 },
    { id: 56, start: 'Monastir Airport', destination: 'Zarzis', price4Seater: 170, price8Seater: 190 },
    { id: 57, start: 'Monastir Airport', destination: 'Sfax', price4Seater: 90, price8Seater: 110 },
   // New transfers from Tunis 
    { id: 58, start: 'Tunis', destination: 'Hammamet', price4Seater: 40, price8Seater: 50 },
    { id: 59, start: 'Tunis', destination: 'Enfidha Airport', price4Seater: 60, price8Seater: 70 },
    { id: 60, start: 'Tunis', destination: 'Sousse', price4Seater: 65, price8Seater: 75 },
    { id: 61, start: 'Tunis', destination: 'Monastir Airport', price4Seater: 55, price8Seater: 70 },
    { id: 62, start: 'Tunis', destination: 'Gammarth', price4Seater: 20, price8Seater: 30 },
    { id: 63, start: 'Tunis', destination: 'Sidi Bou Said', price4Seater: 20, price8Seater: 30 },
    { id: 64, start: 'Tunis', destination: 'La Marsa', price4Seater: 20, price8Seater: 30 },
    { id: 65, start: 'Tunis', destination: 'Zaghouan', price4Seater: 40, price8Seater: 50 },
    { id: 66, start: 'Tunis', destination: 'Korba', price4Seater: 60, price8Seater: 70 },
    { id: 67, start: 'Tunis', destination: 'Kélibia', price4Seater: 70, price8Seater: 80 },
    { id: 68, start: 'Tunis', destination: 'El Haouaria', price4Seater: 85, price8Seater: 95 },
    { id: 69, start: 'Tunis', destination: 'Borj Cédria', price4Seater: 30, price8Seater: 40 },
    { id: 70, start: 'Tunis', destination: 'Kairouan', price4Seater: 80, price8Seater: 90 },
    { id: 71, start: 'Tunis', destination: 'Tunis City Center', price4Seater: 17, price8Seater: 20 },
    { id: 72, start: 'Tunis', destination: 'Tozeur', price4Seater: 150, price8Seater: 180 },
    { id: 73, start: 'Tunis', destination: 'El Jem', price4Seater: 100, price8Seater: 120 },
    { id: 74, start: 'Tunis', destination: 'Zarzis', price4Seater: 170, price8Seater: 200 },
    { id: 75, start: 'Tunis', destination: 'Djerba', price4Seater: 200, price8Seater: 230 },
    { id: 76, start: 'Tunis', destination: 'Nabeul', price4Seater: 45, price8Seater: 55 },
    { id: 77, start: 'Tunis', destination: 'Mahdia', price4Seater: 100, price8Seater: 120 },
    { id: 78, start: 'Tunis', destination: 'Beja', price4Seater: 100, price8Seater: 120 },
    { id: 79, start: 'Tunis', destination: 'Tabarka', price4Seater: 140, price8Seater: 160 },
    { id: 80, start: 'Tunis', destination: 'Sfax', price4Seater: 120, price8Seater: 140 },
    { id: 81, start: 'Tunis', destination: 'Port La Goulette', price4Seater: 25, price8Seater: 35 },
  ]);

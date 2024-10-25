<script setup>


import { useRoute,useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import Button from 'primevue/button';
import { GraphQLClient, gql } from 'graphql-request';
// GraphQL mutation

const router = useRouter();
// Car options for the carousel

const progressWidth = computed(() => {
  return `${(currentStep.value - 1) * 33}%`;
});
// Route data to access reservation details
const route = useRoute();
const reservationData = route.query;


const cars = ref([]); // Initialize the cars array

if (reservationData.seats > 4) {
  // Only show the 8-seater if there are more than 4 seats needed
  cars.value = [
    {
      name: '8-seater',
      image: 'transporter.png',
      price: reservationData.price8Seater, // Use the price for 8-seater
      description: 'Ideal for larger groups or families.',
      seats: 8,
    },
  ];
} else {
  // Show both normal and high-end cars for 4 seats or fewer
  cars.value = [
    {
      name: 'Normal car',
      image: 'polo_sedan.png',
      price: reservationData.price4Seater, // Use the price for 4-seater
      description: 'A reliable and economical car for city travel.',
      seats: 5,
    },
    {
      name: 'High end car',
      image: 'Octavia.png',
      price: (parseFloat(reservationData.price4Seater) || 0) + 5,
      description: 'Luxury car with premium features for a comfortable ride.',
      seats: 5,
    },
    {
      name: '8-seater',
      image: 'transporter.png',
      price: reservationData.price8Seater, // Use the price for 8-seater
      description: 'Ideal for larger groups or families.',
      seats: 8,
    },
  ];
}


// State for current step and selected car
const currentStep = ref(1);
const selectedCar = ref(null);

// New properties
const fullName = ref('');
const surname = ref('');
const number = ref('');
const email = ref('');
const flightName = ref('');
const extraDescription = ref(''); // Added this line

// Carousel responsive options

// Validation states
const errors = ref({
  fullName: '',
  surname: '',
  number: '',
  email: '',
});

const isValidStep2 = computed(() => {
  let valid = true;
  errors.value.fullName = '';
  errors.value.surname = '';
  errors.value.number = '';
  errors.value.email = '';

  if (!fullName.value) {
    errors.value.fullName = 'Firstname is required.';
    valid = false;
  }
  if (!surname.value) {
    errors.value.surname = 'Lastname is required.';
    valid = false;
  }
  
  if (email.value && !/\S+@\S+\.\S+/.test(email.value)) {
    errors.value.email = 'Email is invalid.';
    valid = false;
  }

  return valid;
});

const isValidStep1 = computed(() => selectedCar.value !== null);
const Step2 = () => {
  if (!isValidStep1.value) {
    alert('Please select a car.');
    return;
  }
  currentStep.value = 2;
  scrollToNextStep();
};
const Step3 = () => {
  if (!isValidStep2.value) {
    alert('Please fix the errors before proceeding.');
    return;
  }
  currentStep.value = 3;
  scrollToNextStep();
};
const goToStep = (step) => {
  if (step < currentStep.value) {
    currentStep.value = step;
    scrollToNextStep();
  }
};

const selectCar = (car) => {
  selectedCar.value = car;
};

// Mutate function from Apollo Composable


async function submitForm() {
  const backendUrl = process.env.VUE_APP_API_URL || 'http://localhost:5000';
    const client = new GraphQLClient(backendUrl+'/graphql');
   
    const INSERT_CLIENT= gql`
      mutation {
        createClient(input: {
      name: "${fullName.value}", 
      surname: "${surname.value}", 
      email: "${email.value}", 
      phone: "${number.value}",
        }) {
          name
          surname
          email
          phone
        }
      }
    `;

    // Define the GraphQL mutation to insert a new transfer
    const INSERT_TRANSFER = gql`
      mutation {
        createTransfer(input: {
          start:"${reservationData.departure}",
          end: "${reservationData.destination}",
          price:${selectedCar.value.price},
          clientEmail: "${email.value}",
          date: "${formattedDate.value}",
          time: "${reservationData.hours}:${reservationData.minutes}",
          description:  "${extraDescription.value}"
        }) {
          start
          end
          price
          clientEmail
          date
          time
          description
        }
      }
    `;
    try {
      // Send the mutation request to the server
      const response = await client.request(INSERT_CLIENT);
      
      // Extract the inserted transfer information from the response
      const newClient = response.createClient;

      // Optionally update local state or perform any action with the inserted transfer
      console.log('New client created successfully:', newClient);

    } catch (err) {
      // Handle any errors that occur during the request
      console.error('Error creating new client : ', err);
    }

    try {
      // Send the mutation request to the server
      const response = await client.request(INSERT_TRANSFER);
      
      // Extract the inserted transfer information from the response
      const newTransfer = response.createTransfer;

      // Optionally update local state or perform any action with the inserted transfer
      console.log('New transfer created successfully:', newTransfer);
      setTimeout(() => {
   
    // Navigate to /ReservationDetails route with query parameters
    router.push({
      path: '/confirmation',
      query: reservationData
    });
  }, 3000);
    } catch (err) {
      // Handle any errors that occur during the request
  
    }
}

const scrollToNextStep = () => {
  const nextStepElement = document.querySelector('.step-content:nth-of-type(' + currentStep.value + ')');
  if (nextStepElement) {
    nextStepElement.scrollIntoView({ behavior: 'smooth' });
  }
};

const formattedDate = computed(() => {
  const date = new Date(reservationData.calendarValue); // Convert to Date object
  return date.toLocaleDateString(); // Format as 'MM/DD/YYYY' or your preferred format
});

</script>
<template>
  <div class="multi-step-form">
    <div class="progress-indicator">
  <div
    class="step"
    :class="{ active: currentStep === 1, completed: currentStep > 1 }"
    @click="goToStep(1)"
  >
    🚗 1: Choose Car and Price
  </div>
  <div
    class="step"
    :class="{ active: currentStep === 2, completed: currentStep > 2 }"
    @click="goToStep(2)"
  >
    📝 2: Complete Details
  </div>
  <div
    class="step"
    :class="{ active: currentStep === 3, completed: currentStep > 3 }"
    @click="goToStep(3)"
  >
    ✅ 3: Confirm Details
  </div>

  <div class="progress-bar-container">
    <div class="progress-bar" :style="{ width: progressWidth }"></div>
  </div>
</div>


    <div class="form-content">
      <!-- Reservation Information Section on the right -->
      <div class="reservation-info flex" v-if="currentStep < 3">
  <!-- Reservation Information Card -->
  <div class="detail-cardL">
    <h2 class="font-semibold text-xl mb-2">Reservation Information</h2>
    <p><strong>Date:</strong> {{ formattedDate }} <strong>Time:</strong> {{ reservationData.hours }}:{{ reservationData.minutes }}</p>
    <p><strong>From:</strong> {{ reservationData.departure }} <strong>To:</strong> {{ reservationData.destination }}</p>
    <div class="flex items-center mb-2">
      <div class="flex-1"><strong>Adults:</strong> 👤 {{ reservationData.inputNumberAdults }}</div>
      <div class="flex-1"><strong>Children:</strong> 👶 {{ reservationData.inputNumberChildren }}</div>
      <div class="flex-1"><strong>Babies:</strong> 👶 {{ reservationData.inputNumberBabies }}</div>
    </div>
  </div>

  <!-- Selected Car Card -->
<div class="detail-cardR">
  <h3 class="font-semibold text-xl mb-2">Selected Car</h3>
  <div class="flex items-center">
    <div class="image-container mr-4">
      <img
        :src="selectedCar ? '/demo/images/cars/' + selectedCar.image : '/demo/images/cars/outline.jpg'"
        :alt="selectedCar ? selectedCar.name : '/demo/images/cars/outline.jpg'"
        class="car-image2"
      />
    </div>
    <div class="car-info flex flex-col">
      <div class="flex justify-between">
        <span class="font-semibold">Name:</span>
        <span>{{ selectedCar ? selectedCar.name : '' }}</span>
      </div>
      <div class="flex justify-between">
        <span class="font-semibold">Price:</span>
        <span>{{ selectedCar ? selectedCar.price + '$' : '' }}</span>
      </div>
    </div>
  </div>
</div>
</div>


<div v-if="currentStep === 3" class="step-content">
  <!-- Reservation Details Section -->
  <div>
    <div class="font-semibold text-xl mb-4 text-center">Reservation Details</div>
    <hr class="border-t border-gray-300 mb-4" />
    <div class="flex items-center mb-6">
      <div class="image-container2 mr-4">
        <img
          :src="selectedCar ? '/demo/images/cars/' + selectedCar.image : '/demo/images/cars/outline.jpg'"
          :alt="selectedCar ? selectedCar.name : '/demo/images/cars/outline.jpg'"
          class="car-image3"
        />
      </div>
      <div class="car-info flex flex-col justify-between flex-1">
        <div class="flex justify-between">
          <span class="font-semibold"></span>
          
        </div>
        <div class="flex justify-between">
          <span class="font-semibold"></span>
          <span class="text-2xl font-bold text-right text-green-600">
            {{ selectedCar ? '$' + selectedCar.price : '' }}
          </span>
        </div>
      </div>
    </div>

    <hr class="border-t border-gray-300 mb-4" />

    <!-- Progress Bar Section -->
    <div class="flex flex-col mb-4">
    <!-- Car Image -->
   
    <div class="flex justify-between items-center">
      <!-- Departure Location -->
      <span>{{ reservationData.departure }}</span>

      <!-- Arrow Icon (you can replace this with any arrow icon or graphic you prefer) -->
      <span class="mx-2">→</span>

      <!-- Destination Location -->
      <span>{{ reservationData.destination }}</span>
    </div>
  </div>

    <!-- Display reservation details -->
    <div class="reservation-info2 mb-4">
      <p><strong>Date:</strong> {{ formattedDate }} <strong>Time:</strong> {{ reservationData.hours }}:{{ reservationData.minutes }}</p>
      <div class="flex items-center mb-2">
        <div class="flex-1"><strong>Adults :</strong> 👤 {{ reservationData.inputNumberAdults }}</div>
        <div class="flex-1"><strong>Children:</strong> 👶 {{ reservationData.inputNumberChildren }}</div>
        <div class="flex-1"><strong>Babies :</strong> 👶 {{ reservationData.inputNumberBabies }}</div>
      </div>
    </div>

    <hr class="border-t border-gray-300 mb-4" />

    <!-- Display user details -->
    <div class="user-details mb-4">
      <p><strong>Firstname:</strong> {{ fullName }}</p>
      <p><strong>Lastname:</strong> {{ surname }}</p>
      <p><strong>Phone Number:</strong> {{ number }}</p>
      <p><strong>Email:</strong> {{ email }}</p>
      <p v-if="flightName"><strong>Flight Name:</strong> {{ flightName }}</p>
      <p v-if="extraDescription"><strong>Extra Description:</strong> {{ extraDescription }}</p>
    </div>

    <hr class="border-t border-gray-300 mb-4" />

    <!-- Submit button -->
    <Button label="Submit" @click="submitForm" class="w-full mt-4" />
  </div>
</div>




      <div v-if="currentStep === 1" class="step-content">
  <div>
    <div class="font-semibold text-xl mb-4">Choose Your Car</div>
    
    <!-- List of Cars -->
    <div class="car-list">
      <div 
        v-for="car in cars" 
        :key="car.name" 
        class="car-card"
        :class="{ selected: selectedCar === car }"
        @click="selectCar(car)"
      >
        <div class="car-info">
          <div class="image-container">
            <img
              :src="'/demo/images/cars/' + car.image"
              :alt="car.name"
              class="car-image"
            />
          </div>
          <div class="car-details">
            <div class="mb-4 font-medium">{{ car.name }}</div>
            <div class="flex justify-between items-center mb-2">
              <span>
                <div class="mt-0 font-semibold text-xl">${{ car.price }}</div>
              </span>
            </div>
            <p><strong>Description:</strong> {{ car.description }}</p>
            <p><strong>Seats:</strong> {{ car.seats }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Full Width Confirm Button -->
    <Button label="Confirm" class="confirm-button w-full mt-[2vh]" @click="Step2" />

  </div>
</div>


      <div v-if="currentStep === 2" class="step-content">
        <!-- Using Advanced Layout Structure for the Form -->
        <div>
          <div class="flex flex-col gap-4 w-full">
            <div class="font-semibold text-xl">Complete Your Details</div>

            <!-- First and Last Name fields in two columns -->
            <div class="flex flex-col md:flex-row gap-4">
              <div class="w-full">
                <label for="fullName">Firstname</label>
                <InputText id="fullName" v-model="fullName" placeholder="Enter your firstname" class="w-full" />
              </div>
              <div class="w-full">
                <label for="surname">Lastname</label>
                <InputText id="surname" v-model="surname" placeholder="Enter your lastname" class="w-full" />
              </div>
            </div>

            <!-- Phone Number field -->
            <div class="flex flex-col md:flex-row gap-4">
              <div class="w-full">
                <label for="number">Phone Number</label>
                <InputText id="number" v-model="number" type="number" placeholder="Enter your phone number" class="w-full" />
              </div>
            </div>

            <!-- Email and Flight Name fields in two columns -->
            <div class="flex flex-col md:flex-row gap-4">
              <div class="w-full">
                <label for="email">Email</label>
                <InputText id="email" v-model="email" type="email" placeholder="Enter your email" class="w-full" />
              </div>
              <div class="w-full">
                <label for="flightName">Flight Name (optional)</label>
                <InputText id="flightName" v-model="flightName" placeholder="Enter your flight name" class="w-full" />
              </div>
            </div>

            <!-- Extra description field -->
            <div class="flex flex-col gap-2 w-full">
              <label for="extraDescription">Extra Description (optional)</label>
              <Textarea id="extraDescription" v-model="extraDescription" rows="4" placeholder="Enter any extra details" class="w-full" />
            </div>

            <!-- Submit Button -->
            <Button label="Confirm" @click="Step3" class="confirm-button w-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<style scoped>
@keyframes fadeInFromTop {
  0% {
    opacity: 0;
    transform: translateY(-20px); /* Start slightly above */
  }
  100% {
    opacity: 1;
    transform: translateY(0); /* End at normal position */
  }
}
.step-content {
  opacity: 0; /* Start invisible */
  animation: fadeInFromTop 0.5s ease forwards; /* Apply animation */
}
.detail-cardL{
  width: 50%; /* Equivalent to w-1/2 */
  padding: 1rem; /* Equivalent to p-4 (16px) */
  margin-right: 1vh;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Equivalent to shadow-md */
  background-color: white; /* Optional, to make sure it's visible */
  border-radius: 8px; /* Optional for rounded corners */
}
.detail-cardR{
  width: 50%; /* Equivalent to w-1/2 */
  padding: 1rem; /* Equivalent to p-4 (16px) */
  
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Equivalent to shadow-md */
  background-color: white; /* Optional, to make sure it's visible */
  border-radius: 8px; /* Optional for rounded corners */
}

.progress-bar-container {
  width: 100%;
  height: 8px; /* Height of the progress bar */
  background-color: #e5e7eb; /* Light gray background */
  border-radius: 5px; /* Rounded corners */
  overflow: hidden; /* Prevent overflow */
  margin-top: 5px; /* Space above the progress bar */
}

.progress-bar {
  height: 100%; /* Fill the height of the container */
  background-color: #38a169; /* Green color for the filled part */
  border-radius: 5px; /* Rounded corners */
  transition: width 0.5s ease; /* Smooth animation */
}

/* Optional: Style for the labels above the progress bar */
.progress-bar-container span {
  display: inline-block;
  width: 50%; /* Make sure each span takes half the width */
  text-align: center; /* Center text */
}

  .card {
    width: 100%; /* Full width */
  padding: 20px;
  margin-right: 2vh;
  background-color: #ffffff; /* Light background for visibility */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  margin-bottom: 1%; /* Optional: Subtle shadow */
}
.reservation-info {
 
  
  
 
  border-radius: 8px; 
 
}
.reservation-info2 {
  width: 100%; /* Full width */
  padding: 20px;
  
  /* Light background for visibility */
  border-radius: 8px; /* Rounded corners */
  /* Subtle shadow */
  margin-bottom: 1%; /* Space below the reservation info */
}
.reservation-info h2 {
  margin-bottom: 10px; /* Space below the heading */
  color: #333; /* Dark text color */
}

.reservation-info p {
  margin: 5px 0; /* Space between lines */
  color: #555; /* Slightly lighter text color */
}

/* Mobile Layout (Below 768px) */
@media (max-width: 912px) {
  .progress-indicator {
    background-color: #ffffff;
    display: inline-flex; /* Change to inline-flex to fit the content width */
    flex-direction: column;
    margin-bottom: 30px;
    padding: 20px;
    border-radius: 16px; /* More rounded corners */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* More elevated shadow for a stronger effect */
}
  .car-image3 {
  max-width: 50%; /* Ensure the image fills the container */
  height: auto; /* Maintain aspect ratio */
}
  .reservation-info {
    display: none; /* Hide the reservation info on mobile */
  }
  .multi-step-form {
  display: flex;
  flex-direction: column;
}



.confirm-button {
  width: 100%;
  display: block;
  margin-top: 20px;
}
  .step {
    padding: 10px 20px;
    margin: 5px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s, transform 0.3s;
    cursor: pointer;
    text-align: center;
  }

  .step.active {
    background-color: #007bff;
    color: white;
    transform: scale(1.05);
  }

  .step.completed {
    background-color: #c3e6cb;
    color: #155724;
  }

  .step.inactive {
    opacity: 0.3; /* Grayed out for inactive steps */
    cursor: default;
  }
  
}


/* Grid styles for desktop */
@media (min-width: 911px) {
  .progress-indicator {
    background-color: #ffffff;
    display: inline-flex; /* Change to inline-flex to fit the content width */
    flex-direction: column;
    margin-bottom: 5px;
    
    padding: 20px;
   border-radius: 16px; /* More rounded corners */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* More elevated shadow for a stronger effect *//* More elevated shadow for a stronger effect */
}
  .car-image3 {
  max-width: 60%; /* Ensure the image fills the container */
  height: auto; /* Maintain aspect ratio */
}
  .car-card {
    flex-direction: row; /* Horizontal layout for desktop */
    align-items: center; /* Center items vertically */
  }

  .car-info {
    display: flex; /* Use flexbox for car info */
    width: 100%; /* Ensure full width */
  }

  .image-container {
    width: 30%; /* Fixed width for the image */
    margin-right: 20px; /* Space between image and details */
  }
  .image-container2 {
    width: 30%; /* Fixed width for the image */
    /* Space between image and details */
  }
  .car-details {
    flex: 1; /* Take up the remaining space */
  }
  .multi-step-form {
    display: grid;
    grid-template-columns: 1fr 3fr; /* Adjusted grid layout */
    gap: 20px;
    margin-left: 10vh;
    margin-right: 10vh;
  }
  

  .progress-indicator {
    flex-direction: column;
    width: 100%;
  }
  .multi-step-form {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 20px;
  }
  .step {
  padding: 10px 20px;
  margin: 5px;
  background-color: #f3f3f3;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
  cursor: pointer;
  text-align: center;
}

.step.active {
  background-color: #007bff;
  color: white;
  transform: scale(1.05);
}

.step.completed {
  background-color: #c3e6cb;
  color: #155724;
}
}


.reservation-details .font-semibold {
  color: #2c3e50; /* Darker color for the heading */
  font-size: 1.5rem; /* Larger font size */
}

.reservation-details p {
  margin: 10px 0; /* Space between paragraphs */
  font-size: 1rem; /* Base font size */
  color: #34495e; /* Grayish color for text */
}

.reservation-details strong {
  color: #2980b9; /* Color for bold labels */
}

.reservation-details .mb-4 {
  margin-bottom: 20px; /* Extra spacing for bottom margin */
}

.reservation-details Button {
  
  color: white; /* Button text color */
  padding: 10px 15px; /* Padding for the button */
  border: none; /* Remove default border */
  border-radius: 8px; /* Rounded corners for the button */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.3s; /* Smooth background transition */
}

.reservation-details Button:hover {
  background-color: #3498db; /* Lighter blue on hover */
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
 
  background-color: #fff;
  border-radius: 16px; /* More rounded corners */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* More elevated shadow for a stronger effect */
}




.car-list {
  display: flex;
  flex-direction: column; /* Vertical list */
  gap: 10px; /* Space between car cards */
  
}

.car-card {
  display: flex;
  flex-direction: column; /* Default to vertical layout */
  padding: 20px;
  border: 0.5px solid #cecaca;
  border-radius: 8px;
  transition: transform 0.2s; /* Smooth scale transition */
  cursor: pointer; /* Pointer cursor on hover */
}

.car-card:hover {
  transform: scale(1.01); /* Scale effect on hover */
}

.image-container {
  display: flex;
  justify-content: center; /* Center the image in the container */
}
.car-image2 {
  max-width: 100%; /* Ensure the image fills the container */
  height: auto; /* Maintain aspect ratio */
}

.car-image {
  max-width: 60%; /* Ensure the image fills the container */
  height: auto; /* Maintain aspect ratio */
}
.user-details p {
  margin: 4px 0; /* Spacing between user details */
}
  /* Highlight the selected car with a green border */
  .car-card.selected {
    border-color: green;
    box-shadow: 0 4px 12px rgba(0, 128, 0, 0.4); /* Green glow effect */
    transform: scale(1.00);
  }
  

/* Ensure the image fills the container without clipping */
img {
    max-height: 70%;
    width: auto;
}
</style>

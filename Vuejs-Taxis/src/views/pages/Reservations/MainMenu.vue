<script setup>
import { ref , watch } from 'vue';
import { useRouter } from 'vue-router';
import {
  calendarValue,
  departure,
  destination,
  dropdownValues,
  loading,
  interacted,
  filteredDepartures,
  filteredDestinations,
  inputNumberAdults,
  inputNumberChildren,
  inputNumberBabies,
  hours,
  minutes,
  transfers
} from '../jscodes/data.js';
import { validateFields, isCalendarInvalid, isDepartureInvalid, isDestinationInvalid, arePassengersInvalid, areTimeInvalid } from '../jscodes/validation.js';




const searchDeparture = (event) => {
  const query = event.query.toLowerCase();
  filteredDepartures.value = dropdownValues.filter((item) =>
    item.toLowerCase().includes(query)
  );
};

// Check if the selected departure is valid when the autocomplete is blurred
const checkDepartureValidity = () => {
  if (departure.value && !dropdownValues.includes(departure.value)) {
      departure.value = ''; // Clear the value if the user confirms
  }
};

const checkDestinationValidity = () => {
  if (destination.value && !dropdownValues.includes(destination.value)) {
      destination.value = ''; // Clear the value if the user confirms
  }
};

const search = (event) => {
  const query = event.query.toLowerCase();
  filteredDestinations.value = dropdownValues.filter((item) =>
    item.toLowerCase().includes(query)
  );
};




watch([inputNumberAdults, inputNumberChildren, inputNumberBabies], ([adults, children, babies]) => {
    const totalPassengers = adults + children + babies;
    
    if (totalPassengers > 8) {
        alert("The total number of passengers cannot exceed 8.");
        inputNumberAdults.value = Math.max(0, inputNumberAdults.value - (totalPassengers - 8));
        inputNumberChildren.value = Math.max(0, inputNumberChildren.value - (totalPassengers - 8));
        inputNumberBabies.value = Math.max(0, inputNumberBabies.value - (totalPassengers - 8));
    }
});





const filters1 = ref({
  global: { value: null }
});

// Use the router for navigation
const router = useRouter();



const load = (index) => {
  interacted.value = true; // Set interacted to true on button click

  if (!validateFields()) {
    // Handle validation failure (e.g., show a message)
    alert("Please fill in all fields before searching.");
    return;
  }
  const price4Seater = ref(null);
const price8Seater = ref(null);

function getPrice4Seater(departure, destination) {
  // Attempt to find the transfer from departure to destination
  let transfer = transfers.value.find(
    (t) => t.start === departure && t.destination === destination
  );

  // If no transfer is found, check the inverse route
  if (!transfer) {
    transfer = transfers.value.find(
      (t) => t.start === destination && t.destination === departure
    );
  }

  // If a transfer is found, update the price4Seater value; otherwise, set it to 0
  if (transfer) {
    price4Seater.value = transfer.price4Seater; // Update ref with found price
    return transfer.price4Seater;
  } else {
    price4Seater.value = 0; // Update ref to default price
    return 0; // Default price if no transfer is found
  }
}


function getPrice8Seater(departure, destination) {
  // Attempt to find the transfer from departure to destination
  let transfer = transfers.value.find(
    (t) => t.start === departure && t.destination === destination
  );

  // If no transfer is found, check the inverse route
  if (!transfer) {
    transfer = transfers.value.find(
      (t) => t.start === destination && t.destination === departure
    );
  }

  // If a transfer is found, update the price8Seater value; otherwise, set it to 0
  if (transfer) {
    price8Seater.value = transfer.price8Seater; // Update ref with found price
    return transfer.price8Seater;
  } else {
    price8Seater.value = 0; // Update ref to default price
    return 0; // Default price if no transfer is found
  }
}



// Create an object with all the reservation data
const reservationData = {
  calendarValue: calendarValue.value,
  departure: departure.value, // send the name instead of the object
  destination: destination.value, // send the name instead of the object
  inputNumberAdults: inputNumberAdults.value,
  inputNumberChildren: inputNumberChildren.value,
  inputNumberBabies: inputNumberBabies.value,
  hours: hours.value,
  minutes: minutes.value,
  price4Seater: getPrice4Seater(departure.value, destination.value),
  price8Seater:getPrice8Seater(departure.value, destination.value),
  seats: inputNumberAdults.value + inputNumberChildren.value + inputNumberBabies.value

};

  loading.value[index] = true;
  setTimeout(() => {
    loading.value[index] = false;
    // Navigate to /ReservationDetails route with query parameters
    router.push({
      path: '/ReservationDetails',
      query: reservationData
    });
  }, 1000);
};





</script>

<template>
  <Fluid class="flex flex-col gap-8">
    <div class="custom-card relative w-full flex-grow mb-8 ">
      
  <img
    src="/demo/images/autoroute.webp"
    alt="Background"
    class="rounded-xl absolute inset-0 object-cover w-full h-[calc(100%+4rem)] -top-6 -bottom-2 opacity-90"
  />



  
      <div class="relative z-10 flex flex-col lg:flex-row px-4" >
        <div class="flex-1 flex flex-col justify-center mb-4 lg:mb-0 lg:mr-4 mx-4" >
          <h1 class="text-3xl font-bold mb-2 text-white">Reserve Your Taxi Right Now</h1>
          <h2 class="text-xl font-semibold text-white">We transport all across Tunisia</h2>
        </div>
        
        <div class="relative z-10 card flex flex-col gap-4 p-4 bg-white bg-opacity-90 max-w-md mx-auto rounded-lg shadow-lg mx-4">
          <div class="font-semibold text-xl mb-2">Select Date</div>
<DatePicker
  :showIcon="true"
  :showButtonBar="true"
  v-model="calendarValue"
  placeholder="Pick a date"
  :class="{ 'border-red-500': isCalendarInvalid() }"
  :minDate="new Date()"  
/>


          <div class="font-semibold text-xl mb-2">Select Time</div>
          <div class="flex gap-4">
            <InputNumber 
              v-model="hours" 
              :min=0
              :max=23 
              showButtons 
              placeholder="Hours" 
              class="w-20" 
              :class="{ 'border-red-500': areTimeInvalid() }"  
            />
            <InputNumber 
              v-model="minutes" 
              :min=0 
              :max=59 
              showButtons 
              placeholder="Minutes" 
              class="w-20" 
              :class="{ 'border-red-500': areTimeInvalid() }"  
            />
          </div>

          <div class="font-semibold text-xl mb-2">Select Departure</div>
          <AutoComplete 
  v-model="departure"
  :suggestions="filteredDepartures"
  @complete="searchDeparture"
  @blur="checkDepartureValidity"
  placeholder="Select Departure"
  :class="{ 'border-red-500': isDepartureInvalid() }"
/>
            <!-- Invert button -->
  <div class="flex justify-center my-2">

  </div>
          <div class="font-semibold text-xl mb-2">Select Destination</div>
        
          <AutoComplete 
  v-model="destination"
  :suggestions="filteredDestinations"
  @complete="search"
  @blur="checkDestinationValidity"
    placeholder="Select Destination"
  :class="{ 'border-red-500': isDestinationInvalid() }"
  
/>
          <div class="mb-4">
            <div class="font-semibold text-xl mb-2">Passengers</div>
            <div class="grid grid-cols-3 gap-4">
              <div class="flex flex-col">
                <div class="font-semibold mb-2">Adults</div>
                <InputNumber 
  v-model="inputNumberAdults" 
  showButtons 
  mode="decimal" 
  placeholder="0"
  :min="1"  
  :max="8"  
  class="w-24" 
  :class="{ 'border-red-500': arePassengersInvalid() }"  
/>

              </div>
              <div class="flex flex-col">
                <div class="font-semibold mb-2">Children</div>
                <InputNumber 
  v-model="inputNumberChildren" 
  showButtons 
  mode="decimal" 
  placeholder="0" 
  :min="0"  
  class="w-24" 
  :class="{ 'border-red-500': arePassengersInvalid() }"  
/>
              </div>
              <div class="flex flex-col">
                <div class="font-semibold mb-2">Babies</div>
                <InputNumber 
  v-model="inputNumberBabies" 
  showButtons 
  mode="decimal" 
  placeholder="0" 
  :min="0"  
  class="w-24" 
  :class="{ 'border-red-500': arePassengersInvalid() }" 
/>
              </div>
            </div>
          </div>

          <Button
            type="button"
            label="Search"
            icon="pi pi-search"
            :loading="loading[0]"
            @click="load(0)"
          />
        </div>
      </div>
    </div>


    <!-- Transfers Table -->
    <div class="custom-card flex flex-col gap-4 p-4 w-full mb-8">
      <h2 class="font-semibold text-xl mb-4">Transfer tarifs</h2>
      <div class="flex justify-between">
        <InputText v-model="filters1['global'].value" placeholder="Search" />
      </div>
      <div class="w-full overflow-y-auto mb-8">
        <DataTable
          :value="transfers"
          :paginator="false"
          :rows="10"
          dataKey="id"
          :rowHover="true"
          v-model:filters="filters1"
          filterDisplay="menu"
          :loading="loading[1]"
          :filters="filters1"
          showGridlines
        >
          <template #empty>No transfers found.</template>
          <template #loading>Loading transfers data. Please wait.</template>
          <Column field="start" header="Start" style="min-width: 12rem">
            <template #body="{ data }">{{ data.start }}</template>
          </Column>
          <Column field="destination" header="Destination" style="min-width: 12rem">
            <template #body="{ data }">{{ data.destination }}</template>
          </Column>
          <Column field="price" header="Price 4 seater" style="min-width: 10rem">
            <template #body="{ data }">{{ data.price4Seater }} €</template>
          </Column>
          <Column field="price" header="Price 8 seater" style="min-width: 10rem">
            <template #body="{ data }">{{ data.price8Seater}} €</template>
          </Column>
        </DataTable>
      </div>
    </div>
  </Fluid>
</template>

<style>
.border-red-500 {
  border: 2px solid red; /* Define red border */
}
.custom-card {
  border-radius: 30px; /* Fully circular corners */

  padding: 1rem; /* Adjust as needed */
  margin-bottom: 2rem; /* Adjust as needed */
  background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white */
  border-radius: 0.5rem; /* Adjust border radius as needed */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Elevation/shadow effect */
}
</style>

<script setup>
import { ref, computed } from "vue";
import countries from "../data.json";

// Pagination variables
const currentPage = ref(1);
const countriesPerPage = 12;
const searchQuery = ref("");
const selectedRegion = ref("");

// Calculate total pages and get countries for current page
const totalPages = computed(() => Math.ceil(countries.length / countriesPerPage));
const paginatedCountries = computed(() => {
    const startIndex = (currentPage.value - 1) * countriesPerPage;
    const endIndex = startIndex + countriesPerPage;
    return countries.filter(country => country.name.toLowerCase().includes(searchQuery.value.toLowerCase()) && (selectedRegion.value === "" || country.region === selectedRegion.value)).slice(startIndex, endIndex);
});

// Navigation functions to go to the next page, previous page, and the first page
function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
}

function goToNextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
}

function goToPreviousPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
}

// Generate page numbers for pagination
const pageNumbers = computed(() => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages.value <= maxVisiblePages) {
        // Show all pages if total is less than max visible
        for (let i = 1; i <= totalPages.value; i++) {
            pages.push(i);
        }
    } else {
        // Show pages around current page
        let start = Math.max(1, currentPage.value - 2);
        let end = Math.min(totalPages.value, start + maxVisiblePages - 1);
        
        // Adjust start if we're near the end
        if (end === totalPages.value) {
            start = Math.max(1, end - maxVisiblePages + 1);
        }
        
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
    }
    
    return pages;
});
</script>

<template>
    <section>
       <div class="search-container" v-if="totalPages > 1" role="searchbox" aria-label="Search for a country">
            <input class="search-input" type="text" placeholder="Search for a country..." v-model="searchQuery" @input="goToPage(1)" />
            <button class="search-btn" @click="searchQuery = ''">Clear</button>

            <div class="filter-container">
                <select class="filter-select" name="region" id="region" v-model="selectedRegion" @change="goToPage(1)">
                    <option value="">All Regions</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>
       </div>
        
        <!-- Countries Grid -->
        <div class="flex_card">
            <article
                class="box"
                v-for="country in paginatedCountries"
                :key="country.name"
            >
                <router-link
                    :to="{
                        name: 'CountryDetail',
                        params: { name: country.name },
                    }"
                    class="country-link"
                >
                    <div class="img_flg" role="img" aria-label="Flag">
                        <img :src="country.flag" :alt="`Flag of ${country.name}`" />
                    </div>
                    <div
                        class="card-content"
                        role="region"
                        aria-label="Country Details"
                    >
                        <h2>{{ country.name }}</h2>
                        <p><strong>Population:</strong> {{ country.population.toLocaleString() }}</p>
                        <p><strong>Region:</strong> {{ country.region }}</p>
                        <p><strong>Capital:</strong> {{ country.capital }}</p>
                    </div>
                </router-link>
            </article>
        </div>

        <!-- Pagination Controls -->
        <div class="pagination-container" v-if="totalPages > 1">
            <div class="pagination-info">
                <span>Page {{ currentPage }} of {{ totalPages }}</span>
                <span>Showing {{ ((currentPage - 1) * countriesPerPage) + 1 }} - {{ Math.min(currentPage * countriesPerPage, countries.length) }} of {{ countries.length }} countries</span>
            </div>
            
            <div class="pagination-controls">
                <button 
                    @click="goToPreviousPage" 
                    :disabled="currentPage === 1"
                    class="pagination-btn"
                >
                    ← Previous
                </button>
                
                <div class="page-numbers">
                    <button 
                        v-for="page in pageNumbers" 
                        :key="page"
                        @click="goToPage(page)"
                        :class="['page-btn', { active: page === currentPage }]"
                    >
                        {{ page }}
                    </button>
                </div>
                
                <button 
                    @click="goToNextPage" 
                    :disabled="currentPage === totalPages"
                    class="pagination-btn"
                >
                    Next →
                </button>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Add your styles here */
section {
    width: 90%;
    margin: 0 auto;
    padding: 1rem 1.5rem;
    max-width: 1280px;
}

section h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    text-align: center;
}

section p {
    text-align: center;
    margin-bottom: 2rem;
    color: #666;
}

.search-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 3rem;
}

.search-input {
    width: 76%;
    padding: 1rem 1.5rem;
    border-radius: 5px;
    border: 1px solid #ddd;
    height: 10px;
    font-size: .8rem;
    font-weight: 400;
    position: relative;
    top: 0.5rem;
    left: 0.1rem;
}

.filter-select {
    width: 100%;
    padding: .4rem 2.5rem;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: smaller;
}
.search-btn {
    padding: 0.4rem 2.5rem;
    border-radius: 5px;
    border: 1px solid #ddd;
    position: absolute;
    font-size: 0.8rem;
    left: 14.6rem;
    top: 1.5rem;
}

.flex_card {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
}

.box {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    background-color: transparent;
    cursor: pointer;
}

.box:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.country-link {
    text-decoration: none;
    color: inherit;
    display: block;
}

.img_flg {
    width: 100%;
    height: 200px;
    overflow: hidden;
}

.img_flg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.box:hover .img_flg img {
    transform: scale(1.05);
}

.card-content {
    background-color: hsl(209, 23%, 22%);
    color: white;
    padding: 1.5rem;
    line-height: 1.6;
}

.card-content h2 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    font-weight: 600;
}

.card-content p {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}

.card-content strong {
    color: #ccc;
}

/* Pagination Styles */
.pagination-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
    padding: 2rem 0;
    border-top: 1px solid #eee;
}

.pagination-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: #666;
    font-size: 0.9rem;
}

.pagination-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
}

.pagination-btn {
    padding: 0.5rem 1rem;
    background-color: hsl(209, 23%, 22%);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 0.9rem;
}

.pagination-btn:hover:not(:disabled) {
    background-color: hsl(209, 23%, 30%);
}

.pagination-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    opacity: 0.6;
}

.page-numbers {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
}

.page-btn {
    padding: 0.5rem 0.75rem;
    background-color: #f5f5f5;
    color: #333;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    min-width: 40px;
}

.page-btn:hover {
    background-color: #e9e9e9;
}

.page-btn.active {
    background-color: hsl(209, 23%, 22%);
    color: white;
    border-color: hsl(209, 23%, 22%);
}

@media (min-width: 768px) {
    .flex_card {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
    }
    
    .pagination-info {
        flex-direction: row;
        gap: 2rem;
    }

    .search-container {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .search-input {
        width: 40%;
        left: 1.1rem;
    }

    .search-btn {
        left: 30.6rem;
    }
}

@media (min-width: 1024px) {
    .flex_card {
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    }
}
</style>


<!-- what the v-model does is that it binds the value of the input to the searchQuery variable and the @input event is triggered when the user types in the input -->
<!-- the @input event is triggered when the user types in the input -->
<!-- the goToPage(1) function is called when the user types in the input and the user is redirected to the first page -->
<!-- the goToPage(1) function is called when the user selects a region and the user is redirected to the first page -->
<!-- the goToPage(1) function is called when the user clicks the clear button and the user is redirected to the first page -->
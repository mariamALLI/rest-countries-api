<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import countries from "../data.json";

const route = useRoute();
const country = ref(countries.find((c) => c.name === route.params.name));

function getCountryNameByCode(code) {
    const found = countries.find((c) => c.alpha3Code === code);
    return found ? found.name : code;
}
</script>

<template>
    <section class="country-detail-container">
        <router-link to="/" class="back-button">← Back</router-link>
        <div v-if="country" class="country_detail">
            <div class="flag-container">
                <img
                    :src="`https://flagcdn.com/w320/${country.alpha2Code.toLowerCase()}.png`"
                    :alt="`Flag of ${country.name}`"
                    class="country-flag"
                />
            </div>
            <div class="country-info">
                <h3>{{ country.name }}</h3>

                <div class="info-grid">
                    <div class="part1" role="article">
                        <p>Native Name: {{ country.nativeName }}</p>
                        <p>Population: {{ country.population.toLocaleString() }}</p>
                        <p>Region: {{ country.region }}</p>
                        <p>Subregion: {{ country.subregion }}</p>
                        <p>Capital: {{ country.capital }}</p>
                    </div>

                    <div class="part2" role="article">
                        <p>Top Level Domain: {{ country.topLevelDomain.join(", ") }}</p>
                        <p>
                            Currencies:
                            {{ country.currencies.map((c) => c.name).join(", ") }}
                        </p>
                        <p>
                            Languages:
                            {{ country.languages.map((l) => l.name).join(", ") }}
                        </p>
                    </div>
                </div>

                <div v-if="country.borders && country.borders.length > 0" class="borders-section">
                    <p>Bordering Countries:</p>
                    <div class="borders-list">
                        <router-link
                            v-for="border in country.borders"
                            :key="border"
                            :to="`/country/${getCountryNameByCode(border)}`"
                            class="border-link"
                        >
                            {{ getCountryNameByCode(border) }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="not-found">
            <p>No country found</p> 
            <router-link to="/" class="back-button">← Back</router-link>
        </div>
    </section>
</template>

<style scoped>
.country-detail-container {
    width: 90%;
    margin: 0 auto;
    padding: 2rem 1.5rem;
    max-width: 1280px;
}

.back-button {
    display: inline-block;
    padding: 0.5rem 2rem;
    background-color: var(--bg-elements);
    color: var(--text-primary);
    text-decoration: none;
    border-radius: 5px;
    margin-bottom: 3rem;
    transition: background-color 0.3s ease;
    border: 1px solid var(--border-color);
}

.back-button:hover {
    background-color: var(--card-hover);
}

.country-info h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.country_detail {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.flag-container {
    width: 100%;
    max-width: 400px;
}

.country-flag {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: var(--shadow);
}

.country-info h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
}

.info-grid {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 2rem;
}

.part1 p, .part2 p {
    font-size: smaller;
    line-height: 0.8;
    color: var(--text-primary);
}


.borders-section h3 {
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.borders-section p {
    font-weight: 500;
    color: var(--text-primary);
}

.borders-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.border-link {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: var(--bg-elements);
    color: var(--text-primary);
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    font-size: 0.5rem;
    border: 1px solid var(--border-color);
}

.border-link:hover {
    background-color: var(--card-hover);
}

.not-found {
    text-align: center;
    padding: 3rem;
    color: var(--text-primary);
}

@media (min-width: 768px) {
    .country_detail {
        flex-direction: row;
        align-items: center;
    }

    .country-flag {
        border-radius: 0;
    }
    
    .flag-container {
        flex: 0 0 400px;
    }
    
    .country-info {
        flex: 1;
    }
    
    .info-grid {
        flex-direction: row;
        justify-content: space-evenly;
    }
}
</style>

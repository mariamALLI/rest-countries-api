<script setup>
import countries from "../data.json";
</script>

<template>
    <section>
        <h1>Display Countries</h1>
        <p>This is a component to display {{ countries.length }} countries.</p>
        <div class="flex_card">
            <article
                class="box"
                v-for="country in countries"
                :key="country.name"
            >
                <img class="flag" :src="country.flag" alt="Flag" />
                <h2>{{ country.name }}</h2>
                <p>Population: {{ country.population }}</p>
                <p>Region: {{ country.region }}</p>
                <p>Capital: {{ country.capital }}</p>
                <p>Subregion: {{ country.subregion }}</p>
            </article>
        </div>
    </section>
</template>

<script>
export default {
    name: "DisplayCountries",
};
</script>

<style scoped>
/* Add your styles here */
.flex_card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.box {
    /* border: 1px solid #ccc; */
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    width: 100%;
    height: 50%;
}

.box:hover {
    transform: scale(1.05);
}

.box:active {
    transform: scale(1);
}

.flag {
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin-bottom: 10px;
}

@media (min-width: 768px) {
    .flex_card {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 20px;
        grid-row-gap: 20px;
    }
}

/* @media (max-width: 480px) {
    .box {
        height: auto;
    }
} */
</style>

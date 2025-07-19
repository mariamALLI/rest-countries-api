<script setup>
import { useTheme } from '../composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <nav>
    <div class="nav__container" role="banner">
    <h1>Where in the world?</h1>
    <button 
      @click="toggleTheme" 
      class="theme-toggle"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      <span class="icon">
        <svg v-if="isDark" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/>
        </svg>
        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42m12.72-12.72l1.42-1.42"/>
        </svg>
      </span>
      {{ isDark ? 'Dark Mode' : 'light Mode' }}
    </button>
</div>
  </nav>
</template>

<style scoped>
nav {
 
  padding: 1rem;
  background-color: var(--nav-bg);
  box-shadow: var(--shadow);
  border-bottom: 1px solid var(--border-color);
}

.nav__container {
    display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--nav-bg);
  width: 90%;
}

h1 {
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 800;
  margin: 0;
  background-color: transparent;
}

.theme-toggle {
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.3s ease;
  font-family: inherit;
  margin-right: -3rem;
}

.theme-toggle:hover {
  background-color: var(--bg-secondary);
}

.theme-toggle:focus {
  outline: 2px solid var(--border-color);
  outline-offset: 2px;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.theme-toggle:hover .icon {
  transform: rotate(15deg);
}

@media (min-width: 768px) {
  nav {
    padding: 1rem;
    width: 100vw;
    margin-left: -5rem;
  }
  
  h1 {
    font-size: 1.25rem;
    margin-left: 6rem;
  }
  
  .theme-toggle {
    padding: 0.375rem 0.75rem;
    font-size: 0.8rem;
  }
}
</style>
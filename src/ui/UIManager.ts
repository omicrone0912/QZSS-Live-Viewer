import type { SatellitePosition } from '../utils/orbit';

export class UIManager {
    private statusContainer: HTMLElement;
    private errorBanner: HTMLElement;

    constructor() {
        this.statusContainer = document.getElementById('status-container')!;
        this.errorBanner = document.getElementById('error-banner')!;
    }

    showError(message: string) {
        this.errorBanner.textContent = message;
        this.errorBanner.classList.remove('hidden');
        this.statusContainer.innerHTML = '';
    }

    hideError() {
        this.errorBanner.classList.add('hidden');
    }

    showLoading(message: string) {
        this.statusContainer.innerHTML = `<p class="loading-text">${message}</p>`;
    }

    updateSatellites(satellites: SatellitePosition[]) {
        this.statusContainer.innerHTML = ''; // Clear previous

        if (satellites.length === 0) {
            this.statusContainer.innerHTML = '<p class="loading-text">No Michibiki satellites found in current data.</p>';
            return;
        }

        satellites.forEach(sat => {
            const card = document.createElement('div');
            card.className = 'satellite-card';

            card.innerHTML = `
        <h3 class="sat-name">${sat.name}</h3>
        <div class="stat-row">
          <span class="stat-label">Lat / Lon</span>
          <span class="stat-value">${sat.latitude.toFixed(4)}° / ${sat.longitude.toFixed(4)}°</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">Altitude</span>
          <span class="stat-value">${sat.altitudeKm.toFixed(2)} km</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">Velocity</span>
          <span class="stat-value">${sat.velocityKmS.toFixed(2)} km/s</span>
        </div>
      `;

            this.statusContainer.appendChild(card);
        });
    }
}

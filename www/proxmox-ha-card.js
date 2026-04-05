import { LitElement, html, css } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

class ProxmoxCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
    };
  }

  setConfig(config) {
    if (!config.vms) {
      throw new Error("Bitte konfiguriere die 'vms' (Virtual Machines/Container).");
    }
    this.config = {
      title: "Proxmox",
      ...config
    };
  }

  // Helfer-Funktion, um Service Calls (Buttons drücken) auszuführen
  _handleAction(entityId) {
    if (!entityId) return;
    this.hass.callService("button", "press", { entity_id: entityId });
  }

  render() {
    if (!this.hass || !this.config) {
      return html``;
    }

    // Node Metriken auslesen
    const cpuState = this.config.node_cpu ? this.hass.states[this.config.node_cpu] : null;
    const ramState = this.config.node_memory ? this.hass.states[this.config.node_memory] : null;

    return html`
      <ha-card header="${this.config.title}">
        <div class="card-content">
          
          <div class="stats-grid">
            <div class="stat-box">
              <span class="stat-value">${cpuState ? parseFloat(cpuState.state).toFixed(1) : '-'} %</span>
              <span class="stat-name">CPU Auslastung</span>
            </div>
            <div class="stat-box">
              <span class="stat-value">${ramState ? parseFloat(ramState.state).toFixed(1) : '-'} %</span>
              <span class="stat-name">RAM Auslastung</span>
            </div>
          </div>

          <div class="divider"></div>

          <div class="vm-list">
            ${this.config.vms.map(vm => {
              const statusEntity = vm.status ? this.hass.states[vm.status] : null;
              const isRunning = statusEntity ? statusEntity.state === 'on' : false;

              return html`
                <div class="vm-item">
                  <div class="vm-icon ${isRunning ? 'running' : 'stopped'}">
                    <ha-icon icon="${isRunning ? 'mdi:server-network' : 'mdi:server-network-off'}"></ha-icon>
                  </div>
                  <div class="vm-info">
                    <div class="vm-name">${vm.name}</div>
                    <div class="vm-status">${isRunning ? 'Läuft' : 'Gestoppt'}</div>
                  </div>
                  <div class="vm-actions">
                    <ha-icon-button 
                      icon="mdi:play" 
                      title="Start"
                      ?disabled=${isRunning || !vm.start}
                      @click=${() => this._handleAction(vm.start)}>
                    </ha-icon-button>
                    <ha-icon-button 
                      icon="mdi:stop" 
                      title="Stop"
                      ?disabled=${!isRunning || !vm.stop}
                      @click=${() => this._handleAction(vm.stop)}>
                    </ha-icon-button>
                    <ha-icon-button 
                      icon="mdi:restart" 
                      title="Reboot"
                      ?disabled=${!isRunning || !vm.reboot}
                      @click=${() => this._handleAction(vm.reboot)}>
                    </ha-icon-button>
                  </div>
                </div>
              `;
            })}
          </div>

        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      .card-content {
        padding: 0 16px 16px 16px;
      }
      .stats-grid {
        display: flex;
        justify-content: space-around;
        padding: 10px 0 20px 0;
        text-align: center;
      }
      .stat-box {
        display: flex;
        flex-direction: column;
      }
      .stat-value {
        font-size: 2.2rem;
        color: var(--primary-color);
        font-weight: 400;
        line-height: 1.2;
      }
      .stat-name {
        font-size: 0.9rem;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }
      .divider {
        height: 1px;
        background-color: var(--divider-color);
        margin: 0 -16px 16px -16px;
      }
      .vm-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .vm-item {
        display: flex;
        align-items: center;
        padding: 8px;
        border-radius: 8px;
        background-color: rgba(var(--rgb-primary-text-color), 0.03);
        transition: background-color 0.2s;
      }
      .vm-item:hover {
        background-color: rgba(var(--rgb-primary-text-color), 0.06);
      }
      .vm-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 16px;
      }
      .vm-icon.running {
        background-color: rgba(76, 175, 80, 0.15);
        color: #4caf50;
      }
      .vm-icon.stopped {
        background-color: rgba(244, 67, 54, 0.15);
        color: #f44336;
      }
      .vm-info {
        flex-grow: 1;
      }
      .vm-name {
        font-weight: 500;
        font-size: 1rem;
        color: var(--primary-text-color);
      }
      .vm-status {
        font-size: 0.8rem;
        color: var(--secondary-text-color);
      }
      .vm-actions {
        display: flex;
        gap: 4px;
      }
      ha-icon-button {
        color: var(--primary-text-color);
        --mdc-icon-button-size: 36px;
      }
      ha-icon-button[disabled] {
        color: var(--disabled-text-color);
      }
    `;
  }
}

customElements.define("proxmox-card", ProxmoxCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "proxmox-card",
  name: "Proxmox Card",
  description: "Eine stylische Karte zur Steuerung von Proxmox VMs und CTs.",
});

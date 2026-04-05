import { LitElement, html, css } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

// --- VISUELLER EDITOR ---
class ProxmoxCardEditor extends LitElement {
  static get properties() { return { hass: {}, config: {} }; }

  setConfig(config) { this.config = { ...config, vms: config.vms || [] }; }

  _valueChanged(ev) {
    if (!this.config || !this.hass) return;
    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) return;
    if (target.configValue) {
      this.config = { ...this.config, [target.configValue]: target.value };
      this._fireChanged();
    }
  }

  _entityValueChanged(ev, configKey) {
    if (!this.config || !this.hass) return;
    const value = ev.detail.value;
    if (this.config[configKey] === value) return;
    this.config = { ...this.config, [configKey]: value };
    this._fireChanged();
  }

  _vmChanged(index, field, value) {
    const vms = [...this.config.vms];
    vms[index] = { ...vms[index], [field]: value };
    this.config = { ...this.config, vms };
    this._fireChanged();
  }

  _addVm() {
    const vms = [...this.config.vms, { name: "Neue VM", status: "", start: "", stop: "", reboot: "", shutdown: "", icon: "", image: "", bg_color: "" }];
    this.config = { ...this.config, vms };
    this._fireChanged();
  }

  _removeVm(index) {
    const vms = [...this.config.vms];
    vms.splice(index, 1);
    this.config = { ...this.config, vms };
    this._fireChanged();
  }

  _fireChanged() {
    const event = new Event("config-changed", { bubbles: true, composed: true });
    event.detail = { config: this.config };
    this.dispatchEvent(event);
  }

  render() {
    if (!this.hass || !this.config) return html``;

    return html`
      <div class="editor-container">
        <ha-textfield label="Karten-Titel (optional)" .value="${this.config.title || ''}" .configValue="${'title'}" @input="${this._valueChanged}"></ha-textfield>
        
        <h3 style="margin-top: 16px; margin-bottom: 4px;">Node Sensoren & Graphen</h3>
        <div class="grid-2">
          <ha-entity-picker .hass=${this.hass} .value=${this.config.node_cpu || ""} label="Node CPU Sensor" include-domains='["sensor"]' @value-changed=${(e) => this._entityValueChanged(e, 'node_cpu')} allow-custom-entity></ha-entity-picker>
          <ha-textfield label="CPU Graph Farbe (HEX/RGBA/var)" .value="${this.config.cpu_color || '#2196f3'}" .configValue="${'cpu_color'}" @input="${this._valueChanged}"></ha-textfield>
          
          <ha-entity-picker .hass=${this.hass} .value=${this.config.node_memory || ""} label="Node RAM Sensor" include-domains='["sensor"]' @value-changed=${(e) => this._entityValueChanged(e, 'node_memory')} allow-custom-entity></ha-entity-picker>
          <ha-textfield label="RAM Graph Farbe (HEX/RGBA/var)" .value="${this.config.ram_color || '#9c27b0'}" .configValue="${'ram_color'}" @input="${this._valueChanged}"></ha-textfield>
        </div>

        <h3 style="margin-top: 24px; margin-bottom: 8px;">Virtuelle Maschinen / Container</h3>
        
        ${this.config.vms.map((vm, index) => html`
          <div class="vm-editor-box">
            <div class="vm-header">
              <strong>${vm.name || `VM ${index + 1}`}</strong>
              <button class="delete-btn" @click="${() => this._removeVm(index)}">
                <ha-icon icon="mdi:delete-outline"></ha-icon> Löschen
              </button>
            </div>
            
            <div class="grid-2">
              <ha-textfield label="Anzeigename*" .value="${vm.name || ''}" @input="${(e) => this._vmChanged(index, 'name', e.target.value)}"></ha-textfield>
              <ha-textfield label="Zeilen-Hintergrund (HEX/RGBA/var)" .value="${vm.bg_color || ''}" @input="${(e) => this._vmChanged(index, 'bg_color', e.target.value)}" placeholder="z.B. rgba(255,0,0,0.1)"></ha-textfield>
              <ha-icon-picker .hass=${this.hass} .value=${vm.icon || ''} label="MDI Icon" @value-changed=${(e) => this._vmChanged(index, 'icon', e.detail.value)}></ha-icon-picker>
              <ha-textfield label="Bild-URL (z.B. /local/logo.png)" .value="${vm.image || ''}" @input="${(e) => this._vmChanged(index, 'image', e.target.value)}"></ha-textfield>
              <ha-entity-picker .hass=${this.hass} .value=${vm.status || ''} label="Status (binary_sensor)" include-domains='["binary_sensor"]' @value-changed=${(e) => this._vmChanged(index, 'status', e.detail.value)} allow-custom-entity></ha-entity-picker>
              <ha-entity-picker .hass=${this.hass} .value=${vm.start || ''} label="Start Button" include-domains='["button"]' @value-changed=${(e) => this._vmChanged(index, 'start', e.detail.value)} allow-custom-entity></ha-entity-picker>
              <ha-entity-picker .hass=${this.hass} .value=${vm.shutdown || ''} label="Shutdown Button" include-domains='["button"]' @value-changed=${(e) => this._vmChanged(index, 'shutdown', e.detail.value)} allow-custom-entity></ha-entity-picker>
              <ha-entity-picker .hass=${this.hass} .value=${vm.stop || ''} label="Stop Button" include-domains='["button"]' @value-changed=${(e) => this._vmChanged(index, 'stop', e.detail.value)} allow-custom-entity></ha-entity-picker>
              <ha-entity-picker .hass=${this.hass} .value=${vm.reboot || ''} label="Reboot Button" include-domains='["button"]' @value-changed=${(e) => this._vmChanged(index, 'reboot', e.detail.value)} allow-custom-entity></ha-entity-picker>
            </div>
          </div>
        `)}
        <mwc-button raised @click="${this._addVm}" style="margin-top: 16px;">
          <ha-icon icon="mdi:plus"></ha-icon> VM / Container hinzufügen
        </mwc-button>
      </div>
    `;
  }

  static get styles() {
    return css`
      .editor-container { display: flex; flex-direction: column; gap: 16px; }
      .vm-editor-box { border: 1px solid var(--divider-color); border-radius: 8px; padding: 16px; background: var(--secondary-background-color); }
      .vm-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid var(--divider-color); padding-bottom: 8px; }
      .delete-btn { background: none; border: none; color: var(--error-color); cursor: pointer; display: flex; align-items: center; gap: 4px; font-weight: 500; font-size: 14px; }
      .delete-btn:hover { text-decoration: underline; }
      .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: center; }
      ha-textfield, ha-entity-picker, ha-icon-picker { width: 100%; }
      mwc-button { --mdc-theme-primary: var(--primary-color); }
    `;
  }
}
customElements.define("proxmox-ha-card-editor", ProxmoxCardEditor);

// --- FRONTEND KARTE ---
class ProxmoxCard extends LitElement {
  constructor() {
    super();
    this._cpuGraph = null;
    this._ramGraph = null;
  }

  static get properties() {
    return { 
      hass: { type: Object }, 
      config: { type: Object }
    };
  }

  static getConfigElement() { return document.createElement("proxmox-ha-card-editor"); }
  static getStubConfig() { return { title: "Proxmox Node", vms: [] }; }

  setConfig(config) {
    if (!config.vms) throw new Error("Bitte konfiguriere die 'vms'.");
    this.config = { title: "Proxmox", ...config };
    
    this._cpuGraph = null;
    this._ramGraph = null;
  }

  set hass(hass) {
    const oldHass = this._hass;
    this._hass = hass;
    if (this._cpuGraph) this._cpuGraph.hass = hass;
    if (this._ramGraph) this._ramGraph.hass = hass;
    this.requestUpdate('hass', oldHass);
  }

  get hass() { return this._hass; }

  _createGraph(entityId, color) {
    if (!entityId) return null;
    const el = document.createElement("mini-graph-card");
    el.setConfig({
      entities: [entityId],
      line_color: color,
      line_width: 2,
      hours_to_show: 24,
      points_per_hour: 2,
      show: {
        name: false, icon: false, state: false, 
        labels: false, fill: true, points: false, legend: false
      }
    });
    el.hass = this.hass;
    return el;
  }

  _initGraphs() {
    const cpuColor = this.config.cpu_color || "#2196f3";
    const ramColor = this.config.ram_color || "#9c27b0";

    if (!this._cpuGraph && this.config.node_cpu) {
      this._cpuGraph = this._createGraph(this.config.node_cpu, cpuColor);
    }
    if (!this._ramGraph && this.config.node_memory) {
      this._ramGraph = this._createGraph(this.config.node_memory, ramColor);
    }
  }

  _handleAction(entityId) {
    if (!entityId) return;
    this.hass.callService("button", "press", { entity_id: entityId });
  }

  render() {
    if (!this.hass || !this.config) return html``;
    
    this._initGraphs();

    const cpuState = this.config.node_cpu ? this.hass.states[this.config.node_cpu] : null;
    const ramState = this.config.node_memory ? this.hass.states[this.config.node_memory] : null;
    
    const cpuValue = cpuState ? parseFloat(cpuState.state).toFixed(1) : '-';
    const ramValue = ramState ? parseFloat(ramState.state).toFixed(1) : '-';

    // Setze die Rahmenfarbe der Boxen passend zur Graph-Farbe
    const cpuBorder = `border-color: ${this.config.cpu_color || '#2196f3'};`;
    const ramBorder = `border-color: ${this.config.ram_color || '#9c27b0'};`;

    return html`
      <ha-card header="${this.config.title}">
        
        <div class="stats-grid">
          <div class="stat-box" style="${cpuBorder}">
            ${this._cpuGraph ? html`<div class="graph-wrapper">${this._cpuGraph}</div>` : ''}
            <div class="stat-content">
              <span class="stat-value">${cpuValue} %</span>
              <span class="stat-name">CPU Auslastung</span>
            </div>
          </div>
          <div class="stat-box" style="${ramBorder}">
            ${this._ramGraph ? html`<div class="graph-wrapper">${this._ramGraph}</div>` : ''}
            <div class="stat-content">
              <span class="stat-value">${ramValue} %</span>
              <span class="stat-name">RAM Nutzung</span>
            </div>
          </div>
        </div>

        <div class="card-content">
          <div class="vm-list">
            ${this.config.vms.map(vm => {
              const statusEntity = vm.status ? this.hass.states[vm.status] : null;
              const isRunning = statusEntity ? statusEntity.state === 'on' : false;

              const visualTemplate = vm.image 
                ? html`<img src="${vm.image}" class="vm-custom-image" alt="${vm.name}" />`
                : html`<div class="vm-icon ${isRunning ? 'running' : 'stopped'}">
                         <ha-icon icon="${vm.icon || (isRunning ? 'mdi:server-network' : 'mdi:server-network-off')}"></ha-icon>
                       </div>`;

              // Individueller Zeilen-Hintergrund
              const rowStyle = vm.bg_color ? `background-color: ${vm.bg_color};` : '';

              return html`
                <div class="vm-item" style="${rowStyle}">
                  <div class="vm-visual">${visualTemplate}</div>
                  <div class="vm-info">
                    <div class="vm-name">${vm.name}</div>
                    <div class="vm-status">${isRunning ? 'Läuft' : 'Gestoppt'}</div>
                  </div>
                  <div class="vm-actions">
                    <button class="action-btn" title="Start" ?disabled=${isRunning || !vm.start} @click=${() => this._handleAction(vm.start)}><ha-icon icon="mdi:play"></ha-icon></button>
                    <button class="action-btn" title="Shutdown" ?disabled=${!isRunning || !vm.shutdown} @click=${() => this._handleAction(vm.shutdown)}><ha-icon icon="mdi:power"></ha-icon></button>
                    <button class="action-btn" title="Stop" ?disabled=${!isRunning || !vm.stop} @click=${() => this._handleAction(vm.stop)}><ha-icon icon="mdi:stop"></ha-icon></button>
                    <button class="action-btn" title="Reboot" ?disabled=${!isRunning || !vm.reboot} @click=${() => this._handleAction(vm.reboot)}><ha-icon icon="mdi:restart"></ha-icon></button>
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
      .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 0 16px 20px 16px; }
      
      .stat-box {
        position: relative; overflow: hidden; border-radius: 12px; padding: 24px 16px;
        background: var(--ha-card-background, #fff);
        border: 1px solid var(--divider-color, #e0e0e0);
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        display: flex; flex-direction: column; align-items: center; text-align: center;
      }
      
      .graph-wrapper {
        position: absolute; bottom: -20px; left: -10px; right: -10px; height: 100%;
        z-index: 0; opacity: 0.6; pointer-events: none;
        --ha-card-background: transparent;
        --ha-card-box-shadow: none;
        --ha-card-border-width: 0;
        --ha-card-border-radius: 0;
      }

      .stat-content { position: relative; z-index: 1; display: flex; flex-direction: column; text-shadow: 0 1px 2px rgba(255,255,255,0.8); }
      .stat-value { font-size: 2.2rem; color: var(--primary-text-color); font-weight: 500; line-height: 1.2; }
      .stat-name { font-size: 0.85rem; color: var(--secondary-text-color); margin-top: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
      
      .card-content { padding: 0 16px 16px 16px; }
      
      .vm-list { display: flex; flex-direction: column; gap: 12px; }
      
      .vm-item { 
        display: flex; align-items: center; padding: 10px; border-radius: 12px; 
        background-color: var(--secondary-background-color); 
        transition: background-color 0.2s, border-color 0.2s; 
        border: 1px solid transparent; 
      }
      .vm-item:hover { border-color: var(--divider-color); filter: brightness(0.97); }
      
      .vm-visual { width: 46px; height: 46px; margin-right: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .vm-icon { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border-radius: 50%; box-shadow: inset 0 0 0 1px rgba(0,0,0,0.05); }
      .vm-icon.running { background-color: rgba(76, 175, 80, 0.15); color: #4caf50; }
      .vm-icon.stopped { background-color: rgba(244, 67, 54, 0.15); color: #f44336; }
      .vm-custom-image { width: 100%; height: 100%; object-fit: contain; border-radius: 6px; }
      
      .vm-info { flex-grow: 1; overflow: hidden; }
      .vm-name { font-weight: 600; font-size: 1rem; color: var(--primary-text-color); white-space: nowrap; text-overflow: ellipsis; overflow: hidden; margin-bottom: 2px; }
      .vm-status { font-size: 0.8rem; color: var(--secondary-text-color); font-weight: 500; }
      
      .vm-actions { display: flex; gap: 6px; }
      
      .action-btn {
        display: flex; justify-content: center; align-items: center;
        width: 38px; height: 38px; border-radius: 8px; border: none; cursor: pointer;
        background-color: var(--card-background-color, #fff);
        box-shadow: 0 2px 5px rgba(0,0,0,0.1), 0 1px 1px rgba(0,0,0,0.05);
        color: var(--primary-text-color);
        transition: all 0.2s ease;
      }
      .action-btn ha-icon { --mdc-icon-size: 20px; }
      .action-btn:hover:not(:disabled) { box-shadow: 0 4px 8px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1); transform: translateY(-2px); color: var(--primary-color); }
      .action-btn:disabled { opacity: 0.4; cursor: not-allowed; box-shadow: none; background-color: transparent; border: 1px solid var(--divider-color); }
    `;
  }
}

customElements.define("proxmox-ha-card", ProxmoxCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "proxmox-ha-card",
  name: "Proxmox HA Card",
  description: "Stylische Karte zur Steuerung von Proxmox mit anpassbaren Farben.",
  preview: true
});

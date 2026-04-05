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
    const vms = [...this.config.vms, { name: "Neue VM", status: "", start: "", stop: "", reboot: "", shutdown: "", icon: "", image: "", bg_color: "", border: "", shadow: "" }];
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
        
        <h3 style="margin-top: 8px; margin-bottom: 4px;">Karten-Titel & Design</h3>
        <div class="grid-2">
          <ha-textfield label="Titel Text" .value="${this.config.title || ''}" .configValue="${'title'}" @input="${this._valueChanged}"></ha-textfield>
          <ha-textfield label="Schriftfarbe (CSS/var)" .value="${this.config.title_color || ''}" .configValue="${'title_color'}" @input="${this._valueChanged}" placeholder="z.B. var(--primary-color)"></ha-textfield>
          <ha-textfield label="Schriftgröße (CSS)" .value="${this.config.title_size || ''}" .configValue="${'title_size'}" @input="${this._valueChanged}" placeholder="z.B. 24px oder 1.5rem"></ha-textfield>
          <ha-textfield label="Schriftgewicht" .value="${this.config.title_weight || ''}" .configValue="${'title_weight'}" @input="${this._valueChanged}" placeholder="z.B. bold oder 600"></ha-textfield>
        </div>
        
        <h3 style="margin-top: 16px; margin-bottom: 4px;">CPU Box Design & Sensor</h3>
        <div class="grid-2">
          <ha-entity-picker .hass=${this.hass} .value=${this.config.node_cpu || ""} label="CPU Sensor" include-domains='["sensor"]' @value-changed=${(e) => this._entityValueChanged(e, 'node_cpu')} allow-custom-entity></ha-entity-picker>
          <ha-textfield label="Graph Farbe (HEX/RGBA)" .value="${this.config.cpu_color || '#2196f3'}" .configValue="${'cpu_color'}" @input="${this._valueChanged}"></ha-textfield>
          <ha-textfield label="Box Rahmen (z.B. 1px solid red)" .value="${this.config.cpu_border || ''}" .configValue="${'cpu_border'}" @input="${this._valueChanged}"></ha-textfield>
          <ha-textfield label="Box Schatten (CSS)" .value="${this.config.cpu_shadow || ''}" .configValue="${'cpu_shadow'}" @input="${this._valueChanged}"></ha-textfield>
        </div>

        <h3 style="margin-top: 16px; margin-bottom: 4px;">RAM Box Design & Sensor</h3>
        <div class="grid-2">
          <ha-entity-picker .hass=${this.hass} .value=${this.config.node_memory || ""} label="RAM Sensor" include-domains='["sensor"]' @value-changed=${(e) => this._entityValueChanged(e, 'node_memory')} allow-custom-entity></ha-entity-picker>
          <ha-textfield label="Graph Farbe (HEX/RGBA)" .value="${this.config.ram_color || '#9c27b0'}" .configValue="${'ram_color'}" @input="${this._valueChanged}"></ha-textfield>
          <ha-textfield label="Box Rahmen (CSS)" .value="${this.config.ram_border || ''}" .configValue="${'ram_border'}" @input="${this._valueChanged}"></ha-textfield>
          <ha-textfield label="Box Schatten (CSS)" .value="${this.config.ram_shadow || ''}" .configValue="${'ram_shadow'}" @input="${this._valueChanged}"></ha-textfield>
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
              <ha-icon-picker .hass=${this.hass} .value=${vm.icon || ''} label="MDI Icon" @value-changed=${(e) => this._vmChanged(index, 'icon', e.detail.value)}></ha-icon-picker>
              
              <ha-textfield label="Zeilen-Hintergrund (CSS)" .value="${vm.bg_color || ''}" @input="${(e) => this._vmChanged(index, 'bg_color', e.target.value)}" placeholder="rgba(255,0,0,0.1)"></ha-textfield>
              <ha-textfield label="Bild-URL (/local/logo.png)" .value="${vm.image || ''}" @input="${(e) => this._vmChanged(index, 'image', e.target.value)}"></ha-textfield>
              
              <ha-textfield label="Zeilen-Rahmen (CSS)" .value="${vm.border || ''}" @input="${(e) => this._vmChanged(index, 'border', e.target.value)}" placeholder="1px solid var(--primary-color)"></ha-textfield>
              <ha-textfield label="Zeilen-Schatten (CSS)" .value="${vm.shadow || ''}" @input="${(e) => this._vmChanged(index, 'shadow', e.target.value)}" placeholder="0 4px 8px rgba(0,0,0,0.2)"></ha-textfield>

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
      group: true,
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

    const cpuStyle = `
      ${this.config.cpu_border ? `--custom-border: ${this.config.cpu_border};` : ''}
      ${this.config.cpu_shadow ? `--custom-shadow: ${this.config.cpu_shadow};` : ''}
    `;
    const ramStyle = `
      ${this.config.ram_border ? `--custom-border: ${this.config.ram_border};` : ''}
      ${this.config.ram_shadow ? `--custom-shadow: ${this.config.ram_shadow};` : ''}
    `;

    // Eigene Header-Styles aufbauen
    const headerStyle = `
      ${this.config.title_color ? `color: ${this.config.title_color};` : ''}
      ${this.config.title_size ? `font-size: ${this.config.title_size};` : ''}
      ${this.config.title_weight ? `font-weight: ${this.config.title_weight};` : ''}
    `;

    return html`
      <ha-card>
        
        ${this.config.title ? html`
          <div class="custom-header" style="${headerStyle}">
            ${this.config.title}
          </div>
        ` : ''}

        <div class="stats-grid">
          <div class="stat-box" style="${cpuStyle}">
            ${this._cpuGraph ? html`<div class="graph-wrapper">${this._cpuGraph}</div>` : ''}
            <div class="stat-content">
              <span class="stat-value">${cpuValue} %</span>
              <span class="stat-name">CPU Auslastung</span>
            </div>
          </div>
          <div class="stat-box" style="${ramStyle}">
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

              const rowStyle = `
                ${vm.bg_color ? `background-color: ${vm.bg_color};` : ''}
                ${vm.border ? `--custom-border: ${vm.border};` : ''}
                ${vm.shadow ? `--custom-shadow: ${vm.shadow};` : ''}
              `;

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
      /* Neuer Custom Header als Ersatz für den starren HA-Card Header */
      .custom-header {
        padding: 24px 16px 16px 16px;
        font-size: 24px;
        font-weight: 400;
        color: var(--ha-card-header-color, var(--primary-text-color));
        letter-spacing: -0.012em;
        line-height: 32px;
      }

      .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 0 16px 20px 16px; }
      
      .stat-box {
        position: relative; 
        overflow: hidden; 
        border-radius: 12px; 
        padding: 24px 16px;
        background: var(--ha-card-background, #fff);
        
        border: var(--custom-border, none);
        box-shadow: var(--custom-shadow, 0 4px 12px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02));
        
        display: flex; flex-direction: column; align-items: center; text-align: center;
        transition: transform 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease;
      }
      
      .stat-box:hover {
        transform: translateY(-2px);
        filter: brightness(0.98);
        box-shadow: var(--custom-shadow, 0 8px 24px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04));
      }
      
      .graph-wrapper {
        position: absolute; bottom: -2px; left: 0; right: 0; 
        z-index: 0; opacity: 0.6; pointer-events: none;
      }

      .stat-content { position: relative; z-index: 1; display: flex; flex-direction: column; text-shadow: 0 1px 2px rgba(255,255,255,0.8); }
      .stat-value { font-size: 2.2rem; color: var(--primary-text-color); font-weight: 500; line-height: 1.2; }
      .stat-name { font-size: 0.85rem; color: var(--secondary-text-color); margin-top: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
      
      .card-content { padding: 0 16px 16px 16px; }
      
      .vm-list { display: flex; flex-direction: column; gap: 14px; }
      
      .vm-item { 
        display: flex; align-items: center; padding: 12px 14px; border-radius: 12px; 
        background: var(--ha-card-background, #fff); 
        
        border: var(--custom-border, none);
        box-shadow: var(--custom-shadow, 0 4px 12px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02));
        
        transition: transform 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease; 
      }
      .vm-item:hover { 
        transform: translateY(-2px);
        filter: brightness(0.97);
        box-shadow: var(--custom-shadow, 0 8px 24px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04));
      }
      
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
  description: "Stylische Karte zur Steuerung von Proxmox mit anpassbaren Headern und Element-Designs.",
  preview: true
});

import { LitElement, html, css } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

// --- VISUELLER EDITOR ---
class ProxmoxCardEditor extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
    };
  }

  setConfig(config) {
    this.config = { ...config, vms: config.vms || [] };
  }

  _valueChanged(ev) {
    if (!this.config || !this.hass) return;
    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) return;
    
    if (target.configValue) {
      this.config = { ...this.config, [target.configValue]: target.value };
      this._fireChanged();
    }
  }

  _vmChanged(index, field, value) {
    const vms = [...this.config.vms];
    vms[index] = { ...vms[index], [field]: value };
    this.config = { ...this.config, vms };
    this._fireChanged();
  }

  _addVm() {
    const vms = [...this.config.vms, { name: "Neue VM", status: "", start: "", stop: "", reboot: "", shutdown: "", icon: "", image: "" }];
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
        <ha-textfield label="Node CPU Sensor (optional)" .value="${this.config.node_cpu || ''}" .configValue="${'node_cpu'}" @input="${this._valueChanged}"></ha-textfield>
        <ha-textfield label="Node RAM Sensor (optional)" .value="${this.config.node_memory || ''}" .configValue="${'node_memory'}" @input="${this._valueChanged}"></ha-textfield>
        
        <h3 style="margin-top: 24px; margin-bottom: 8px;">Virtuelle Maschinen / Container</h3>
        
        ${this.config.vms.map((vm, index) => html`
          <div class="vm-editor-box">
            <div class="vm-header">
              <strong>${vm.name || `VM ${index + 1}`}</strong>
              <ha-icon-button icon="mdi:delete" title="VM Löschen" @click="${() => this._removeVm(index)}" style="color: var(--error-color);"></ha-icon-button>
            </div>
            
            <div class="grid-2">
              <ha-textfield label="Anzeigename*" .value="${vm.name || ''}" @input="${(e) => this._vmChanged(index, 'name', e.target.value)}"></ha-textfield>
              <ha-textfield label="Status (binary_sensor)" .value="${vm.status || ''}" @input="${(e) => this._vmChanged(index, 'status', e.target.value)}"></ha-textfield>
              <ha-textfield label="Start Button" .value="${vm.start || ''}" @input="${(e) => this._vmChanged(index, 'start', e.target.value)}"></ha-textfield>
              <ha-textfield label="Shutdown Button" .value="${vm.shutdown || ''}" @input="${(e) => this._vmChanged(index, 'shutdown', e.target.value)}"></ha-textfield>
              <ha-textfield label="Stop Button" .value="${vm.stop || ''}" @input="${(e) => this._vmChanged(index, 'stop', e.target.value)}"></ha-textfield>
              <ha-textfield label="Reboot Button" .value="${vm.reboot || ''}" @input="${(e) => this._vmChanged(index, 'reboot', e.target.value)}"></ha-textfield>
              <ha-textfield label="MDI Icon (z.B. mdi:docker)" .value="${vm.icon || ''}" @input="${(e) => this._vmChanged(index, 'icon', e.target.value)}"></ha-textfield>
              <ha-textfield label="Bild-URL (z.B. /local/logo.png)" .value="${vm.image || ''}" @input="${(e) => this._vmChanged(index, 'image', e.target.value)}"></ha-textfield>
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
      .editor-container { display: flex; flex-direction: column; gap: 12px; }
      .vm-editor-box { border: 1px solid var(--divider-color); border-radius: 8px; padding: 12px; margin-bottom: 12px; background: var(--secondary-background-color); }
      .vm-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid var(--divider-color); padding-bottom: 8px; }
      .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      ha-textfield { width: 100%; }
      mwc-button { --mdc-theme-primary: var(--primary-color); }
    `;
  }
}
customElements.define("proxmox-ha-card-editor", ProxmoxCardEditor);

// --- FRONTEND KARTE ---
class ProxmoxCard extends LitElement {
  static get properties() {
    return { hass: { type: Object }, config: { type: Object } };
  }

  static getConfigElement() {
    return document.createElement("proxmox-ha-card-editor");
  }

  static getStubConfig() {
    return {
      title: "Proxmox Node",
      vms: [{ name: "Meine VM", status: "", start: "", stop: "", reboot: "", shutdown: "", icon: "", image: "" }]
    };
  }

  setConfig(config) {
    if (!config.vms) { throw new Error("Bitte konfiguriere die 'vms'."); }
    this.config = { title: "Proxmox", ...config };
  }

  _handleAction(entityId) {
    if (!entityId) return;
    this.hass.callService("button", "press", { entity_id: entityId });
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const cpuState = this.config.node_cpu ? this.hass.states[this.config.node_cpu] : null;
    const ramState = this.config.node_memory ? this.hass.states[this.config.node_memory] : null;

    return html`
      <ha-card header="${this.config.title}">
        <div class="card-content">
          
          <div class="stats-grid">
            <div class="stat-box">
              <span class="stat-value">${cpuState ? parseFloat(cpuState.state).toFixed(1) : '-'} %</span>
              <span class="stat-name">CPU</span>
            </div>
            <div class="stat-box">
              <span class="stat-value">${ramState ? parseFloat(ramState.state).toFixed(1) : '-'} %</span>
              <span class="stat-name">RAM</span>
            </div>
          </div>

          <div class="divider"></div>

          <div class="vm-list">
            ${this.config.vms.map(vm => {
              const statusEntity = vm.status ? this.hass.states[vm.status] : null;
              const isRunning = statusEntity ? statusEntity.state === 'on' : false;

              // Render Logic for Icon or Custom Image
              const visualTemplate = vm.image 
                ? html`<img src="${vm.image}" class="vm-custom-image" alt="${vm.name}" />`
                : html`<div class="vm-icon ${isRunning ? 'running' : 'stopped'}">
                         <ha-icon icon="${vm.icon || (isRunning ? 'mdi:server-network' : 'mdi:server-network-off')}"></ha-icon>
                       </div>`;

              return html`
                <div class="vm-item">
                  <div class="vm-visual">
                    ${visualTemplate}
                  </div>
                  <div class="vm-info">
                    <div class="vm-name">${vm.name}</div>
                    <div class="vm-status">${isRunning ? 'Läuft' : 'Gestoppt'}</div>
                  </div>
                  <div class="vm-actions">
                    <ha-icon-button icon="mdi:play" title="Start" ?disabled=${isRunning || !vm.start} @click=${() => this._handleAction(vm.start)}></ha-icon-button>
                    <ha-icon-button icon="mdi:power" title="Shutdown" ?disabled=${!isRunning || !vm.shutdown} @click=${() => this._handleAction(vm.shutdown)}></ha-icon-button>
                    <ha-icon-button icon="mdi:stop" title="Stop" ?disabled=${!isRunning || !vm.stop} @click=${() => this._handleAction(vm.stop)}></ha-icon-button>
                    <ha-icon-button icon="mdi:restart" title="Reboot" ?disabled=${!isRunning || !vm.reboot} @click=${() => this._handleAction(vm.reboot)}></ha-icon-button>
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
      .card-content { padding: 0 16px 16px 16px; }
      .stats-grid { display: flex; justify-content: space-around; padding: 10px 0 20px 0; text-align: center; }
      .stat-box { display: flex; flex-direction: column; }
      .stat-value { font-size: 2.2rem; color: var(--primary-color); font-weight: 400; line-height: 1.2; }
      .stat-name { font-size: 0.9rem; color: var(--secondary-text-color); margin-top: 4px; font-weight: 500; }
      .divider { height: 1px; background-color: var(--divider-color); margin: 0 -16px 16px -16px; }
      .vm-list { display: flex; flex-direction: column; gap: 12px; }
      .vm-item { display: flex; align-items: center; padding: 8px; border-radius: 8px; background-color: rgba(var(--rgb-primary-text-color), 0.03); transition: background-color 0.2s; }
      .vm-item:hover { background-color: rgba(var(--rgb-primary-text-color), 0.06); }
      
      .vm-visual { width: 42px; height: 42px; margin-right: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .vm-icon { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border-radius: 50%; }
      .vm-icon.running { background-color: rgba(76, 175, 80, 0.15); color: #4caf50; }
      .vm-icon.stopped { background-color: rgba(244, 67, 54, 0.15); color: #f44336; }
      .vm-custom-image { width: 100%; height: 100%; object-fit: contain; border-radius: 4px; }
      
      .vm-info { flex-grow: 1; overflow: hidden; }
      .vm-name { font-weight: 500; font-size: 1rem; color: var(--primary-text-color); white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
      .vm-status { font-size: 0.8rem; color: var(--secondary-text-color); }
      .vm-actions { display: flex; gap: 2px; }
      ha-icon-button { color: var(--primary-text-color); --mdc-icon-button-size: 36px; }
      ha-icon-button[disabled] { color: var(--disabled-text-color); }
    `;
  }
}

customElements.define("proxmox-ha-card", ProxmoxCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "proxmox-ha-card",
  name: "Proxmox HA Card",
  description: "Eine stylische Karte zur Steuerung von Proxmox VMs und CTs mit visuellem Editor.",
  preview: true
});

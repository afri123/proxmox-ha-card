import { LitElement, html, css } from "https://unpkg.com/lit@3/index.js?module";

const CARD_VERSION = "0.1.0";
console.info(`%c PROXMOX-HA-CARD %c v${CARD_VERSION} `, "background:#2196f3;color:#fff;font-weight:bold;", "background:#333;color:#fff;");

const TRANSLATIONS = {
  en: {
    editor: {
      sections: {
        title_design:   "Card Title & Design",
        debug:          "Debug",
        node_actions:   "Node Status & Actions",
        cpu:            "CPU Box",
        ram:            "RAM Box",
        disk:           "Disk Box",
        node_extra:     "Additional Node Sensors",
        vms:            "Virtual Machines & Containers",
        interactions:   "Interactions",
        auto_discover:  "Auto-Discover",
      },
      fields: {
        card_title:           "Card Title",
        title_icon:           "Title Icon",
        title_color:          "Title Color (CSS/var)",
        title_size:           "Title Size (e.g. 24px)",
        title_weight:         "Title Weight (e.g. bold)",
        cpu_sensor:           "CPU Usage Sensor",
        ram_sensor:           "RAM Usage Sensor",
        disk_sensor:          "Disk Usage Sensor",
        disk_size_sensor:     "Max Disk Sensor",
        graph_color:          "Graph Color (HEX/RGBA)",
        value_color:          "Value Color (CSS)",
        text_color:           "Text Color (CSS)",
        box_border:           "Box Border (CSS)",
        box_shadow:           "Box Shadow (CSS)",
        node_device:          "Proxmox Node",
        vm_device:            "Device",
        node_name:            "Node Name (e.g. pve1)",
        node_load_defaults:   "Reset Defaults",
        node_status:          "Node Status (sensor/binary_sensor)",
        node_uptime:          "Node Uptime Sensor (hours)",
        node_restart:         "Restart Button",
        node_shutdown:        "Shut Down Button",
        node_start_all:       "Start All Button",
        node_stop_all:        "Stop All Button",
        node_suspend_all:     "Suspend All Button",
        node_max_cpu:         "Max CPU Sensor",
        node_max_memory:      "Max Memory Sensor",
        node_backup_status:   "Backup Status Sensor",
        node_backup_duration: "Backup Duration Sensor",
        node_last_backup:     "Last Backup Sensor",
        display_name:         "Display Name*",
        mdi_icon:             "MDI Icon",
        row_background:       "Row Background (CSS)",
        image_url:            "Image URL (/local/logo.png)",
        row_border:           "Row Border (CSS)",
        row_shadow:           "Row Shadow (CSS)",
        status_entity:        "Status (binary_sensor)",
        cpu_entity:           "CPU Sensor",
        memory_entity:        "Memory Sensor",
        disk_entity:          "Disk Usage Sensor",
        disk_size_entity:     "Disk Size Sensor (optional)",
        uptime_entity:        "Uptime Sensor (hours)",
        start_button:         "Start Button",
        shutdown_button:      "Shutdown Button",
        stop_button:          "Stop Button",
        reboot_button:        "Reboot Button",
        snapshot_button:      "Snapshot Button",
      },
      placeholders: {
        css_var:      "e.g. var(--primary-color)",
        css_color:    "e.g. #2196f3",
        css_secondary:"e.g. var(--secondary-text-color)",
        rgba:         "rgba(255,0,0,0.1)",
        border:       "1px solid var(--primary-color)",
        shadow:       "0 4px 8px rgba(0,0,0,0.2)",
      },
      auto_discover_label: "Auto-discover from node",
      auto_discover_note:  "Devices are discovered automatically from the HA device registry. Turn off auto-discover to configure them manually.",
      delete_vm:   "Delete",
      add_vm:      "Add New",
      new_vm_name: "New",
    },
    card: {
      cpu_label:    "CPU Usage",
      ram_label:    "RAM Usage",
      disk_label:   "Disk Usage",
      running:      "Running",
      stopped:      "Stopped",
    },
    errors: {
      missing_vms: "Please configure 'vms'.",
    },
    description: "Stylish card for monitoring and controlling Proxmox with customizable headers and element designs.",
  },
  de: {
    editor: {
      sections: {
        title_design:   "Karten-Titel & Design",
        debug:          "Debug",
        node_actions:   "Node Status & Aktionen",
        cpu:            "CPU Box",
        ram:            "RAM Box",
        disk:           "Festplatten Box",
        node_extra:     "Zusätzliche Node Sensoren",
        vms:            "Virtuelle Maschinen & Container",
        interactions:   "Interaktionen",
        auto_discover:  "Auto-Erkennung",
      },
      fields: {
        card_title:           "Karten-Titel",
        title_icon:           "Titel Icon",
        title_color:          "Titel-Farbe (CSS/var)",
        title_size:           "Titel-Größe (z.B. 24px)",
        title_weight:         "Titel-Dicke (z.B. bold)",
        cpu_sensor:           "CPU Auslastung Sensor",
        ram_sensor:           "RAM Auslastung Sensor",
        disk_sensor:          "Festplatten Sensor",
        disk_size_sensor:     "Max Festplatten Sensor",
        graph_color:          "Graph Farbe (HEX/RGBA)",
        value_color:          "Zahlen-Farbe (CSS)",
        text_color:           "Text-Farbe (CSS)",
        box_border:           "Box Rahmen (CSS)",
        box_shadow:           "Box Schatten (CSS)",
        node_device:          "Proxmox Node",
        vm_device:            "Device",
        node_name:            "Node-Name (z.B. pve1)",
        node_load_defaults:   "Standards zurücksetzen",
        node_status:          "Node Status (sensor/binary_sensor)",
        node_uptime:          "Node Uptime Sensor (Stunden)",
        node_restart:         "Neustart Button",
        node_shutdown:        "Herunterfahren Button",
        node_start_all:       "Alle starten Button",
        node_stop_all:        "Alle stoppen Button",
        node_suspend_all:     "Alle suspendieren Button",
        node_max_cpu:         "Max CPU Sensor",
        node_max_memory:      "Max Arbeitsspeicher Sensor",
        node_backup_status:   "Backup Status Sensor",
        node_backup_duration: "Backup Dauer Sensor",
        node_last_backup:     "Letztes Backup Sensor",
        display_name:         "Anzeigename*",
        mdi_icon:             "MDI Icon",
        row_background:       "Zeilen-Hintergrund (CSS)",
        image_url:            "Bild-URL (/local/logo.png)",
        row_border:           "Zeilen-Rahmen (CSS)",
        row_shadow:           "Zeilen-Schatten (CSS)",
        status_entity:        "Status (binary_sensor)",
        cpu_entity:           "CPU Sensor",
        memory_entity:        "Arbeitsspeicher Sensor",
        disk_entity:          "Festplatten Sensor",
        disk_size_entity:     "Festplattengröße Sensor (optional)",
        uptime_entity:        "Uptime Sensor (Stunden)",
        start_button:         "Start Button",
        shutdown_button:      "Shutdown Button",
        stop_button:          "Stop Button",
        reboot_button:        "Reboot Button",
        snapshot_button:      "Snapshot Button",
      },
      placeholders: {
        css_var:      "z.B. var(--primary-color)",
        css_color:    "z.B. #2196f3",
        css_secondary:"z.B. var(--secondary-text-color)",
        rgba:         "rgba(255,0,0,0.1)",
        border:       "1px solid var(--primary-color)",
        shadow:       "0 4px 8px rgba(0,0,0,0.2)",
      },
      auto_discover_label: "Automatisch vom Node erkennen",
      auto_discover_note:  "Geräte werden automatisch aus der HA Geräteregistrierung erkannt. Deaktiviere die Auto-Erkennung, um sie manuell zu konfigurieren.",
      delete_vm:   "Löschen",
      add_vm:      "Neu hinzufügen",
      new_vm_name: "Neu",
    },
    card: {
      cpu_label:    "CPU Auslastung",
      ram_label:    "RAM Nutzung",
      disk_label:   "Festplatten Nutzung",
      running:      "Läuft",
      stopped:      "Gestoppt",
    },
    errors: {
      missing_vms: "Bitte konfiguriere die 'vms'.",
    },
    description: "Stylische Karte zur Steuerung von Proxmox mit anpassbaren Headern und Element-Designs.",
  },
};

function localize(hass, key) {
  const lang = hass?.language || "en";
  const parts = key.split(".");
  const resolve = (obj) => parts.reduce((o, k) => o?.[k], obj);
  return resolve(TRANSLATIONS[lang]) ?? resolve(TRANSLATIONS["en"]) ?? key;
}

// --- EDITOR ---
class ProxmoxCardEditor extends LitElement {
  static get properties() { return { hass: {}, config: {}, _pendingDeviceId: {}, _pendingVmDevice: {} }; }

  setConfig(config) { this.config = { ...config, vms: config.vms || [] }; }

  updated(changed) {
    if (this._focusNewVm != null) {
      const panels = this.shadowRoot.querySelectorAll('ha-expansion-panel[data-vm-index]');
      const panel = panels[this._focusNewVm];
      if (panel) {
        panel.expanded = true;
        setTimeout(() => {
          const selector = panel.querySelector('ha-selector[data-status-selector]');
          if (selector) {
            const input = selector.shadowRoot?.querySelector('input') || selector.querySelector('input');
            if (input) input.focus();
          }
        }, 100);
      }
      this._focusNewVm = null;
    }
  }

  _t(key) { return localize(this.hass, key); }

  _changeValue(field, value) {
    if (!this.config || !this.hass) return;
    if (this.config[field] === value) return;
    this.config = { ...this.config, [field]: value };
    this._fireChanged();
  }

  _loadVmDefaults(index) {
    const vm = this.config.vms[index];
    let statusEntity = vm?.status || '';

    // Prefer device registry when a device_id is stored
    if (vm?.device_id && this.hass?.entities) {
      const ids = Object.values(this.hass.entities)
        .filter(e => e.device_id === vm.device_id)
        .map(e => e.entity_id);
      const found = ids.find(id => id.startsWith('binary_sensor.') && id.endsWith('_status'));
      if (found) statusEntity = found;
    }

    if (!statusEntity) return;
    const entityName = statusEntity.split('.')[1] || '';
    const n = entityName.endsWith('_status') ? entityName.slice(0, -7) : entityName;
    if (!n) return;
    const vms = [...this.config.vms];
    vms[index] = {
      ...vms[index],
      status:    statusEntity,
      start:     `button.${n}_start`,
      stop:      `button.${n}_stop`,
      reboot:    `button.${n}_restart`,
      shutdown:  `button.${n}_stop`,
      cpu:       `sensor.${n}_cpu_usage`,
      memory:    `sensor.${n}_memory_usage_percentage`,
      snapshot:  `button.${n}_create_snapshot`,
      uptime:    `sensor.${n}_uptime`,
      disk:      `sensor.${n}_disk_usage`,
      disk_size: `sensor.${n}_max_disk_usage`,
    };
    this.config = { ...this.config, vms };
    this._fireChanged();
  }

  _onVmDeviceChanged(index, deviceId) {
    const vm = this.config.vms[index];
    if (vm?.device_id && vm.device_id !== deviceId) {
      this._pendingVmDevice = { index, deviceId };
      return;
    }
    this._applyVmDevice(index, deviceId);
  }

  _applyVmDevice(index, deviceId) {
    const deviceName = this.hass?.devices?.[deviceId]?.name || '';
    const vms = [...this.config.vms];
    vms[index] = { ...vms[index], device_id: deviceId, ...(deviceName ? { name: deviceName } : {}) };
    this._pendingVmDevice = null;
    this.config = { ...this.config, vms };
    this._fireChanged();
    this._loadVmDefaults(index);
  }

  _cancelVmDevice() {
    this._pendingVmDevice = null;
  }

  _loadNodeDefaults() {
    let n = '';
    let statusEntity = this.config.node_status || '';

    // Prefer deriving from the device registry when a device_id is stored
    if (this.config.node_device_id && this.hass?.entities) {
      const ids = Object.values(this.hass.entities)
        .filter(e => e.device_id === this.config.node_device_id)
        .map(e => e.entity_id);
      const found = ids.find(id => id.startsWith('binary_sensor.') && id.endsWith('_status'));
      if (found) statusEntity = found;
    }

    if (!statusEntity) return;
    const entityName = statusEntity.split('.')[1] || '';
    n = entityName.endsWith('_status') ? entityName.slice(0, -7) : entityName;
    if (!n) return;

    this.config = {
      ...this.config,
      node_status:          statusEntity,
      node_name:            n,
      node_cpu:             `sensor.${n}_cpu_usage`,
      node_memory:          `sensor.${n}_memory_usage_percentage`,
      node_disk:            `sensor.${n}_disk_usage`,
      node_disk_size:       `sensor.${n}_max_disk_usage`,
      node_uptime:          `sensor.${n}_uptime`,
      node_max_cpu:         `sensor.${n}_max_cpu`,
      node_max_memory:      `sensor.${n}_max_memory_usage`,
      node_backup_status:   `binary_sensor.${n}_backup_status`,
      node_backup_duration: `sensor.${n}_backup_duration`,
      node_last_backup:     `sensor.${n}_last_backup`,
      node_restart:         `button.${n}_restart`,
      node_shutdown:        `button.${n}_shut_down`,
      node_start_all:       `button.${n}_start_all`,
      node_stop_all:        `button.${n}_stop_all`,
      node_suspend_all:     `button.${n}_suspend_all`,
    };
    this._fireChanged();
  }

  _onNodeDeviceChanged(deviceId) {
    // If a node was already configured, confirm before overwriting
    if (this.config.node_device_id && this.config.node_device_id !== deviceId) {
      this._pendingDeviceId = deviceId;
      return;
    }
    this._applyNodeDevice(deviceId);
  }

  _applyNodeDevice(deviceId) {
    this._pendingDeviceId = null;
    const deviceName = this.hass?.devices?.[deviceId]?.name || '';
    this.config = { ...this.config, node_device_id: deviceId, ...(deviceName ? { title: deviceName } : {}) };
    this._fireChanged();
    this._loadNodeDefaults();
  }

  _cancelNodeDevice() {
    this._pendingDeviceId = null;
  }

  _vmChanged(index, field, value) {
    const vms = [...this.config.vms];
    vms[index] = { ...vms[index], [field]: value };
    this.config = { ...this.config, vms };
    this._fireChanged();
  }

  _addVm() {
    const vms = [...this.config.vms, {
      name: this._t("editor.new_vm_name"),
      status: "", cpu: "", memory: "", disk: "", disk_size: "", uptime: "",
      start: "", stop: "", reboot: "", shutdown: "", snapshot: "",
      icon: "", image: "", bg_color: "", border: "", shadow: "",
    }];
    this._focusNewVm = vms.length - 1;
    this.config = { ...this.config, vms };
    this._fireChanged();
  }

  _removeVm(index) {
    const vms = [...this.config.vms];
    vms.splice(index, 1);
    this.config = { ...this.config, vms };
    this._fireChanged();
  }

  _colorField(label, value, onChange, placeholder = "") {
    const isHex = /^#[0-9a-fA-F]{3,6}$/.test(value);
    return html`
      <div class="color-field">
        <input type="color" class="color-swatch"
          .value=${isHex ? value : "#ffffff"}
          title=${label}
          @input=${(e) => onChange(e.target.value)}
        />
        <ha-textfield class="color-text" label=${label} .value=${value || ""} placeholder=${placeholder}
          @input=${(e) => onChange(e.target.value)}
        ></ha-textfield>
      </div>
    `;
  }

  _actionEditor(label, actionConfig, onChange) {
    const cfg = actionConfig || { action: 'none' };
    const action = cfg.action || 'none';
    const actionOptions = [
      { value: 'none',         label: 'None' },
      { value: 'more-info',    label: 'More Info' },
      { value: 'navigate',     label: 'Navigate' },
      { value: 'url',          label: 'URL' },
      { value: 'call-service', label: 'Call Service' },
    ];
    return html`
      <div class="action-editor">
        <div class="action-editor-label">${label}</div>
        <ha-selector .hass=${this.hass} .value=${action}
          .selector=${{ select: { options: actionOptions, mode: 'dropdown' } }}
          @value-changed=${(e) => onChange({ ...cfg, action: e.detail.value })}
        ></ha-selector>
        ${action === 'more-info' ? html`
          <ha-selector .hass=${this.hass} .value=${cfg.entity || ''} label="Entity"
            .selector=${{ entity: {} }}
            @value-changed=${(e) => onChange({ ...cfg, entity: e.detail.value })}
          ></ha-selector>
        ` : ''}
        ${action === 'navigate' ? html`
          <ha-textfield label="Navigation Path (e.g. /lovelace/home)"
            .value=${cfg.navigation_path || ''}
            @input=${(e) => onChange({ ...cfg, navigation_path: e.target.value })}
          ></ha-textfield>
        ` : ''}
        ${action === 'url' ? html`
          <ha-textfield label="URL"
            .value=${cfg.url_path || ''}
            @input=${(e) => onChange({ ...cfg, url_path: e.target.value })}
          ></ha-textfield>
        ` : ''}
        ${action === 'call-service' ? html`
          <ha-textfield label="Service (e.g. light.turn_on)"
            .value=${cfg.service || ''}
            @input=${(e) => onChange({ ...cfg, service: e.target.value })}
          ></ha-textfield>
          <ha-textfield label="Service Data (JSON)"
            .value=${cfg.service_data ? JSON.stringify(cfg.service_data) : ''}
            @input=${(e) => { try { onChange({ ...cfg, service_data: JSON.parse(e.target.value) }); } catch (_) {} }}
          ></ha-textfield>
        ` : ''}
      </div>
    `;
  }

  _statBoxFields(prefix, colorDefault, sensorLabel, sensorField, t) {
    return html`
      <ha-selector .hass=${this.hass} .value=${this.config[sensorField] || ""} label="${sensorLabel}"
        .selector=${{ entity: { domain: "sensor" } }}
        @value-changed=${(e) => this._changeValue(sensorField, e.detail.value)}></ha-selector>
      <div class="grid-2" style="margin-top:12px;">
        ${this._colorField(t("editor.fields.graph_color"), this.config[`${prefix}_color`] || colorDefault, (v) => this._changeValue(`${prefix}_color`, v))}
        ${this._colorField(t("editor.fields.value_color"), this.config[`${prefix}_value_color`] || '', (v) => this._changeValue(`${prefix}_value_color`, v), t("editor.placeholders.css_color"))}
        ${this._colorField(t("editor.fields.text_color"), this.config[`${prefix}_label_color`] || '', (v) => this._changeValue(`${prefix}_label_color`, v), t("editor.placeholders.css_secondary"))}
        <ha-textfield label="${t("editor.fields.box_border")}" .value="${this.config[`${prefix}_border`] || ''}" @input="${(e) => this._changeValue(`${prefix}_border`, e.target.value)}"></ha-textfield>
        <ha-textfield label="${t("editor.fields.box_shadow")}" .value="${this.config[`${prefix}_shadow`] || ''}" @input="${(e) => this._changeValue(`${prefix}_shadow`, e.target.value)}"></ha-textfield>
      </div>
    `;
  }

  _fireChanged() {
    const event = new Event("config-changed", { bubbles: true, composed: true });
    event.detail = { config: this.config };
    this.dispatchEvent(event);
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const t = (key) => this._t(key);

    return html`
      <div class="editor-container">

        <div class="node-device-row">
          <ha-selector .hass=${this.hass} .value=${this.config.node_device_id || ''} label="${t("editor.fields.node_device")}" .selector=${{ device: { filter: [{ integration: "proxmoxve", model: "Node" }] } }} @value-changed=${(e) => this._onNodeDeviceChanged(e.detail.value)} style="flex:1;"></ha-selector>
          <button class="defaults-btn"
            ?disabled=${!this.config.node_device_id && !this.config.node_status}
            @click="${this._loadNodeDefaults}"
          ><ha-icon icon="mdi:auto-fix"></ha-icon>${t("editor.fields.node_load_defaults")}</button>
        </div>

        <ha-expansion-panel header="${t("editor.sections.title_design")}" outlined expanded>
          <div class="panel-content">
            <ha-selector .hass=${this.hass} .value=${this.config.title_icon || ''} label="${t("editor.fields.title_icon")}" .selector=${{ icon: {} }} @value-changed=${(e) => this._changeValue('title_icon', e.detail.value)}></ha-selector>
            <div class="grid-2" style="margin-top:12px;">
              <ha-textfield label="${t("editor.fields.card_title")}" .value="${this.config.title || ''}" @input="${(e) => this._changeValue('title', e.target.value)}"></ha-textfield>
              ${this._colorField(t("editor.fields.title_color"), this.config.title_color || '', (v) => this._changeValue('title_color', v), t("editor.placeholders.css_var"))}
              <ha-textfield label="${t("editor.fields.title_size")}" .value="${this.config.title_size || ''}" @input="${(e) => this._changeValue('title_size', e.target.value)}"></ha-textfield>
              <ha-textfield label="${t("editor.fields.title_weight")}" .value="${this.config.title_weight || ''}" @input="${(e) => this._changeValue('title_weight', e.target.value)}"></ha-textfield>
            </div>
          </div>
        </ha-expansion-panel>

        <ha-expansion-panel header="${t("editor.sections.node_actions")}" outlined>
          <div class="panel-content">
            <div class="selectors">
              <ha-selector .hass=${this.hass} .value=${this.config.node_status || ''} label="${t("editor.fields.node_status")}" .selector=${{ entity: {} }} @value-changed=${(e) => this._changeValue('node_status', e.detail.value)}></ha-selector>
            </div>
            <div class="selectors" style="margin-top:12px;">
              <ha-selector .hass=${this.hass} .value=${this.config.node_uptime || ''} label="${t("editor.fields.node_uptime")}" .selector=${{ entity: { domain: "sensor" } }} @value-changed=${(e) => this._changeValue('node_uptime', e.detail.value)}></ha-selector>
              <ha-selector .hass=${this.hass} .value=${this.config.node_restart || ''} label="${t("editor.fields.node_restart")}" .selector=${{ entity: { domain: "button" } }} @value-changed=${(e) => this._changeValue('node_restart', e.detail.value)}></ha-selector>
              <ha-selector .hass=${this.hass} .value=${this.config.node_shutdown || ''} label="${t("editor.fields.node_shutdown")}" .selector=${{ entity: { domain: "button" } }} @value-changed=${(e) => this._changeValue('node_shutdown', e.detail.value)}></ha-selector>
              <ha-selector .hass=${this.hass} .value=${this.config.node_start_all || ''} label="${t("editor.fields.node_start_all")}" .selector=${{ entity: { domain: "button" } }} @value-changed=${(e) => this._changeValue('node_start_all', e.detail.value)}></ha-selector>
              <ha-selector .hass=${this.hass} .value=${this.config.node_stop_all || ''} label="${t("editor.fields.node_stop_all")}" .selector=${{ entity: { domain: "button" } }} @value-changed=${(e) => this._changeValue('node_stop_all', e.detail.value)}></ha-selector>
              <ha-selector .hass=${this.hass} .value=${this.config.node_suspend_all || ''} label="${t("editor.fields.node_suspend_all")}" .selector=${{ entity: { domain: "button" } }} @value-changed=${(e) => this._changeValue('node_suspend_all', e.detail.value)}></ha-selector>
            </div>
          </div>
        </ha-expansion-panel>

        <ha-expansion-panel header="${t("editor.sections.cpu")}" outlined>
          <div class="panel-content">
            ${this._statBoxFields('cpu', '#2196f3', t("editor.fields.cpu_sensor"), 'node_cpu', t)}
          </div>
        </ha-expansion-panel>

        <ha-expansion-panel header="${t("editor.sections.ram")}" outlined>
          <div class="panel-content">
            ${this._statBoxFields('ram', '#9c27b0', t("editor.fields.ram_sensor"), 'node_memory', t)}
          </div>
        </ha-expansion-panel>

        <ha-expansion-panel header="${t("editor.sections.disk")}" outlined>
          <div class="panel-content">
            <ha-selector .hass=${this.hass} .value=${this.config.node_disk_size || ''} label="${t("editor.fields.disk_size_sensor")}" .selector=${{ entity: { domain: "sensor" } }} @value-changed=${(e) => this._changeValue('node_disk_size', e.detail.value)}></ha-selector>
            <div style="margin-top:8px;">
              ${this._statBoxFields('disk', '#4caf50', t("editor.fields.disk_sensor"), 'node_disk', t)}
            </div>
          </div>
        </ha-expansion-panel>

        <ha-expansion-panel header="${t("editor.sections.node_extra")}" outlined>
          <div class="panel-content">
            <div class="selectors">
              <ha-selector .hass=${this.hass} .value=${this.config.node_max_cpu || ''} label="${t("editor.fields.node_max_cpu")}" .selector=${{ entity: { domain: "sensor" } }} @value-changed=${(e) => this._changeValue('node_max_cpu', e.detail.value)}></ha-selector>
              <ha-selector .hass=${this.hass} .value=${this.config.node_max_memory || ''} label="${t("editor.fields.node_max_memory")}" .selector=${{ entity: { domain: "sensor" } }} @value-changed=${(e) => this._changeValue('node_max_memory', e.detail.value)}></ha-selector>
              <ha-selector .hass=${this.hass} .value=${this.config.node_backup_status || ''} label="${t("editor.fields.node_backup_status")}" .selector=${{ entity: {} }} @value-changed=${(e) => this._changeValue('node_backup_status', e.detail.value)}></ha-selector>
              <ha-selector .hass=${this.hass} .value=${this.config.node_backup_duration || ''} label="${t("editor.fields.node_backup_duration")}" .selector=${{ entity: { domain: "sensor" } }} @value-changed=${(e) => this._changeValue('node_backup_duration', e.detail.value)}></ha-selector>
              <ha-selector .hass=${this.hass} .value=${this.config.node_last_backup || ''} label="${t("editor.fields.node_last_backup")}" .selector=${{ entity: { domain: "sensor" } }} @value-changed=${(e) => this._changeValue('node_last_backup', e.detail.value)}></ha-selector>
            </div>
          </div>
        </ha-expansion-panel>

        <ha-expansion-panel header="${t("editor.sections.vms")} (${this.config.vms.length})${this.config.auto_discover ? ' · ' + t('editor.sections.auto_discover') : ''}" outlined>
          <div class="panel-content">
            <div class="auto-discover-row">
              <ha-formfield label="${t("editor.auto_discover_label")}">
                <ha-switch .checked=${this.config.auto_discover ?? true}
                  @change=${(e) => this._changeValue('auto_discover', e.target.checked)}></ha-switch>
              </ha-formfield>
            </div>
            ${this.config.auto_discover ? html`
              <p class="auto-discover-note">${t("editor.auto_discover_note")}</p>
            ` : html`
            ${(() => {
              const nodeId = this.config.node_device_id;
              const vmDeviceOptions = nodeId && this.hass?.devices
                ? Object.values(this.hass.devices)
                    .filter(d => d.via_device_id === nodeId && (d.model === 'VM' || d.model === 'Container'))
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(d => ({ value: d.id, label: `${d.name} (${d.model})` }))
                : [];
              return this.config.vms.map((vm, index) => html`
              <ha-expansion-panel header="${vm.name || `${index + 1}`}" outlined data-vm-index="${index}">
                <div class="panel-content">
                  <div class="vm-header" style="border: none; padding-bottom: 0; margin-bottom: 8px;">
                    <button class="delete-btn" @click="${() => this._removeVm(index)}">
                      <ha-icon icon="mdi:delete-outline"></ha-icon> ${t("editor.delete_vm")}
                    </button>
                  </div>
                  <div class="node-device-row" style="margin-bottom:12px;">
                    <ha-selector .hass=${this.hass} .value=${vm.device_id || ''} label="${t("editor.fields.vm_device")}" .selector=${{ select: { options: vmDeviceOptions, mode: 'dropdown', custom_value: false } }} @value-changed=${(e) => this._onVmDeviceChanged(index, e.detail.value)} style="flex:1;"></ha-selector>
                    <button class="defaults-btn" ?disabled=${!vm.device_id && !vm.status} @click=${() => this._loadVmDefaults(index)}>
                      <ha-icon icon="mdi:auto-fix"></ha-icon>${t("editor.fields.node_load_defaults")}
                    </button>
                  </div>
                  <div class="grid-2">
                    <ha-textfield label="${t("editor.fields.display_name")}" .value="${vm.name || ''}" @input="${(e) => this._vmChanged(index, 'name', e.target.value)}"></ha-textfield>
                    <ha-textfield label="${t("editor.fields.image_url")}" .value="${vm.image || ''}" @input="${(e) => this._vmChanged(index, 'image', e.target.value)}"></ha-textfield>
                    ${this._colorField(t("editor.fields.row_background"), vm.bg_color || '', (v) => this._vmChanged(index, 'bg_color', v), t("editor.placeholders.rgba"))}
                    <ha-textfield label="${t("editor.fields.row_border")}" .value="${vm.border || ''}" @input="${(e) => this._vmChanged(index, 'border', e.target.value)}" placeholder="${t("editor.placeholders.border")}"></ha-textfield>
                    <ha-textfield label="${t("editor.fields.row_shadow")}" .value="${vm.shadow || ''}" @input="${(e) => this._vmChanged(index, 'shadow', e.target.value)}" placeholder="${t("editor.placeholders.shadow")}"></ha-textfield>
                  </div>
                  <div class="selectors" style="margin-top:12px;">
                    <ha-selector .hass=${this.hass} .value=${vm.icon || ''} label="${t("editor.fields.mdi_icon")}" .selector=${{ icon: {} }} @value-changed=${(e) => this._vmChanged(index, 'icon', e.detail.value)}></ha-selector>
                    ${!this.config.auto_discover ? html`
                      <ha-selector .hass=${this.hass} .value=${vm.status || ''} label="${t("editor.fields.status_entity")}" .selector=${{ entity: { domain: "binary_sensor" } }} @value-changed=${(e) => this._vmChanged(index, 'status', e.detail.value)}></ha-selector>
                      <ha-selector .hass=${this.hass} .value=${vm.uptime || ''} label="${t("editor.fields.uptime_entity")}" .selector=${{ entity: { domain: "sensor" } }} @value-changed=${(e) => this._vmChanged(index, 'uptime', e.detail.value)}></ha-selector>
                      <ha-selector .hass=${this.hass} .value=${vm.cpu || ''} label="${t("editor.fields.cpu_entity")}" .selector=${{ entity: { domain: "sensor" } }} @value-changed=${(e) => this._vmChanged(index, 'cpu', e.detail.value)}></ha-selector>
                      <ha-selector .hass=${this.hass} .value=${vm.memory || ''} label="${t("editor.fields.memory_entity")}" .selector=${{ entity: { domain: "sensor" } }} @value-changed=${(e) => this._vmChanged(index, 'memory', e.detail.value)}></ha-selector>
                      <ha-selector .hass=${this.hass} .value=${vm.disk || ''} label="${t("editor.fields.disk_entity")}" .selector=${{ entity: { domain: "sensor" } }} @value-changed=${(e) => this._vmChanged(index, 'disk', e.detail.value)}></ha-selector>
                      <ha-selector .hass=${this.hass} .value=${vm.disk_size || ''} label="${t("editor.fields.disk_size_entity")}" .selector=${{ entity: { domain: "sensor" } }} @value-changed=${(e) => this._vmChanged(index, 'disk_size', e.detail.value)}></ha-selector>
                      <ha-selector .hass=${this.hass} .value=${vm.start || ''} label="${t("editor.fields.start_button")}" .selector=${{ entity: { domain: "button" } }} @value-changed=${(e) => this._vmChanged(index, 'start', e.detail.value)}></ha-selector>
                      <ha-selector .hass=${this.hass} .value=${vm.shutdown || ''} label="${t("editor.fields.shutdown_button")}" .selector=${{ entity: { domain: "button" } }} @value-changed=${(e) => this._vmChanged(index, 'shutdown', e.detail.value)}></ha-selector>
                      <ha-selector .hass=${this.hass} .value=${vm.stop || ''} label="${t("editor.fields.stop_button")}" .selector=${{ entity: { domain: "button" } }} @value-changed=${(e) => this._vmChanged(index, 'stop', e.detail.value)}></ha-selector>
                      <ha-selector .hass=${this.hass} .value=${vm.reboot || ''} label="${t("editor.fields.reboot_button")}" .selector=${{ entity: { domain: "button" } }} @value-changed=${(e) => this._vmChanged(index, 'reboot', e.detail.value)}></ha-selector>
                      <ha-selector .hass=${this.hass} .value=${vm.snapshot || ''} label="${t("editor.fields.snapshot_button")}" .selector=${{ entity: { domain: "button" } }} @value-changed=${(e) => this._vmChanged(index, 'snapshot', e.detail.value)}></ha-selector>
                    ` : ''}
                  <ha-expansion-panel header="${t("editor.sections.interactions")}" outlined style="margin-top:12px;">
                    <div class="panel-content">
                      <div class="action-editors">
                        ${this._actionEditor('Tap Action',        vm.tap_action,        (v) => this._vmChanged(index, 'tap_action',        v))}
                        ${this._actionEditor('Double Tap Action', vm.double_tap_action, (v) => this._vmChanged(index, 'double_tap_action', v))}
                        ${this._actionEditor('Hold Action',       vm.hold_action,       (v) => this._vmChanged(index, 'hold_action',       v))}
                      </div>
                    </div>
                  </ha-expansion-panel>
                </div>
              </ha-expansion-panel>
            `);
            })()}
            <button class="add-vm-btn" @click="${this._addVm}">
              <ha-icon icon="mdi:plus-circle-outline"></ha-icon> ${t("editor.add_vm")}
            </button>
            `}
          </div>
        </ha-expansion-panel>

        <ha-expansion-panel header="${t("editor.sections.interactions")}" outlined>
          <div class="panel-content">
            <p style="margin:0 0 12px;font-size:0.85rem;color:var(--secondary-text-color);">Tap / double-tap / hold on the node area (header &amp; stats)</p>
            <div class="action-editors">
              ${this._actionEditor('Tap Action',        this.config.tap_action,        (v) => this._changeValue('tap_action',        v))}
              ${this._actionEditor('Double Tap Action', this.config.double_tap_action, (v) => this._changeValue('double_tap_action', v))}
              ${this._actionEditor('Hold Action',       this.config.hold_action,       (v) => this._changeValue('hold_action',       v))}
            </div>
          </div>
        </ha-expansion-panel>

      </div>

      ${this._pendingDeviceId ? html`
        <ha-dialog open @closed=${this._cancelNodeDevice} heading="Change Node?">
          <p style="margin:0 0 24px;">Changing the node will overwrite all current entity and sensor settings. Your icon, colour, and interaction overrides will be kept.<br><br>Continue?</p>
          <div class="editor-confirm-actions">
            <button class="editor-confirm-btn cancel" @click=${this._cancelNodeDevice}>Cancel</button>
            <button class="editor-confirm-btn destructive" @click=${() => this._applyNodeDevice(this._pendingDeviceId)}>Change Node</button>
          </div>
        </ha-dialog>
      ` : ''}
      ${this._pendingVmDevice ? html`
        <ha-dialog open @closed=${this._cancelVmDevice} heading="Change Device?">
          <p style="margin:0 0 24px;">Changing the device will overwrite all entity and sensor settings. Your icon, colour, and interaction overrides will be kept.<br><br>Continue?</p>
          <div class="editor-confirm-actions">
            <button class="editor-confirm-btn cancel" @click=${this._cancelVmDevice}>Cancel</button>
            <button class="editor-confirm-btn destructive" @click=${() => this._applyVmDevice(this._pendingVmDevice.index, this._pendingVmDevice.deviceId)}>Change Device</button>
          </div>
        </ha-dialog>
      ` : ''}
    `;
  }

  static get styles() {
    return css`
      .editor-container { display: flex; flex-direction: column; gap: 12px; }
      .panel-content { padding: 16px 0; }
      .delete-btn { background: none; border: none; color: var(--error-color); cursor: pointer; display: flex; align-items: center; gap: 4px; font-weight: 500; font-size: 14px; margin-left: auto; }
      .delete-btn:hover { text-decoration: underline; }
      .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: center; }
      ha-textfield, ha-selector { width: 100%; }
      .selectors { display: flex; flex-direction: column; gap: 8px; }
      .color-field { display: flex; align-items: center; gap: 8px; min-width: 0; }
      .color-field ha-textfield { flex: 1; min-width: 0; }
      .color-swatch { width: 36px; height: 36px; min-width: 36px; padding: 2px; border: 1px solid var(--divider-color); border-radius: 6px; cursor: pointer; background: none; }
      .add-vm-btn { display: flex; align-items: center; gap: 8px; margin-top: 12px; width: 100%; padding: 10px 16px; border-radius: 8px; border: 2px dashed var(--primary-color); background: transparent; color: var(--primary-color); font-size: 0.9rem; font-weight: 500; cursor: pointer; transition: background 0.2s, color 0.2s; justify-content: center; }
      .add-vm-btn:hover { background: var(--primary-color); color: var(--text-primary-color, #fff); }
      .add-vm-btn ha-icon { --mdc-icon-size: 20px; }
      .load-defaults-row { display: flex; align-items: flex-end; gap: 12px; }
      .load-defaults-row .defaults-btn { flex-shrink: 0; margin-bottom: 4px; }
      .action-editors { display: flex; flex-direction: column; gap: 12px; }
      .action-editor { display: flex; flex-direction: column; gap: 8px; padding: 10px 12px; border-radius: 8px; background: var(--secondary-background-color, rgba(0,0,0,0.04)); }
      .action-editor-label { font-size: 0.8rem; font-weight: 600; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.5px; }
      .defaults-btn { display: flex; align-items: center; gap: 6px; padding: 0 16px; height: 40px; border-radius: 8px; border: none; cursor: pointer; background: var(--primary-color); color: var(--text-primary-color, #fff); font-size: 0.875rem; font-weight: 500; white-space: nowrap; transition: filter 0.2s; }
      .defaults-btn:hover:not(:disabled) { filter: brightness(1.1); }
      .defaults-btn:disabled { opacity: 0.4; cursor: not-allowed; }
      .defaults-btn ha-icon { --mdc-icon-size: 16px; }
      ha-expansion-panel { margin-bottom: 8px; }
      .editor-confirm-actions { display: flex; justify-content: flex-end; gap: 8px; }
      .editor-confirm-btn { padding: 8px 20px; border-radius: 6px; border: none; font-size: 0.875rem; font-weight: 500; cursor: pointer; transition: filter 0.15s; }
      .editor-confirm-btn:hover { filter: brightness(1.1); }
      .editor-confirm-btn.cancel { background: var(--secondary-background-color); color: var(--primary-text-color); }
      .editor-confirm-btn.destructive { background: var(--error-color, #f44336); color: #fff; }
      .node-device-row { display: flex; align-items: flex-end; gap: 12px; margin-bottom: 4px; }
      .node-device-row .defaults-btn { flex-shrink: 0; margin-bottom: 4px; }
      .auto-discover-row { display: flex; align-items: center; margin-bottom: 12px; }
      .auto-discover-note { margin: 0 0 12px; font-size: 0.82rem; color: var(--secondary-text-color); background: var(--secondary-background-color, rgba(0,0,0,0.04)); border-radius: 6px; padding: 8px 10px; line-height: 1.5; }
    `;
  }
}
customElements.define("proxmox-ha-card-editor", ProxmoxCardEditor);

// --- CARD ---
class ProxmoxCard extends LitElement {
  constructor() {
    super();
    this._pendingAction = null;
    this._cpuGraph  = null;
    this._ramGraph  = null;
    this._diskGraph = null;
    this._vmGraphs  = new Map();
    this._tapCtx    = new Map();
    this._holdTimer = null;
    this._holdFired = false;
  }

  static get properties() {
    return { hass: { type: Object }, config: { type: Object } };
  }

  static getConfigElement() { return document.createElement("proxmox-ha-card-editor"); }
  static getStubConfig()    { return { title: "Proxmox Node", title_icon: "phu:proxmox", title_color: "#E57000", auto_discover: true, node_device_id: '', vms: [] }; }

  _t(key)         { return localize(this._hass, key); }

  setConfig(config) {
    if (!config.vms) throw new Error(localize(null, "errors.missing_vms"));
    this.config = { title: "Proxmox", title_icon: "phu:proxmox", title_color: "#E57000", auto_discover: true, ...config };
    this._cpuGraph  = null;
    this._ramGraph  = null;
    this._diskGraph = null;
    this._vmGraphs  = new Map();
  }

  set hass(hass) {
    const oldHass = this._hass;
    this._hass = hass;
    if (this._cpuGraph)  this._cpuGraph.hass  = hass;
    if (this._ramGraph)  this._ramGraph.hass  = hass;
    if (this._diskGraph) this._diskGraph.hass = hass;
    for (const g of this._vmGraphs.values()) {
      if (g.cpu)  g.cpu.hass  = hass;
      if (g.ram)  g.ram.hass  = hass;
      if (g.disk) g.disk.hass = hass;
    }
    this.requestUpdate('hass', oldHass);
    if (this.config) {
    }
  }

  get hass() { return this._hass; }

  _createGraph(entityId, color, hoursToShow = 24) {
    if (!entityId) return null;
    const el = document.createElement("mini-graph-card");
    el.setConfig({
      entities: [entityId],
      line_color: color,
      line_width: 2,
      hours_to_show: hoursToShow,
      points_per_hour: 2,
      group: true,
      show: { name: false, icon: false, state: false, labels: false, fill: true, points: false, legend: false }
    });
    el.hass = this.hass;
    return el;
  }

  _initGraphs(effectiveVms) {
    if (!this._cpuGraph  && this.config.node_cpu)    this._cpuGraph  = this._createGraph(this.config.node_cpu,    this.config.cpu_color  || "#2196f3");
    if (!this._ramGraph  && this.config.node_memory) this._ramGraph  = this._createGraph(this.config.node_memory, this.config.ram_color  || "#9c27b0");
    if (!this._diskGraph && this.config.node_disk)   this._diskGraph = this._createGraph(this.config.node_disk,   this.config.disk_color || "#4caf50");

    for (const vm of effectiveVms) {
      const key = vm.status || vm.name;
      if (!this._vmGraphs.has(key)) this._vmGraphs.set(key, { cpu: null, ram: null, disk: null });
      const g = this._vmGraphs.get(key);
      if (!g.cpu  && vm.cpu)    g.cpu  = this._createGraph(vm.cpu,    this.config.cpu_color  || "#2196f3", 6);
      if (!g.ram  && vm.memory) g.ram  = this._createGraph(vm.memory, this.config.ram_color  || "#9c27b0", 6);
      if (!g.disk && vm.disk)   g.disk = this._createGraph(vm.disk,   this.config.disk_color || "#4caf50", 6);
    }
  }

  _discoverVms() {
    if (!this._hass?.devices || !this._hass?.entities) return null;

    // Use stored device_id first; fall back to resolving from the status entity
    const nodeDeviceId = this.config.node_device_id
      || (this.config.node_status ? this._hass.entities[this.config.node_status]?.device_id : null);
    if (!nodeDeviceId) return null;

    const vmDevices = Object.values(this._hass.devices)
      .filter(d => d.via_device_id === nodeDeviceId &&
                   (d.model === 'VM' || d.model === 'Container'));

    return vmDevices.map(device => {
      const ids = Object.values(this._hass.entities)
        .filter(e => e.device_id === device.id)
        .map(e => e.entity_id);

      const find = (domain, suffix) =>
        ids.find(id => id.startsWith(domain + '.') && id.endsWith(suffix)) ?? null;

      const override = (this.config.vms || [])
        .find(v => v.name?.toLowerCase() === device.name?.toLowerCase()) || {};

      return {
        name:              device.name,
        _auto:             true,
        status:            find('binary_sensor', '_status'),
        cpu:               find('sensor', '_cpu_usage'),
        memory:            find('sensor', '_memory_usage_percentage'),
        disk:              find('sensor', '_disk_usage'),
        disk_size:         find('sensor', '_max_disk_usage'),
        uptime:            find('sensor', '_uptime'),
        start:             find('button', '_start'),
        stop:              find('button', '_stop'),
        reboot:            find('button', '_restart'),
        shutdown:          find('button', '_shut_down'),
        snapshot:          find('button', '_create_snapshot'),
        icon:              override.icon              || '',
        image:             override.image             || '',
        bg_color:          override.bg_color          || '',
        border:            override.border            || '',
        shadow:            override.shadow            || '',
        tap_action:        override.tap_action,
        double_tap_action: override.double_tap_action,
        hold_action:       override.hold_action,
      };
    });
  }

  _handleAction(entityId) {
    if (!entityId) return;
    this.hass.callService("button", "press", { entity_id: entityId });
  }

  _confirmAction(label, entityId) {
    if (!entityId) return;
    this._pendingAction = { label, entityId };
    this.requestUpdate();
  }

  _confirmYes() {
    if (this._pendingAction) this._handleAction(this._pendingAction.entityId);
    this._pendingAction = null;
    this.requestUpdate();
  }

  _confirmNo() {
    this._pendingAction = null;
    this.requestUpdate();
  }

  _executeAction(actionConfig) {
    if (!actionConfig || !actionConfig.action || actionConfig.action === 'none') return;
    switch (actionConfig.action) {
      case 'more-info': {
        const entityId = actionConfig.entity;
        if (entityId) this.dispatchEvent(new CustomEvent('hass-more-info', { bubbles: true, composed: true, detail: { entityId } }));
        break;
      }
      case 'navigate': {
        const path = actionConfig.navigation_path || '/';
        history.pushState(null, '', path);
        window.dispatchEvent(new CustomEvent('location-changed', { bubbles: true, composed: true, detail: { replace: false } }));
        break;
      }
      case 'url':
        if (actionConfig.url_path) window.open(actionConfig.url_path, '_blank', 'noreferrer');
        break;
      case 'call-service': {
        const [domain, svc] = (actionConfig.service || '').split('.', 2);
        if (domain && svc) this.hass.callService(domain, svc, actionConfig.service_data || {});
        break;
      }
    }
  }

  _onPointerDown(key, holdAction) {
    this._holdFired = false;
    clearTimeout(this._holdTimer);
    this._holdTimer = setTimeout(() => {
      this._holdFired = true;
      this._executeAction(holdAction);
    }, 500);
  }

  _onPointerUp() {
    clearTimeout(this._holdTimer);
    this._holdTimer = null;
  }

  _onPointerCancel() {
    clearTimeout(this._holdTimer);
    this._holdTimer = null;
    this._holdFired = false;
  }

  _onTap(key, tapAction, doubleTapAction) {
    if (this._holdFired) return;
    let ctx = this._tapCtx.get(key);
    if (!ctx) { ctx = { count: 0, timer: null }; this._tapCtx.set(key, ctx); }
    ctx.count++;
    clearTimeout(ctx.timer);
    if (ctx.count >= 2) {
      ctx.count = 0;
      this._executeAction(doubleTapAction);
    } else {
      ctx.timer = setTimeout(() => { ctx.count = 0; this._executeAction(tapAction); }, 250);
    }
  }

  _formatUptime(state) {
    const totalHours = parseFloat(state);
    if (isNaN(totalHours) || totalHours < 0) return state;
    const d = Math.floor(totalHours / 24);
    const h = Math.floor(totalHours % 24);
    const m = Math.floor((totalHours * 60) % 60);
    if (d > 0) return `${d}d ${h}h ${m}m`;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  }

  _formatDisk(usageState, sizeState) {
    if (!usageState) return null;
    const unit = usageState.attributes?.unit_of_measurement || '';
    const used = parseFloat(usageState.state);
    if (isNaN(used)) return usageState.state;
    const usedStr = Number.isInteger(used) ? used : used.toFixed(1);
    if (sizeState) {
      const total = parseFloat(sizeState.state);
      const totalStr = Number.isInteger(total) ? total : total.toFixed(1);
      return `${usedStr} / ${totalStr} ${unit}`.trim();
    }
    return `${usedStr} ${unit}`.trim();
  }

  _stateVal(entityId) {
    if (!entityId || !this._hass) return null;
    return this._hass.states[entityId] || null;
  }

  _timeAgo(dateStr) {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const diff = Date.now() - date.getTime();
    const mins  = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days  = Math.floor(diff / 86400000);
    if (days  > 0) return `${days} day${days   > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (mins  > 0) return `${mins} min${mins    > 1 ? 's' : ''} ago`;
    return 'just now';
  }

  _formatChipState(stateObj) {
    if (!stateObj) return { display: '', title: '' };
    const raw  = stateObj.state;
    const dc   = stateObj.attributes?.device_class;
    const unit = stateObj.attributes?.unit_of_measurement || '';

    if (dc === 'problem') {
      const isProblem = raw !== 'off';
      return { display: isProblem ? 'Problem' : 'OK', title: '', problem: isProblem };
    }
    if (dc === 'timestamp' || /^\d{4}-\d{2}-\d{2}T/.test(raw)) {
      return { display: this._timeAgo(raw), title: new Date(raw).toLocaleString() };
    }
    const num = parseFloat(raw);
    if (!isNaN(num)) {
      return { display: `${num.toFixed(1)}${unit ? ' ' + unit : ''}`, title: '' };
    }
    return { display: `${raw}${unit ? ' ' + unit : ''}`, title: '' };
  }

  _isNodeRunning(state) {
    if (!state) return false;
    const s = state.state?.toLowerCase();
    return s === 'on' || s === 'online' || s === 'running' || s === 'ok';
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const effectiveVms = this.config.auto_discover
      ? (this._discoverVms() ?? [])
      : (this.config.vms ?? []);

    this._initGraphs(effectiveVms);

    const cpuState  = this._stateVal(this.config.node_cpu);
    const ramState  = this._stateVal(this.config.node_memory);
    const diskState = this._stateVal(this.config.node_disk);
    const diskSizeState = this._stateVal(this.config.node_disk_size);

    const cpuValue  = cpuState  ? parseFloat(cpuState.state).toFixed(1)  : '-';
    const ramValue  = ramState  ? parseFloat(ramState.state).toFixed(1)  : '-';
    const diskValue = this._formatDisk(diskState, diskSizeState);

    // node status row
    const nodeStatusState  = this._stateVal(this.config.node_status);
    const nodeUptimeState  = this._stateVal(this.config.node_uptime);
    const nodeIsRunning    = this._isNodeRunning(nodeStatusState);
    const nodeUptimeStr    = nodeUptimeState ? this._formatUptime(nodeUptimeState.state) : null;
    const nodeStatusText   = nodeStatusState
      ? (nodeIsRunning
          ? (nodeUptimeStr ? `${this._t("card.running")} · ${nodeUptimeStr}` : this._t("card.running"))
          : (nodeStatusState.state || this._t("card.stopped")))
      : (nodeUptimeStr ? `${this._t("card.running")} · ${nodeUptimeStr}` : null);

    const hasNodeActions = this.config.node_restart || this.config.node_shutdown ||
      this.config.node_start_all || this.config.node_stop_all || this.config.node_suspend_all;
    const showNodeRow = nodeStatusText || hasNodeActions;

    // extra node metrics
    const extraMetrics = [
      this.config.node_max_cpu     && this._stateVal(this.config.node_max_cpu)     ? { icon: 'mdi:cpu-64-bit',      label: 'Max CPU',     state: this._stateVal(this.config.node_max_cpu) }     : null,
      this.config.node_max_memory  && this._stateVal(this.config.node_max_memory)  ? { icon: 'mdi:memory',          label: 'Max RAM',     state: this._stateVal(this.config.node_max_memory) }  : null,
      this.config.node_backup_status && this._stateVal(this.config.node_backup_status) ? { icon: 'mdi:backup-restore', label: 'Backup',      state: this._stateVal(this.config.node_backup_status) } : null,
      this.config.node_backup_duration && this._stateVal(this.config.node_backup_duration) ? { icon: 'mdi:timer-outline', label: 'Backup Duration', state: this._stateVal(this.config.node_backup_duration) } : null,
      this.config.node_last_backup && this._stateVal(this.config.node_last_backup)  ? { icon: 'mdi:clock-outline',   label: 'Last Backup', state: this._stateVal(this.config.node_last_backup) }  : null,
    ].filter(Boolean);

    const headerStyle = `${this.config.title_color ? `color: ${this.config.title_color};` : ''}${this.config.title_size ? `font-size: ${this.config.title_size};` : ''}${this.config.title_weight ? `font-weight: ${this.config.title_weight};` : ''}`;

    const hasDisk      = !!this.config.node_disk;
    const statColumns  = hasDisk ? 3 : 2;

    const cpuStyle  = `${this.config.cpu_border  ? `--custom-border: ${this.config.cpu_border};`  : ''}${this.config.cpu_shadow  ? `--custom-shadow: ${this.config.cpu_shadow};`  : ''}`;
    const ramStyle  = `${this.config.ram_border  ? `--custom-border: ${this.config.ram_border};`  : ''}${this.config.ram_shadow  ? `--custom-shadow: ${this.config.ram_shadow};`  : ''}`;
    const diskStyle = `${this.config.disk_border ? `--custom-border: ${this.config.disk_border};` : ''}${this.config.disk_shadow ? `--custom-shadow: ${this.config.disk_shadow};` : ''}`;

    return html`
      <ha-card>

        <div class="node-interactive"
          @mousedown=${() => this._onPointerDown('node', this.config.hold_action)}
          @mouseup=${this._onPointerUp}
          @mouseleave=${this._onPointerCancel}
          @touchstart=${() => this._onPointerDown('node', this.config.hold_action)}
          @touchend=${this._onPointerUp}
          @touchcancel=${this._onPointerCancel}
          @click=${() => this._onTap('node', this.config.tap_action, this.config.double_tap_action)}
          style="${(this.config.tap_action?.action && this.config.tap_action.action !== 'none') || (this.config.hold_action?.action && this.config.hold_action.action !== 'none') ? 'cursor:pointer;' : ''}"
        >
        ${this.config.title || this.config.title_icon ? html`
          <div class="custom-header" style="${headerStyle}">
            ${this.config.title_icon ? html`<ha-icon icon="${this.config.title_icon}" class="header-icon"></ha-icon>` : ''}
            ${this.config.title}
          </div>
        ` : ''}

        ${showNodeRow ? html`
          <div class="node-row">
            ${nodeStatusText ? html`
              <div class="node-status">
                <span class="node-dot ${nodeIsRunning ? 'running' : 'stopped'}"></span>
                <span class="node-status-text">${nodeStatusText}</span>
              </div>
            ` : html`<div></div>`}
            ${hasNodeActions ? html`
              <div class="node-actions" @click=${(e) => e.stopPropagation()} @mousedown=${(e) => e.stopPropagation()}>
                <button class="action-btn" title="Restart"     ?disabled=${!this.config.node_restart}     @click=${() => this._confirmAction('Restart',     this.config.node_restart)}><ha-icon icon="mdi:restart"></ha-icon></button>
                <button class="action-btn" title="Shut Down"   ?disabled=${!this.config.node_shutdown}    @click=${() => this._confirmAction('Shut down',   this.config.node_shutdown)}><ha-icon icon="mdi:power"></ha-icon></button>
                <button class="action-btn" title="Start All"   ?disabled=${!this.config.node_start_all}   @click=${() => this._handleAction(this.config.node_start_all)}><ha-icon icon="mdi:play-circle-outline"></ha-icon></button>
                <button class="action-btn" title="Stop All"    ?disabled=${!this.config.node_stop_all}    @click=${() => this._confirmAction('Stop all',    this.config.node_stop_all)}><ha-icon icon="mdi:stop-circle-outline"></ha-icon></button>
                <button class="action-btn" title="Suspend All" ?disabled=${!this.config.node_suspend_all} @click=${() => this._confirmAction('Suspend all', this.config.node_suspend_all)}><ha-icon icon="mdi:pause-circle-outline"></ha-icon></button>
              </div>
            ` : ''}
          </div>
        ` : ''}

        <div class="stats-grid" style="grid-template-columns:repeat(${statColumns},1fr);">
          <div class="stat-box" style="${cpuStyle}">
            ${this._cpuGraph ? html`<div class="graph-wrapper">${this._cpuGraph}</div>` : ''}
            <div class="stat-content">
              <span class="stat-label" style="color:${this.config.cpu_label_color || this.config.cpu_color || '#2196f3'};">${this._t("card.cpu_label")}</span>
              <div class="stat-row" style="color:${this.config.cpu_value_color || this.config.cpu_color || '#2196f3'};">
                <ha-icon icon="mdi:cpu-64-bit" class="stat-icon"></ha-icon>
                <span class="stat-value">${cpuValue} %</span>
              </div>
            </div>
          </div>
          <div class="stat-box" style="${ramStyle}">
            ${this._ramGraph ? html`<div class="graph-wrapper">${this._ramGraph}</div>` : ''}
            <div class="stat-content">
              <span class="stat-label" style="color:${this.config.ram_label_color || this.config.ram_color || '#9c27b0'};">${this._t("card.ram_label")}</span>
              <div class="stat-row" style="color:${this.config.ram_value_color || this.config.ram_color || '#9c27b0'};">
                <ha-icon icon="mdi:memory" class="stat-icon"></ha-icon>
                <span class="stat-value">${ramValue} %</span>
              </div>
            </div>
          </div>
          ${hasDisk ? html`
            <div class="stat-box" style="${diskStyle}">
              ${this._diskGraph ? html`<div class="graph-wrapper">${this._diskGraph}</div>` : ''}
              <div class="stat-content">
                <span class="stat-label" style="color:${this.config.disk_label_color || this.config.disk_color || '#4caf50'};">${this._t("card.disk_label")}</span>
                <div class="stat-row" style="color:${this.config.disk_value_color || this.config.disk_color || '#4caf50'};">
                  <ha-icon icon="mdi:harddisk" class="stat-icon"></ha-icon>
                  <span class="stat-value">${diskValue ?? '-'}</span>
                </div>
              </div>
            </div>
          ` : ''}
        </div>

        ${extraMetrics.length > 0 ? html`
          <div class="node-extra">
            ${extraMetrics.map(m => {
              const { display, title, problem } = this._formatChipState(m.state);
              const tooltip = title ? `${m.label}: ${title}` : m.label;
              const chipStyle = problem
                ? 'background:rgba(244,67,54,0.15);color:var(--error-color,#f44336);'
                : '';
              return html`
                <div class="node-extra-chip" title="${tooltip}" style="${chipStyle}">
                  <ha-icon icon="${m.icon}"></ha-icon>
                  <span>${display}</span>
                </div>
              `;
            })}
          </div>
        ` : ''}

        </div><!-- end node-interactive -->

        <div class="card-content">
          <div class="vm-list">
            ${effectiveVms.map((vm, i) => {
              const statusEntity = vm.status ? this.hass.states[vm.status] : null;
              const isRunning    = statusEntity ? statusEntity.state === 'on' : false;

              const uptimeState  = this._stateVal(vm.uptime);
              const uptimeStr    = isRunning && uptimeState ? this._formatUptime(uptimeState.state) : null;
              const statusText   = isRunning
                ? (uptimeStr ? `${this._t("card.running")} · ${uptimeStr}` : this._t("card.running"))
                : this._t("card.stopped");

              const vmCpuState      = this._stateVal(vm.cpu);
              const vmRamState      = this._stateVal(vm.memory);
              const vmDiskState     = this._stateVal(vm.disk);
              const vmDiskSizeState = this._stateVal(vm.disk_size);

              const vmCpuValue  = vmCpuState  ? `${parseFloat(vmCpuState.state).toFixed(1)}%`  : null;
              const vmRamValue  = vmRamState  ? `${parseFloat(vmRamState.state).toFixed(1)}%`  : null;
              const vmDiskValue = this._formatDisk(vmDiskState, vmDiskSizeState);

              const graphs = this._vmGraphs.get(vm.status || vm.name) || {};
              const graphSlots = [
                vm.cpu    && graphs.cpu  ? { el: graphs.cpu  } : null,
                vm.memory && graphs.ram  ? { el: graphs.ram  } : null,
                vm.disk   && graphs.disk ? { el: graphs.disk } : null,
              ].filter(Boolean);
              const pct = graphSlots.length > 0 ? (100 / graphSlots.length) : 0;

              const metrics = [
                vmCpuValue  ? { icon: 'mdi:cpu-64-bit', value: vmCpuValue,  label: 'CPU Usage',    color: this.config.cpu_value_color  || this.config.cpu_color  || '#2196f3' } : null,
                vmRamValue  ? { icon: 'mdi:memory',     value: vmRamValue,  label: 'Memory Usage', color: this.config.ram_value_color  || this.config.ram_color  || '#9c27b0' } : null,
                vmDiskValue ? { icon: 'mdi:harddisk',   value: vmDiskValue, label: 'Disk Usage',   color: this.config.disk_value_color || this.config.disk_color || '#4caf50' } : null,
              ].filter(Boolean);

              const rowStyle = `${vm.bg_color ? `background-color:${vm.bg_color};` : ''}${vm.border ? `--custom-border:${vm.border};` : ''}${vm.shadow ? `--custom-shadow:${vm.shadow};` : ''}`;

              const vmHasInteraction = (vm.tap_action?.action && vm.tap_action.action !== 'none') || (vm.hold_action?.action && vm.hold_action.action !== 'none');
              return html`
                <div class="vm-item" style="${rowStyle}${vmHasInteraction ? 'cursor:pointer;' : ''}"
                  @mousedown=${() => this._onPointerDown(`vm-${i}`, vm.hold_action)}
                  @mouseup=${this._onPointerUp}
                  @mouseleave=${this._onPointerCancel}
                  @touchstart=${() => this._onPointerDown(`vm-${i}`, vm.hold_action)}
                  @touchend=${this._onPointerUp}
                  @touchcancel=${this._onPointerCancel}
                  @click=${() => this._onTap(`vm-${i}`, vm.tap_action, vm.double_tap_action)}
                >
                  ${graphSlots.map((g, gi) => html`
                    <div class="vm-graph-bg" style="left:${gi * pct}%;width:${pct}%;">${g.el}</div>
                  `)}
                  <div class="vm-visual">
                    ${vm.image
                      ? html`<img src="${vm.image}" class="vm-custom-image" alt="${vm.name}" />`
                      : html`<div class="vm-icon ${isRunning ? 'running' : 'stopped'}">
                               <ha-icon icon="${vm.icon || (isRunning ? 'mdi:server-network' : 'mdi:server-network-off')}"></ha-icon>
                             </div>`}
                  </div>
                  <div class="vm-body">
                    <div class="vm-top">
                      <div class="vm-info">
                        <div class="vm-name">${vm.name}</div>
                        <div class="vm-status">${statusText}</div>
                      </div>
                      <div class="vm-actions" @click=${(e) => e.stopPropagation()} @mousedown=${(e) => e.stopPropagation()}>
                        <button class="action-btn" title="Start"    ?disabled=${isRunning || !vm.start}     @click=${() => this._handleAction(vm.start)}><ha-icon icon="mdi:play"></ha-icon></button>
                        <button class="action-btn" title="Shutdown" ?disabled=${!isRunning || !vm.shutdown} @click=${() => this._confirmAction('Shutdown', vm.shutdown)}><ha-icon icon="mdi:power"></ha-icon></button>
                        <button class="action-btn" title="Stop"     ?disabled=${!isRunning || !vm.stop}     @click=${() => this._confirmAction('Stop',     vm.stop)}><ha-icon icon="mdi:stop"></ha-icon></button>
                        <button class="action-btn" title="Reboot"   ?disabled=${!isRunning || !vm.reboot}   @click=${() => this._confirmAction('Reboot',   vm.reboot)}><ha-icon icon="mdi:restart"></ha-icon></button>
                        <button class="action-btn" title="Snapshot" ?disabled=${!isRunning || !vm.snapshot} @click=${() => this._handleAction(vm.snapshot)}><ha-icon icon="mdi:camera"></ha-icon></button>
                      </div>
                    </div>
                    ${metrics.length > 0 ? html`
                      <div class="vm-metrics" style="grid-template-columns:repeat(${metrics.length},1fr);">
                        ${metrics.map(m => html`
                          <div class="vm-metric" title="${m.label}" style="color:${m.color};">
                            <ha-icon icon="${m.icon}"></ha-icon>
                            <span>${m.value}</span>
                          </div>
                        `)}
                      </div>
                    ` : ''}
                  </div>
                </div>
              `;
            })}
          </div>
        </div>


        ${this._pendingAction ? html`
          <ha-dialog open @closed=${this._confirmNo} .heading=${this._pendingAction.label}>
            <p style="margin:0 0 24px;">Are you sure you want to: <strong>${this._pendingAction.label}</strong>?</p>
            <div class="confirm-actions">
              <button class="confirm-btn cancel" @click=${this._confirmNo}>Cancel</button>
              <button class="confirm-btn destructive" @click=${this._confirmYes}>Confirm</button>
            </div>
          </ha-dialog>
        ` : ''}
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      .custom-header { padding: 24px 16px 8px 16px; font-size: 24px; font-weight: 400; color: var(--ha-card-header-color, var(--primary-text-color)); letter-spacing: -0.012em; line-height: 32px; display: flex; align-items: center; gap: 12px; }
      .header-icon { --mdc-icon-size: 28px; color: inherit; }

      .node-row { display: flex; align-items: center; justify-content: space-between; padding: 6px 16px 12px; gap: 8px; flex-wrap: wrap; }
      .node-status { display: flex; align-items: center; gap: 8px; }
      .node-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
      .node-dot.running { background: #4caf50; box-shadow: 0 0 6px rgba(76,175,80,0.6); }
      .node-dot.stopped { background: #f44336; box-shadow: 0 0 6px rgba(244,67,54,0.6); }
      .node-status-text { font-size: 0.85rem; color: var(--secondary-text-color); font-weight: 500; }
      .node-actions { display: flex; gap: 6px; }

      .stats-grid { display: grid; gap: 16px; padding: 0 16px 16px 16px; }
      .stat-box { position: relative; overflow: hidden; border-radius: 12px; padding: 24px 16px; background: var(--ha-card-background, #fff); border: var(--custom-border, none); box-shadow: var(--custom-shadow, 0 4px 12px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)); display: flex; flex-direction: column; align-items: center; text-align: center; transition: transform 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease; }
      .stat-box:hover { transform: translateY(-2px); filter: brightness(0.98); box-shadow: var(--custom-shadow, 0 8px 24px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)); }
      .graph-wrapper { position: absolute; bottom: -2px; left: 0; right: 0; z-index: 0; opacity: 0.6; pointer-events: none; }
      .stat-content { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 2px; }
      .stat-label { font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.85; line-height: 1; }
      .stat-row { display: flex; flex-direction: row; align-items: center; gap: 6px; }
      .stat-icon { --mdc-icon-size: 18px; flex-shrink: 0; }
      .stat-value { font-size: 1rem; font-weight: 700; line-height: 1.2; white-space: nowrap; }

      .node-extra { display: flex; flex-wrap: wrap; gap: 8px; padding: 0 16px 16px; }
      .node-extra-chip { display: flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 20px; background: var(--secondary-background-color, rgba(0,0,0,0.05)); font-size: 0.78rem; font-weight: 500; color: var(--secondary-text-color); }
      .node-extra-chip ha-icon { --mdc-icon-size: 14px; opacity: 0.75; }

      .card-content { padding: 0 16px 16px 16px; }
      .vm-list { display: flex; flex-direction: column; gap: 14px; }

      .vm-item { container-type: inline-size; position: relative; display: flex; align-items: stretch; padding: 12px 14px; border-radius: 12px; background: var(--ha-card-background, #fff); border: var(--custom-border, none); box-shadow: var(--custom-shadow, 0 4px 12px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)); transition: transform 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease; overflow: hidden; gap: 14px; }
      .vm-item:hover { transform: translateY(-2px); filter: brightness(0.97); box-shadow: var(--custom-shadow, 0 8px 24px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)); }

      .vm-graph-bg { position: absolute; bottom: -4px; pointer-events: none; z-index: 0; opacity: 0.35; }

      .vm-visual { position: relative; z-index: 1; width: 46px; height: 46px; flex-shrink: 0; align-self: center; display: flex; align-items: center; justify-content: center; }
      .vm-icon { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border-radius: 50%; box-shadow: inset 0 0 0 1px rgba(0,0,0,0.05); }
      .vm-icon.running { background-color: rgba(76,175,80,0.15); color: #4caf50; }
      .vm-icon.stopped { background-color: rgba(244,67,54,0.15); color: #f44336; }
      .vm-custom-image { width: 100%; height: 100%; object-fit: contain; border-radius: 6px; }

      .vm-body { position: relative; z-index: 1; flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }
      .vm-top { display: flex; align-items: flex-start; gap: 8px; }
      .vm-info { flex: 1; overflow: hidden; min-width: 0; }
      .vm-name { font-weight: 600; font-size: 1rem; color: var(--primary-text-color); white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
      .vm-status { font-size: 0.8rem; color: var(--secondary-text-color); font-weight: 500; margin-top: 2px; }
      @container (max-width: 420px) {
        .vm-top { flex-direction: column; gap: 6px; }
        .vm-info { width: 100%; }
        .vm-name { white-space: normal; }
        .vm-actions { align-self: flex-start; }
      }

      .vm-actions { display: flex; gap: 6px; flex-shrink: 0; }
      .action-btn { display: flex; justify-content: center; align-items: center; width: 34px; height: 34px; border-radius: 8px; border: none; cursor: pointer; background-color: var(--card-background-color, #fff); box-shadow: 0 2px 5px rgba(0,0,0,0.1), 0 1px 1px rgba(0,0,0,0.05); color: var(--primary-text-color); transition: all 0.2s ease; }
      .action-btn ha-icon { --mdc-icon-size: 18px; }
      .action-btn:hover:not(:disabled) { box-shadow: 0 4px 8px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1); transform: translateY(-2px); color: var(--primary-color); }
      .action-btn:disabled { opacity: 0.4; cursor: not-allowed; box-shadow: none; background-color: transparent; border: 1px solid var(--divider-color); }

      .vm-metrics { display: grid; margin-top: 6px; gap: 4px; }
      .vm-metric { display: flex; align-items: center; gap: 3px; font-size: 0.72rem; font-weight: 700; white-space: nowrap; overflow: hidden; }
      .vm-metric ha-icon { --mdc-icon-size: 12px; flex-shrink: 0; }

      .confirm-actions { display: flex; justify-content: flex-end; gap: 8px; }
      .confirm-btn { padding: 8px 20px; border-radius: 6px; border: none; font-size: 0.875rem; font-weight: 500; cursor: pointer; transition: filter 0.15s; }
      .confirm-btn:hover { filter: brightness(1.1); }
      .confirm-btn.cancel { background: var(--secondary-background-color); color: var(--primary-text-color); }
      .confirm-btn.destructive { background: var(--error-color, #f44336); color: #fff; }
    `;
  }
}

customElements.define("proxmox-ha-card", ProxmoxCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "proxmox-ha-card",
  name: "Proxmox HA Card",
  description: localize(null, "description"),
  preview: true,
});

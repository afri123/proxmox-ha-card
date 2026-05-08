# Proxmox HA Card for Home Assistant

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/afri123/proxmox-ha-card?style=for-the-badge)](https://github.com/afri123/proxmox-ha-card/releases)

A modern, customisable custom card for Home Assistant to monitor and control your Proxmox Virtual Environment nodes, virtual machines, and containers - all without writing a single line of YAML.

> **Screenshots coming soon** - new screenshots will be added in the next release.

---

## ⚠️ Prerequisites

This card is **frontend UI only**. It does not communicate with Proxmox directly.  
Before using it, install both of the following:

1. **Backend integration** by dougiteixeira: 👉 [Proxmox VE Integration](https://github.com/dougiteixeira/proxmoxve)
2. **Graph engine** via HACS (Frontend): 👉 [Mini Graph Card](https://github.com/kalkih/mini-graph-card)

---

## ✨ Features

### Node

- CPU, RAM, and Disk usage stat boxes with label, icon, and value, background sparkline graphs
- Node status row: running/stopped indicator dot, uptime, and action buttons (Restart, Shut Down, Start All, Stop All, Suspend All)
- Extra sensor chips: Max CPU, Max Memory, Backup Status, Backup Duration, Last Backup
- Confirmation dialog for all destructive node actions
- **One-click node setup**: pick the Proxmox node from a device picker and all entities are filled automatically

### VMs & Containers

The card supports two modes for displaying VMs and containers:

**Auto-discovery** (default, recommended for Proxmox HA clusters)

- VMs and containers are detected in real-time from the HA device registry - no manual configuration needed
- When Proxmox HA migrates a VM to another node, it disappears from the source card and appears on the destination card automatically
- Trade-off: per-VM customisation (icon, colour, interactions) is not available in this mode

**Manual** (recommended for stable, non-HA setups)

- Full per-entry customisation: icon, background colour, border, shadow, custom image, and tap/hold interactions
- Choose exactly which entities (CPU, memory, disk, buttons) are shown per entry
- Trade-off: if a VM migrates to another node in a Proxmox HA failover, the card will not follow it automatically

**Both modes provide:**

- Real-time running/stopped status with uptime
- CPU, Memory, and Disk usage with inline background sparkline graphs
- Action buttons: Start, Shutdown, Stop, Reboot, Snapshot (with confirmation dialogs for destructive actions)
- Responsive layout: name and uptime stack above buttons when the card is narrow (works correctly even with multiple cards side-by-side)

### Editor

- **Full visual UI editor** - no YAML required
- **Node device picker**: select your Proxmox node device and the card auto-fills all related entity IDs instantly
- **Auto-discover toggle** (on by default): VMs and containers are discovered from the HA device registry; turn it off to configure them manually
- **Reset Defaults** button on the node and each VM/container: re-fills all entity IDs from the device registry with one click; prompts for confirmation before overwriting an existing selection
- **Internationalization**: UI labels available in English and German; automatically follows your Home Assistant language setting
- Native HA entity, icon, and colour pickers throughout
- **Interactions**: configure tap, double-tap, and hold actions (More Info, Navigate, URL, Call Service) for the node area and each VM/container row

---

## 📥 Installation

### Method 1: HACS (Recommended)

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=afri123&repository=proxmox-ha-card&category=plugin)

1. Go to **HACS → Frontend**.
2. Click the three dots → **Custom repositories**.
3. Add `https://github.com/afri123/proxmox-ha-card`, category **Lovelace**.
4. Find "Proxmox HA Card" and click **Download**.
5. Reload your browser.

### Method 2: Manual

1. Download `proxmox-ha-card.js` from this repository.
2. Copy it to `config/www/proxmox-ha-card/proxmox-ha-card.js`.
3. Go to **Settings → Dashboards → ⋮ → Resources** and add:
   - URL: `/local/proxmox-ha-card/proxmox-ha-card.js`
   - Type: `JavaScript Module`

---

## ⚙️ Configuration

The recommended way is the **Visual Editor** - search for "Proxmox HA Card" when adding a new dashboard card.

### Quick Setup

1. Add the card and open the editor.
2. At the top, select your **Proxmox Node** from the device picker (only Proxmox VE node devices are listed).
3. All node entity IDs (status, CPU, RAM, disk, buttons, etc.) are filled automatically and the card title is set to the node name.
4. **Auto-discover** is enabled by default - VMs and containers on that node appear immediately with no further configuration.

To configure VMs manually, turn off **Auto-discover** in the VMs & Containers section. A device picker filtered to the selected node's VMs and containers is available for each entry.

---

### YAML Configuration Reference

Below is a complete example with all available fields:

```yaml
type: custom:proxmox-ha-card
title: pve1
title_icon: phu:proxmox
title_color: "#E57000"

# --- Auto-discovery ---
auto_discover: true # true = discover VMs/containers from HA device registry

# --- Node device (used for auto-discovery) ---
node_device_id: <device_id> # set automatically when using the editor

# --- Node Status & Actions ---
node_status: binary_sensor.pve1_status
node_uptime: sensor.pve1_uptime
node_restart: button.pve1_restart
node_shutdown: button.pve1_shut_down
node_start_all: button.pve1_start_all
node_stop_all: button.pve1_stop_all
node_suspend_all: button.pve1_suspend_all

# --- CPU Box ---
node_cpu: sensor.pve1_cpu_usage
cpu_color: "#2196f3"
cpu_value_color: "" # overrides value & icon color only
cpu_label_color: "" # overrides label text color only

# --- RAM Box ---
node_memory: sensor.pve1_memory_usage_percentage
ram_color: "#9c27b0"
ram_value_color: ""
ram_label_color: ""

# --- Disk Box ---
node_disk: sensor.pve1_disk_usage
node_disk_size: sensor.pve1_max_disk_usage
disk_color: "#4caf50"
disk_value_color: ""
disk_label_color: ""

# --- Additional Node Sensors ---
node_max_cpu: sensor.pve1_max_cpu
node_max_memory: sensor.pve1_max_memory_usage
node_backup_status: binary_sensor.pve1_backup_status
node_backup_duration: sensor.pve1_backup_duration
node_last_backup: sensor.pve1_last_backup

# --- Node Interactions ---
tap_action:
  action: more-info
  entity: sensor.pve1_cpu_usage
hold_action:
  action: navigate
  navigation_path: /lovelace/proxmox

# --- VMs & Containers (used when auto_discover: false) ---
vms:
  - name: Home Assistant
    icon: mdi:home-assistant
    status: binary_sensor.haos_status
    cpu: sensor.haos_cpu_usage
    memory: sensor.haos_memory_usage_percentage
    disk: sensor.haos_disk_usage
    disk_size: sensor.haos_max_disk_usage
    uptime: sensor.haos_uptime
    start: button.haos_start
    shutdown: button.haos_stop
    stop: button.haos_stop
    reboot: button.haos_restart
    snapshot: button.haos_create_snapshot
    tap_action:
      action: more-info
      entity: binary_sensor.haos_status
```

---

### Node Configuration Variables

| Name                   | Type    | Description                                                                       |
| ---------------------- | ------- | --------------------------------------------------------------------------------- |
| `type`                 | string  | **Required.** Must be `custom:proxmox-ha-card`                                    |
| `title`                | string  | Card header title (auto-set to node name when using device picker)                |
| `title_icon`           | string  | MDI icon next to the title. Default: `phu:proxmox`                                |
| `title_color`          | string  | CSS colour for the title. Default: `#E57000`                                      |
| `title_size`           | string  | CSS font size for the title (e.g. `24px`)                                         |
| `title_weight`         | string  | CSS font weight for the title (e.g. `bold`)                                       |
| `auto_discover`        | boolean | Discover VMs/containers from the HA device registry. Default: `true`              |
| `node_device_id`       | string  | HA device ID for the Proxmox node (set automatically by the editor)               |
| `node_status`          | string  | Entity ID for the node status (`binary_sensor` or `sensor`)                       |
| `node_uptime`          | string  | Sensor returning node uptime in hours                                             |
| `node_restart`         | string  | Button entity to restart the node                                                 |
| `node_shutdown`        | string  | Button entity to shut down the node                                               |
| `node_start_all`       | string  | Button entity to start all VMs                                                    |
| `node_stop_all`        | string  | Button entity to stop all VMs                                                     |
| `node_suspend_all`     | string  | Button entity to suspend all VMs                                                  |
| `node_cpu`             | string  | Sensor for node CPU usage (%)                                                     |
| `cpu_color`            | string  | Graph colour for the CPU box. Default: `#2196f3`                                  |
| `cpu_value_color`      | string  | Color for the CPU value and icon only                                             |
| `cpu_label_color`      | string  | Color for the CPU label text only                                                 |
| `cpu_border`           | string  | CSS border for the CPU box                                                        |
| `cpu_shadow`           | string  | CSS box-shadow for the CPU box                                                    |
| `node_memory`          | string  | Sensor for node memory usage (%)                                                  |
| `ram_color`            | string  | Graph colour for the RAM box. Default: `#9c27b0`                                  |
| `ram_value_color`      | string  | Color for the RAM value and icon only                                             |
| `ram_label_color`      | string  | Color for the RAM label text only                                                 |
| `ram_border`           | string  | CSS border for the RAM box                                                        |
| `ram_shadow`           | string  | CSS box-shadow for the RAM box                                                    |
| `node_disk`            | string  | Sensor for node disk usage                                                        |
| `node_disk_size`       | string  | Sensor for node max disk capacity                                                 |
| `disk_color`           | string  | Graph colour for the Disk box. Default: `#4caf50`                                 |
| `disk_value_color`     | string  | Color for the Disk value and icon only                                            |
| `disk_label_color`     | string  | Color for the Disk label text only                                                |
| `disk_border`          | string  | CSS border for the Disk box                                                       |
| `disk_shadow`          | string  | CSS box-shadow for the Disk box                                                   |
| `node_max_cpu`         | string  | Sensor for max CPU across all VMs                                                 |
| `node_max_memory`      | string  | Sensor for max memory across all VMs                                              |
| `node_backup_status`   | string  | Entity for backup status (`binary_sensor` with `device_class: problem` supported) |
| `node_backup_duration` | string  | Sensor for last backup duration                                                   |
| `node_last_backup`     | string  | Sensor/timestamp for last backup time                                             |
| `tap_action`           | object  | Action on tap - see [Interactions](#interactions)                                 |
| `double_tap_action`    | object  | Action on double-tap                                                              |
| `hold_action`          | object  | Action on hold (500 ms)                                                           |
| `vms`                  | list    | List of VMs/Containers used when `auto_discover: false` - see below               |

---

### VM / Container Configuration Variables (`vms` list)

Only relevant when `auto_discover: false`.

| Name                | Type   | Description                                                  |
| ------------------- | ------ | ------------------------------------------------------------ |
| `name`              | string | **Required.** Display name                                   |
| `device_id`         | string | HA device ID (set automatically by the editor device picker) |
| `status`            | string | `binary_sensor` for the running state                        |
| `cpu`               | string | Sensor for CPU usage (%)                                     |
| `memory`            | string | Sensor for memory usage (%)                                  |
| `disk`              | string | Sensor for disk usage                                        |
| `disk_size`         | string | Sensor for max disk capacity                                 |
| `uptime`            | string | Sensor for uptime (hours)                                    |
| `start`             | string | Button entity to start                                       |
| `shutdown`          | string | Button entity for graceful shutdown                          |
| `stop`              | string | Button entity for hard stop                                  |
| `reboot`            | string | Button entity to reboot                                      |
| `snapshot`          | string | Button entity to create a snapshot                           |
| `icon`              | string | MDI icon (e.g. `mdi:ubuntu`)                                 |
| `image`             | string | URL to a custom image - overrides `icon`                     |
| `bg_color`          | string | CSS background colour for the row                            |
| `border`            | string | CSS border for the row                                       |
| `shadow`            | string | CSS box-shadow for the row                                   |
| `tap_action`        | object | Action on tap - see [Interactions](#interactions)            |
| `double_tap_action` | object | Action on double-tap                                         |
| `hold_action`       | object | Action on hold (500 ms)                                      |

---

### Interactions

Tap, double-tap, and hold actions can be configured on the node area (header + stats) and on each VM/container row. Buttons always take priority over row interactions.

| `action` value | Additional fields         | Description                                           |
| -------------- | ------------------------- | ----------------------------------------------------- |
| `none`         | -                         | No action (default)                                   |
| `more-info`    | `entity`                  | Opens the More Info dialog for the given entity       |
| `navigate`     | `navigation_path`         | Navigates to a path within HA (e.g. `/lovelace/home`) |
| `url`          | `url_path`                | Opens a URL in a new tab                              |
| `call-service` | `service`, `service_data` | Calls a HA service (e.g. `light.turn_on`)             |

---

## 🔄 Auto-Discovery

When `auto_discover: true` (the default), the card reads the Home Assistant device registry at render time to find all VMs and containers linked to the selected node. No manual entity configuration is needed.

**How it works:**

- The Proxmox VE integration registers each node, VM, and container as a device in HA
- The card filters devices where `via_device_id` matches the node's device ID and `model` is `VM` or `Container`
- Entities (CPU, memory, disk, buttons, etc.) are matched by their naming convention

**Proxmox High Availability:** when HA migrates a VM to a different node, it disappears from the source node's card and appears on the destination node's card automatically - no reconfiguration needed.

| Scenario                             | Behaviour                                                                 |
| ------------------------------------ | ------------------------------------------------------------------------- |
| `auto_discover: true`, node selected | VMs/containers discovered automatically                                   |
| VM migrates to another node          | Disappears from this card, appears on destination card                    |
| New VM added in Proxmox              | Appears after HA refreshes its device registry (typically within minutes) |
| `auto_discover: false`               | Manual `vms` list is used - existing config is preserved when toggling    |

---

## 🌐 Internationalization

The card editor UI automatically follows your Home Assistant language setting. Currently supported languages:

| Language | Code |
| -------- | ---- |
| English  | `en` |
| German   | `de` |

To contribute a translation, add a new language key to the `TRANSLATIONS` object in `proxmox-ha-card.js`.

---

## 🐛 Troubleshooting

| Problem                                         | Solution                                                                                        |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| "Custom element doesn't exist"                  | Ensure the resource URL is correct and clear your browser cache                                 |
| "Custom element doesn't exist: mini-graph-card" | Install Mini Graph Card via HACS (Frontend)                                                     |
| Buttons are greyed out                          | Check that the `status` binary_sensor entity ID is correct                                      |
| Backup status always shows "Problem"            | Ensure the entity has `device_class: problem` - the card inverts `off` → OK, `on` → Problem     |
| No devices in the node picker                   | Ensure the Proxmox VE integration is installed and has discovered your nodes                    |
| Auto-discover shows no VMs                      | Check that the node device picker is set; VMs appear after HA refreshes the device registry     |
| Device picker lists wrong VMs                   | The picker is filtered to VMs/containers linked to the selected node via the HA device registry |

---

## 📄 License

This project is licensed under the MIT License.
